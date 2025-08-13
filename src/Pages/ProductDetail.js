import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoaderComponent from "../Components/Loader";
import styles from "./productdetail.module.css";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Components/popup";

import {
  addItemCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartSlice";
import { updateCartdetails, deleteProduct } from "../redux/productSlice";

const ProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { logedStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${_id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [_id]);

  const addToCartItems = (item) => {
    dispatch(addItemCart({ ...item, quantity: 1 }));
    dispatch(updateCartdetails({ _id: item._id }));
  };

  const removeProduct = (_id) => {
    dispatch(deleteProduct(_id));
    alert("Product removed successfully Go to home page");
    navigate("/admin");
  };

  const updateProductAdmin = (_id) => {
    setShowPopup(true);
    setUpdateId(_id);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleIncrementQuantity = (_id) => {
    dispatch(incrementQuantity(_id));
  };

  const handleDecrementQuantity = (_id) => {
    dispatch(decrementQuantity(_id));
  };

  if (loading) return <LoaderComponent />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const inCart = cartItems.find((item) => item._id === product._id);
  const quantity = inCart ? inCart.quantity : 0;

  return (
    <div className={styles.detailsContainer}>
      <Header />
      {showPopup && <Popup onClose={closePopup} updateId={updateId} />}
      <div className={styles.details}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.detailsImage}
        />
        <div className={styles.detailsContent}>
          <h1>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          {inCart && logedStatus !== "admin" ? (
            <div className={styles.ProductCartActions}>
              <button
                type="button"
                onClick={() => handleDecrementQuantity(product._id)}
                className={styles.ProductCartaction_buttons}
              >
                -
              </button>

              <p className={styles.cartQuantity}>In Cart: {quantity}</p>
              <button
                type="button"
                onClick={() => handleIncrementQuantity(product._id)}
                className={styles.ProductCartaction_buttons}
              >
                +
              </button>
            </div>
          ) : logedStatus === "user" ? (
            <button
              className={styles.addtocart_button}
              onClick={() => addToCartItems(product)}
            >
              Add to Cart
            </button>
          ) : (
            <div className={styles.admin_button_functions}>
              <button
                className={styles.addtocart_button}
                onClick={() => removeProduct(product._id)}
              >
                Remove Product
              </button>
              <button
                type="button"
                className={styles.addtocart_button}
                onClick={() => updateProductAdmin(product._id)}
              >
                Update Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
