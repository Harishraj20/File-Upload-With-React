import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductContextProvider from "./ContextProvider/ProductContextProvider";
import CartContextProvider from "./ContextProvider/CartContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductContextProvider>
    <CartContextProvider>
      <App/>
    </CartContextProvider>
  </ProductContextProvider>
);

reportWebVitals();
