import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateCartdetails } from "../redux/productSlice";
import LoaderComponent from "../Components/Loader";
import styles from "./productList.module.css";
import { useLocation, useNavigate } from "react-router";
import Header from "../Components/Header";
import Popup from "../Components/popup";
import {
  addItemCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartSlice";
import { deleteProduct } from "../redux/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.product);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const addProduct = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };
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

  const categories = [
    "All",
    ...new Set(products?.map((item) => item.category)),
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch = prod.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <LoaderComponent />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.product_container}>
      <Header />
      <div className={styles.filterContainer}>
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <ul className={styles.categoryList}>
          {categories.map((category, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryItem} ${
                selectedCategory === category
                  ? styles.activeCategory
                  : styles.categoryItem
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
        {location.pathname === "/admin" && (
          <button
            type="button"
            className={styles.addtocart_button}
            onClick={addProduct}
          >
            Add Product
          </button>
        )}
      </div>

      {showPopup && <Popup onClose={closePopup} />}

      <ul className={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => {
            const cartItem = cartItems.find((item) => item.id === prod.id);
            const inCart = !!cartItem;
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <li
                key={prod.id}
                className={styles.productCard}
                onClick={() => navigate(`/products/${prod.id}`)}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <h2 className={styles.productTitle}>{prod.title}</h2>
                  <p className={styles.productPrice}>${prod.price}</p>
                </div>

                {inCart ? (
                  <div
                    className={styles.ProductCartActions}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleIncrementQuantity(prod.id)}
                      className={styles.ProductCartaction_buttons}
                    >
                      +
                    </button>
                    <p className={styles.ProductCartQuantity}>
                      In Cart: {quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDecrementQuantity(prod.id)}
                      className={styles.ProductCartaction_buttons}
                    >
                      -
                    </button>
                  </div>
                ) : location.pathname !== "/admin" ? (
                  <button
                    type="button"
                    className={styles.addtocart_button}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCartItems(prod);
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.addtocart_button}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProduct(prod.id);
                    }}
                  >
                    Remove Product
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
