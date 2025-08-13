import { useState, useEffect } from "react";
import Header from "../Components/Header";
import styles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemCart,
  incrementQuantity,
  decrementQuantity,
  emptyCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const [checkout, setCheckout] = useState(0);
  const { items, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCheckout(total);
  }, [items]);

  const handleRemoveFromCart = (_id) => {
    dispatch(deleteItemCart(_id));
  };

  const handleIncrementQuantity = (_id) => {
    dispatch(incrementQuantity(_id));
  };

  const handleDecrementQuantity = (_id) => {
    dispatch(decrementQuantity(_id));
  };

  const paymentDone = () => {
    alert("Payment Successful");
    dispatch(emptyCart());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.cart_container}>
      <Header />
      {items.length > 0 && (
        <button
          type="button"
          className={styles.emptycart}
          onClick={() => dispatch(emptyCart())}
        >
          Empty Cart
        </button>
      )}
      <ul className={styles.cartList}>
        {items.length > 0 ? (
          items.map((prod) => (
            <li key={prod._id} className={styles.cartCard}>
              <img
                src={prod.image}
                alt={prod.title}
                className={styles.cartImage}
                onClick={() => navigate(`/products/${prod._id}`)}
              />
              <div
                className={styles.cartDetails}
                onClick={() => navigate(`/products/${prod._id}`)}
              >
                <h2 className={styles.cartTitle}>{prod.title}</h2>
                <p className={styles.cartPrice}>${prod.price}</p>
              </div>
              <div className={styles.cartActions}>
                <button
                  type="button"
                  onClick={() => handleIncrementQuantity(prod._id)}
                  className={styles.action_buttons}
                >
                  +
                </button>
                <p className={styles.quantity}>{prod.quantity}</p>
                <button
                  type="button"
                  onClick={() => handleDecrementQuantity(prod._id)}
                  className={styles.action_buttons}
                >
                  -
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFromCart(prod._id)}
                className={styles.removecart_button}
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className={styles.emptyCart}>
            Your cart is empty <br /> Add Somthing into theCart !
          </p>
        )}
      </ul>
      {checkout > 0 && (
        <div className={styles.checkout}>
          <h1>CheckOut</h1>
          <p>Total: ${checkout.toFixed(2)}</p>
          <button className={styles.proceedButton} onClick={paymentDone}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
