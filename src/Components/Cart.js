import React, { useContext, useEffect, useState } from "react";
import "../Styles/cart.css";
import PaymentComponent from "./PaymentComponent";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cart() {
  const { productList, fetchProducts } = useContext(ProductContext);
  const [cartList, setCartList] = useState([]);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [toolTipId, setToolTipId] = useState("");
  useEffect(() => {
    console.log("Im called");
    const loadProducts = async () => {
      const cartProducts = localStorage.getItem("cart");
      const parsedList = cartProducts ? JSON.parse(cartProducts) : [];

      console.log("Use effect's cart value: ", cartProducts);
      setCartList(parsedList);
      await fetchProducts();
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToolTipId("");
      setIsDivOpen(false);
    }, 10000);
  }, [toolTipId, isDivOpen]);

  useEffect(() => {
    console.log("Im called - 2");
    if (productList.length > 0) {
      synchronizeCart(cartList);
    }
  }, [productList]);

  useEffect(() => {
    console.log("Im called - 3");

    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const calculateDiscount = (discountValue, costPrice) => {
    const discountedAmount = costPrice * (discountValue / 100);
    const discountedPrice = costPrice - discountedAmount;
    return discountedPrice;
  };

  const calculateCartTotal = () => {
    console.log("Calculate Cart Total called!");
    return cartList.reduce(
      (total, item) =>
        total +
        Math.round(calculateDiscount(item.discount, item.mrp)) * item.qty,
      0
    );
  };

  const calculateCartCount = () => {
    console.log("calculateCartCount called!");

    return cartList.reduce((total, item) => total + item.qty, 0);
  };

  const removeCartItem = (id) => {
    console.log("removeCartItem called!");
    setCartList((prevState) => prevState.filter((item) => item.id !== id));
  };

  const decrementCart = (id) => {
    console.log("decrementCart called!");
    setCartList((prevState) => {
      const updatedCart = prevState.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      );
      synchronizeCart(updatedCart);
      return updatedCart;
    });
  };

  const calculateActualAmount = () => {
    console.log("calculateActualAmount called!");
    return cartList.reduce((total, item) => total + item.mrp * item.qty, 0);
  };
  const totalDiscountedPercent = () => {
    const discountAmount = calculateCartTotal();
    const actualPrice = calculateActualAmount();
    const totalPercentOfDiscount =
      ((actualPrice - discountAmount) / actualPrice) * 100;
    return Math.round(totalPercentOfDiscount);
  };

  const incrementCart = (prod) => {
    if (prod.qty === 3) {
      setIsDivOpen(true);
      setToolTipId(prod.id);
      console.log("returned");
      return;
    }

    console.log("calculateActualAmount");
    if (prod.qty >= prod.quantity) {
      return;
    }
    setCartList((prevState) => {
      const updatedList = prevState.map((item) =>
        item.id === prod.id ? { ...item, qty: Math.max(item.qty + 1, 1) } : item
      );
      synchronizeCart(updatedList);
      return updatedList;
    });
  };

  const synchronizeCart = (updatedCart) => {
    setCartList(
      updatedCart.map((product) => {
        const fetchedProduct = productList.find(
          (prod) => prod.id === product.id
        );

        if (fetchedProduct) {
          let stockMessage = "";
          if (product.qty <= fetchedProduct.quantity) {
            if (fetchedProduct.quantity <= 4) {
              stockMessage = `Only ${fetchedProduct.quantity} Left !`;
            }

            return {
              ...product,
              status: true,
              stockMessage,
              quantity: fetchedProduct.quantity,
            };
          } else {
            return {
              ...product,
              status: false,
              stockMessage: "",
              quantity: fetchedProduct.quantity,
            };
          }
        } else {
          return { ...product, status: true, stockMessage: "" };
        }
      })
    );
  };
  const handleCart = (id) => {
    console.log(`Cart method called! for product ${id}`);
    const product = productList.find((prod) => prod.id === id);

    if (product.quantity === 0) {
      console.log("Out of stock!");
      return;
    }
    setCartList((prevState) => {
      const existingCartItem = prevState.find((element) => element.id === id);

      let updatedCart;
      if (existingCartItem) {
        console.log("Already in the cart! Increasing quantity...");

        updatedCart = prevState.map((prod) =>
          prod.id === id ? { ...prod, qty: prod.qty + 1 } : prod
        );
      } else {
        console.log("Adding new product to the cart...");

        updatedCart = [...prevState, { ...product, qty: 1 }];
      }

      synchronizeCart(updatedCart);
      return updatedCart;
    });
  };

  return (
    <div className="cart-div">
      <p className="cart-title">CART PAGE</p>
      {cartList.length === 0 ? (
        <EmptyCart addToCart={handleCart} />
      ) : (
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
                      <p className="details-list">Sold By: {cartItem.seller}</p>
                      <p className="details-list">Eligible for FREE Shipping</p>
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
                              This seller has a limit of 3 per customer. To see
                              if more are available from another seller, go to
                              the product detail page.
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
                          onClick={() => incrementCart(cartItem)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                        </button>
                      </div>

                      <div className="Actions">
                        <button
                          className="act-btns"
                          onClick={() => removeCartItem(cartItem.id)}
                        >
                          Delete
                        </button>
                        <button className="act-btns">Save for Later</button>
                        <button className="act-btns">Share</button>
                        <button className="act-btns">See more like this</button>
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
