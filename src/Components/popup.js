import React, { useState } from "react";
import styles from "./popup.module.css";
import { addProduct } from "../redux/productSlice";

import { useDispatch } from "react-redux";

const Popup = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Category1");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { title, price, image, category };
    dispatch(addProduct(newProduct));
    setTitle("");
    setPrice("");
    setImage("");
    setCategory("");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button type="button" className={styles.close_popup} onClick={onClose}>
          Cancel
        </button>
        <h2 className={styles.popupHeading}>Add New Product</h2>
        <form onSubmit={handleSubmit} className={styles.popupForm}>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.popupInput}
          />
          <input
            type="number"
            placeholder="Product Price in $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.popupInput}
          />
          <input
            type="text"
            placeholder="Product Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.popupInput}
          />
          <input
            type="text"
            placeholder="Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.popupInput}
          />
          <button type="submit" className={styles.addProduct_button}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
