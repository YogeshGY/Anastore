import { Component } from "react";
import { useNavigate } from "react-router";
import styles from "./login.module.css";
import { login } from "../redux/auth";
import { useDispatch } from "react-redux";
import { logedStatusFunction } from "../redux/productSlice";
class Login extends Component {
  state = {
    Username: "",
    password: "",
    errorMessage: "",
    role: "user",
  };

  handleUserName = (event) => {
    this.setState({ Username: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmitt = (event) => {
    event.preventDefault();
    const { Username, password, role } = this.state;

    if (Username === "" || password === "") {
      this.setState({ errorMessage: "Enter Both user name and password" });
    } else if (Username === "Anacity" && password === "Anarock") {
      this.props.dispatch(logedStatusFunction(role));
      this.props.dispatch(login());
      this.props.navigate(role === "admin" ? "/admin" : "/");
    } else {
      if (Username !== "Anacity") {
        this.setState({ errorMessage: "User Name Not Matched" });
      } else {
        this.setState({ errorMessage: "Password Not Matched" });
      }
    }
  };
  render() {
    const { Username, password, errorMessage, role } = this.state;

    return (
      <div className={styles.loginpage_container}>
        <div className={styles.login_card}>
          <h2 className={styles.login_heading}>AnaStore</h2>
          <form className={styles.form_container} onSubmit={this.handleSubmitt}>
            <label htmlFor="username" className={styles.input_label}>
              USER NAME
            </label>
            <input
              id="username"
              value={Username}
              type="text"
              onChange={this.handleUserName}
              className={styles.login_input}
            />

            <label htmlFor="password" className={styles.input_label}>
              PASSWORD
            </label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={this.handlePassword}
              className={styles.login_input}
            />

            <select
              value={role}
              onChange={(e) => this.setState({ role: e.target.value })}
              className={styles.role_select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className={styles.login_button}>
              Login
            </button>

            {errorMessage && (
              <p className={styles.error_message}>{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default function LoginWithNavigate(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return <Login {...props} navigate={navigate} dispatch={dispatch} />;
}
