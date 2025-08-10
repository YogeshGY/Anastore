import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoaderComponent from "./Components/Loader";
import "./App.css";
import ProductDetails from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";

const ProductList = React.lazy(() => import("./Pages/ProductList"));
const Login = React.lazy(() => import("./Pages/login"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<ProductList />} />
            <Route exact path="/admin" element={<ProductList />} />
            <Route exact path="/products/:id" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
