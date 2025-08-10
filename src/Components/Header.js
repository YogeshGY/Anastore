import { useNavigate } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

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
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
