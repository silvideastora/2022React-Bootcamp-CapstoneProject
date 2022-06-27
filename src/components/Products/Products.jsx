import React, { useState, useEffect } from "react";
import {
  ProductsWrapper,
  CardContainer,
  Card,
  CardText,
} from "./Products.styled";
import { useFeaturedProducts } from "../../utils/hooks/useFeaturedProducts";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useFeaturedProducts();

  useEffect(() => {
    if (data.results) {
      setProducts(data.results);
    }
  }, [data]);

  return (
    <ProductsWrapper>
      {!isLoading && (
        <CardContainer>
          {products.map((product) => {
            const productDetail = product.data;
            return (
            <Link to={`/product/${product.id}`}>
              <Card
                key={productDetail.sku}
                style={{
                  backgroundImage: `url(${productDetail.mainimage.url})`,
                }}
              >
                <CardText>
                  <h4 className="prod-name">{productDetail.name}</h4>
                  <span 
                    className="price">${productDetail.price}
                  </span>
                  <span>
                    <small>{productDetail.category.slug}</small>
                  </span>
                  <button className="add-to-cart">Add to cart</button>
                </CardText>
              </Card>
            </Link>
            )
          })}
        </CardContainer>
      )}
    </ProductsWrapper>
  );
}
