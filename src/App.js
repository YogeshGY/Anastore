import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoaderComponent from "./Components/Loader";
import "./App.css";
import ProductDetails from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import ProtectedRoute from "./protectedRoute";

const ProductList = React.lazy(() => import("./Pages/ProductList"));
const Login = React.lazy(() => import("./Pages/login"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/admin" element={<ProductList />} />
              <Route path="/products/:_id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
