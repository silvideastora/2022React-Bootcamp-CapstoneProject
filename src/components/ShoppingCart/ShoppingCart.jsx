import { React, useState, useEffect, useContext,useCallback } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCart";
import { ShoppingCartWrapper, CartItem, UiPannel } from "./ShoppingCart.styled";
import { Link } from 'react-router-dom';

export default function ShopingCart() {
  const { items } = useContext(ShoppingCartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsSubTotal, setProductsSubTotal] = useState({});

  useEffect(() => {
    const total = Object.values(productsSubTotal).reduce((total, subTotal) => {
      return total + subTotal;
    }, 0);
    setTotalPrice(total);
  }, [productsSubTotal]);

  const calculateTotalByProduct = useCallback((productId, quantity, price) => {
    setProductsSubTotal(prev => ({...prev, 
      [productId]: quantity * price,
    }))
  }, []);


  return (
    <ShoppingCartWrapper>
      {items.map((item, index) => (
        <CartItemDetail 
        item={item} 
        index={index} 
        key={item.id}
        calculateTotalByProduct={calculateTotalByProduct} />
      ))}
      <UiPannel>
        <div className="summary">
          <div className="total-row-container">
            <span>Total</span>
            <span className="item-tag-price">${totalPrice}</span>
          </div>
          <div className="actions">
            <Link to="/checkout">
            <button>Continue</button>
            </Link>
          </div>
        </div>
      </UiPannel>
    </ShoppingCartWrapper>
  );
}
const CartItemDetail = ({ item, index , calculateTotalByProduct}) => {
  const {
    data: {
      name,
      mainimage: { url },
      short_description,
      price,
      sku,
      stock,
    },
    id,
    selectedQuantity,
  } = item;
  const [quantity, setQuantity] = useState(selectedQuantity || 1);
  const { deleteItem } = useContext(ShoppingCartContext);
  const [error , setError] = useState(false);

  const add = () => {
    setQuantity((prev) => prev + 1);
  };
  const substract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const removeItem = () => {
    deleteItem(id)
  }

  useEffect(() => {
    if(quantity > stock || quantity <= 0){
      setError(true)
    } else {
      setError(false)
    }
    calculateTotalByProduct(id, quantity, price)
    return () => calculateTotalByProduct(id, 0, price)
  },[quantity,  id, price, stock,calculateTotalByProduct])
  

  return (
    <CartItem key={sku}>
      <figure className="item-image">
        <img src={url} alt="logo" className="img-logo" />
      </figure>
      <div className="item-information">
        <div className="item-description">
          <h2 className="item-title">{name}</h2>
          <h3 className="subtitle">{short_description}</h3>
          <button onClick={removeItem}>Delete</button>
        </div>
      </div>
      <div className="quantity-selector">
        <div className="quantity-selector-container">
          <button onClick={substract}>-</button>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          <button onClick={add}>+</button>
          <p>{stock - quantity} available</p>
          {error && (
            <small>Error</small>
          )}
          
        </div>
      </div>
      <div className="item-price">
        <span className="item-tag-price">$ {price * quantity}</span>
      </div>
    </CartItem>
  );
};
