import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "././components/Home/Home";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SearchResults from "./components/SearchResults/SearchResults";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { ShoppingCartContext } from "./contexts/ShoppingCart";

export default function App() {
  const [items, setItems] = useState({});

  const addItem = (newItem) => {
    setItems((prev) => ({
      ...prev,
      [newItem.id]: { ...newItem, quantity: 1, subtotal: newItem.data.price },
    }));
  };
  const deleteItem = (itemId) => {
    const newItems = { ...items };
    delete newItems[itemId];
    setItems(newItems);
  };

  const updateItem = useCallback(
    (id, quantity, subtotal) => {
      setItems({ ...items, [id]: { ...items[id], quantity, subtotal } });
    },
    [items]
  );

  return (
    <div className="App">
      <ShoppingCartContext.Provider
        value={{ items, addItem, deleteItem, updateItem }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </ShoppingCartContext.Provider>
    </div>
  );
}
