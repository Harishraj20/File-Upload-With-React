import React, { useContext, useEffect, useState } from "react";
import "../Styles/cart.css";
import PaymentComponent from "./PaymentComponent";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [saveForLater, setSaveForLater] = useState(() => {
    return JSON.parse(localStorage.getItem("savedForLater")) || [];
  });

  const {
    setCartList,
    calculateCartCount,
    calculateDiscount,
    totalDiscountedPercent,
    cartList,
    decrementCart,
    removeCartItem,
    handleCart,
    isDivOpen,
    toolTipId,
    setToolTipId,
    setIsDivOpen,
    calculateCartTotal,
    calculateActualAmount,
  } = useContext(CartContext);

  const handleSaveForLater = (id) => {
    const filteredCart = cartList.filter((element) => element.id !== id);
    const productForLater = cartList.find((element) => element.id === id);

    setCartList(() => {
      console.log("Cartlist updated....");
      return filteredCart;
    });
    setSaveForLater((prevState) => {
      console.log("save for later updated..............");
      return [...prevState, productForLater];
    });
  };

  useEffect(() => {
    console.log("me too");
  }, []);

  useEffect(() => {
    console.log("use effect to synchronize save for later with LS");
    localStorage.setItem("savedForLater", JSON.stringify(saveForLater));
  }, [saveForLater]);

  return (
    <div className="cart-div">
      {cartList.length === 0 ? (
        <EmptyCart
          addToCart={handleCart}
          saveForLater={saveForLater}
          setSaveForLater={setSaveForLater}
        />
      ) : (
        <div className="cart-holder">
          <div className="overall-holder">
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
                      <div
                        className="desc-detail"
                        onClick={() => navigate(`/product/${cartItem.id}`)}
                      >
                        <p className="prod-desc">
                          {cartItem.productDescription}
                        </p>
                      </div>
                      <div className="other-details">
                        <p
                          className="details-list"
                          id="stock-info"
                          style={
                            cartItem.status
                              ? {
                                  color: "#007600",
                                }
                              : {
                                  color: "red",
                                }
                          }
                        >
                          {cartItem.status ? "IN STOCK" : "OUT OF STOCK"}
                        </p>
                        <p className="details-list">
                          Sold By: {cartItem.seller}
                        </p>
                        <p className="details-list">
                          Eligible for FREE Shipping
                        </p>
                      </div>
                      <div className="action-holder">
                        <div className="btn-holder">
                          {isDivOpen && toolTipId === cartItem.id && (
                            <>
                              <div className="tool-tip">
                                <div
                                  className="close-btn"
                                  onClick={() => {
                                    setIsDivOpen(false);
                                    setToolTipId("");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-x"
                                    size="2xs"
                                  />
                                </div>{" "}
                                This seller has a limit of 3 per customer. To
                                see if more are available from another seller,
                                go to the product detail page.
                              </div>
                            </>
                          )}

                          {cartItem.qty !== 1 ? (
                            <button
                              className="cart-btn"
                              onClick={() => decrementCart(cartItem.id)}
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-minus"
                                size="sm"
                              />
                            </button>
                          ) : (
                            <button
                              className="cart-btn"
                              onClick={() => removeCartItem(cartItem.id)}
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-trash"
                                size="sm"
                              />
                            </button>
                          )}
                          <div className="count">{cartItem.qty}</div>
                          <button
                            className="cart-btn"
                            disabled={!cartItem.status}
                            onClick={() => handleCart(cartItem.id)}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-plus"
                              size="sm"
                            />
                          </button>
                        </div>

                        <div className="Actions">
                          <button
                            className="act-btns"
                            onClick={() => removeCartItem(cartItem.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="act-btns"
                            onClick={() => {
                              console.log("ran randomly");
                              handleSaveForLater(cartItem.id);
                            }}
                          >
                            Save for Later
                          </button>
                          <button className="act-btns">Share</button>
                          <button className="act-btns">
                            See more like this
                          </button>
                        </div>

                        {cartItem.stockMessage ? (
                          <div className="stock-message">
                            {cartItem.stockMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="price-tag">
                      <div className="discount-container">
                        <div className="discount-tag">
                          {cartItem.discount}% Off
                        </div>
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
                        <span className="actual-mrp-span">
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
      )}
    </div>
  );
}

export default Cart;
