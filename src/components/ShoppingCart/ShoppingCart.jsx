import { React, useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCart";
import { ShoppingCartWrapper, CartItem, UiPannel } from "./ShoppingCart.styled";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ShopingCart() {
  const { items } = useContext(ShoppingCartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
     const total = Object.values(items).reduce((total, item) => {
      return total + item.subtotal;
    }, 0);
    setTotalPrice(total); 
  }, [items]);

  return (
    <ShoppingCartWrapper>
      {Object.values(items).map((item, index) => (
        <CartItemDetail 
        item={item} 
        index={index} 
        key={item.id}
         />
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
const CartItemDetail = ({ item }) => {
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
  const { deleteItem, updateItem } = useContext(ShoppingCartContext);
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
    updateItem(id, quantity, price * quantity)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[quantity,  id, price, stock])
  

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
          <button disabled={quantity === stock} onClick={add}>+</button>
        </div>
        <p>{stock - quantity} available</p>
          {error && (
            <small>Not available</small>
          )}
      </div>
      <div className="item-price">
        <span className="item-tag-price">$ {price * quantity}</span>
      </div>
    </CartItem>
  );
};

CartItemDetail.propTypes = {
  item: PropTypes.object,
}