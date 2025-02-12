import React, { useContext, useEffect, useState } from "react";
import "../Styles/cart.css";
import ProductContext from "../Context/Context";
import PaymentComponent from "./PaymentComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Cart() {
  const { productList } = useContext(ProductContext);
  console.log(productList);

  const [cartList, setCartList] = useState([]);
  // const [stockMsg, setStockMsg] = useState("");
  useEffect(() => {
    console.log("Im called first!...");
    const loadProducts = async () => {
      console.log("load products Method!....");
      const cartProducts = localStorage.getItem("cart");
      console.log("Cart Products: ", JSON.parse(cartProducts));
      setCartList(JSON.parse(cartProducts) || []);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (cartList.length > 0)
      localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const calculateDiscount = (discountValue, costPrice) => {
    console.log(
      "Discount percent - ",
      discountValue,
      "cost price - ",
      costPrice
    );

    const discountedAmount = costPrice * (discountValue / 100);
    const discountedPrice = costPrice - discountedAmount;
    return discountedPrice;
  };

  const calculateCartTotal = () => {
    return cartList.reduce(
      (total, item) =>
        total +
        Math.round(calculateDiscount(item.discount, item.mrp)) * item.qty,
      0
    );
  };
  const calculateCartCount = () => {
    return cartList.reduce((total, item) => total + item.qty, 0);
  };

  const removeCartItem = (id) => {
    console.log("remove Cart called", id);
    setCartList((prevState) => prevState.filter((item) => item.id !== id));
  };

  const decrementCart = (id) => {
    console.log("Decrement Cart called", id);
    setCartList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      )
    );
  };
  const calculateActualAmount = () => {
    return cartList.reduce((total, item) => total + item.mrp * item.qty, 0);
  };
  const totalDiscountedPercent = () => {
    const discountAmount = calculateCartTotal();
    const actualPrice = calculateActualAmount();
    const totalPercentOfDiscount =
      ((actualPrice - discountAmount) / actualPrice) * 100;
    console.log("Discounted Amount - ", calculateCartTotal());
    console.log("ACtual Price - ", actualPrice);
    return Math.round(totalPercentOfDiscount);
  };

  const checkValidProduct = (prod) => {
    const product = productList.find((prods) => prods.id === prod.id);
    return prod.qty <= product.quantity ? true : false;
  };

  const incrementCart = (prod) => {
    console.log("Decrement Cart called", prod);
    const sum = totalDiscountedPercent();
    console.log("Total Discount Percent: ", sum);
    if (checkValidProduct(prod)) {
      setCartList((prevState) =>
        prevState.map((item) =>
          item.id === prod.id
            ? { ...item, qty: Math.max(item.qty + 1, 1) }
            : item
        )
      );
    } else {
      // setStockMsg("OUT OF STOCK");
    }
  };

  return (
    <div className="cart-div">
      <p className="cart-title">CART PAGE</p>

      <div className="cart-holder">
        <div className="cart-list">
          <div className="cart-tag">
            <div className="tag-name">SHOPPING CART</div>
            <div className="tag-price">PRICE</div>
          </div>
          {cartList.map((cartItem, index) => {
            return (
              <div className="cart-card" key={index}>
                <div className="image-holder">
                  <img
                    className="cart-img"
                    src={`http://localhost:8080/filemanagement/${
                      cartItem.imagePath.split("uploads/")[1]
                    }`}
                    alt={cartItem.productDescription}
                  />
                </div>
                <div className="desc-holder">
                  <div className="desc-detail">
                    <p className="prod-desc">{cartItem.productDescription}</p>
                  </div>
                  <div className="other-details">
                    <p
                      className="details-list"
                      style={{
                        color: "green",
                        fontStyle: "italic",
                        fontSize: "smaller",
                      }}
                    >
                      {cartItem.stockStatus === "true"
                        ? "IN STOCK"
                        : "OUT OF STOCK"}
                    </p>
                    <p className="details-list">Sold By: {cartItem.seller}</p>
                    <p className="details-list">Eligible for FREE Shipping</p>
                  </div>
                  <div className="action-holder">
                    <div className="btn-holder">
                      {cartItem.qty !== 1 ? (
                        <button
                          className="cart-btn"
                          onClick={() => decrementCart(cartItem.id)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
                        </button>
                      ) : (
                        <button
                          className="cart-btn"
                          onClick={() => removeCartItem(cartItem.id)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash" size="sm" />
                        </button>
                      )}
                      <div className="count">{cartItem.qty}</div>
                      <button
                        className="cart-btn"
                        onClick={() => incrementCart(cartItem)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                      </button>
                    </div>
                    <div className="Actions">
                      {/* Replacing <a> with <button> */}
                      <button className="act-btns">Delete</button>
                      <button className="act-btns">Save for Later</button>
                      <button className="act-btns">Share</button>
                      <button className="act-btns">See more like this</button>
                    </div>
                  </div>
                </div>

                <div className="price-tag">
                  <div className="discount-container">
                    <div className="discount-tag">{cartItem.discount}% Off</div>
                    <div className="discount-text">{cartItem.offer}</div>
                  </div>

                  <div className="actual-price">
                    {Math.round(
                      calculateDiscount(cartItem.discount, cartItem.mrp)
                    ).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </div>
                  <div className="actual-mrp">
                    M.R.P:{" "}
                    <span>
                      {" "}
                      {Math.floor(cartItem.mrp).toLocaleString("en-EN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="subtotal-section">
            Subtotal ({calculateCartCount()} Items) :{" "}
            {calculateCartTotal().toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </div>
        </div>
        <div className="payment-section">
          <PaymentComponent
            totalItems={calculateCartCount()}
            actualCartPrice={calculateActualAmount().toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
            totalCartDiscountPercent={totalDiscountedPercent()}
            finalCartAmount={calculateCartTotal().toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
