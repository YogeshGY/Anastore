import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import cookies from "js-cookie";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const token = cookies.get("jwtToken") ? true : false;
  const { items } = useSelector((state) => state.cart);
  const handleLogout = () => {
    if (token) {
      cookies.remove("jwtToken");
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.headerContainer}>
      <h1 onClick={() => navigate("/")}>AS</h1>
      <nav>
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
            {items.length > 0 && (
              <span className={styles.span}>{items.length}</span>
            )}
          </li>
        </ul>
      </nav>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
