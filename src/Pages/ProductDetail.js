import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderComponent from "../Components/Loader";
import styles from "./productdetail.module.css";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartSlice";
import { updateCartdetails } from "../redux/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartItems = (item) => {
    dispatch(addItemCart({ ...item, quantity: 1 }));
    dispatch(updateCartdetails({ id: item.id }));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  if (loading) return <LoaderComponent />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const inCart = cartItems.find((item) => item.id === product.id);
  const quantity = inCart ? inCart.quantity : 0;

  return (
    <div className={styles.detailsContainer}>
      <Header />
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
          {inCart ? (
            <div className={styles.ProductCartActions}>
              <button
                type="button"
                onClick={() => handleIncrementQuantity(product.id)}
                className={styles.ProductCartaction_buttons}
              >
                +
              </button>
              <p className={styles.ProductCartQuantity}>In Cart: {quantity}</p>
              <button
                type="button"
                onClick={() => handleDecrementQuantity(product.id)}
                className={styles.ProductCartaction_buttons}
              >
                -
              </button>
            </div>
          ) : (
            <button
              className={styles.addtocart_button}
              onClick={() => addToCartItems(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
