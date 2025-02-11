import React, { useEffect, useState } from "react";
import "./cart.css";
// import samsungFridge from "./Assets/samsungFridge.jpg";
// import godrej from "./Assets/godrej.jpg";
// import whirlpool from "./Assets/whirlpool.jpg";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Cart() {
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      const cartProducts = localStorage.getItem("cart");
      console.log("Cart Products: ", JSON.parse(cartProducts));
      setCartList(JSON.parse(cartProducts) || []);
      await fetchProducts(); 
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (cartList.length > 0 && productList.length > 0) {
      handleCart(); 
    }
  }, [cartList, productList]); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/filemanagement/fetchProducts"
      );

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      const data = await response.json();

      if (data.length === 0) {
        console.log("No products Available");
        return;
      }

      setProductList(data);
      console.log("Data Fetched From DB: ",data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCart = () => {
    console.log("Handle Cart fcn called!....");

    const exceededProducts = cartList.filter((item) => {
      const foundItem = productList.find((prod) => prod.id === item.id);
      return foundItem && foundItem.quantity >= item.qty;
    });
    console.log("exceeded products", exceededProducts);
  };

  return (
    <div className="cart-div">
      <p className="cart-title">CART PAGE</p>

      <div className="cart-holder">
        <div className="cart-list">
          {/* <div className="cart-card">
            <div className="image-holder">
              <img className="cart-img" src={LGImage} alt="mobile picture" />
            </div>
            <div className="desc-holder">
              <div className="desc-detail">
                <p className="prod-desc">
                  LG 242 L 3 Star Smart Inverter Frost-Free Double Door
                  Refrigerator (GL-I292RPZX, Shiny Steel, Door Cooling+)
                </p>
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
                  IN STOCK
                </p>
                <p className="details-list">
                  Sold By: Full-Sized Freezer-on-Top
                </p>
                <p className="details-list">Eligible for FREE Shipping</p>
              </div>
              <div className="action-holder">
                <div className="btn-holder">
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
                  </button>
                  <div className="count">7</div>
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                  </button>
                </div>
                <div className="Actions">
                  <a href="" className="act-btns">
                    Delete
                  </a>
                  <a href="" className="act-btns">
                    save for Later
                  </a>
                  <a href="" className="act-btns">
                    Share
                  </a>
                  <a href="" className="act-btns">
                    see more like this
                  </a>
                </div>
              </div>
            </div>

            <div className="price-tag">
              <div className="discount-container">
                <div className="discount-tag">55% Off</div>
                <div className="discount-text">Limited time deal</div>
              </div>

              <div className="actual-price">₹1,824.00</div>
              <div className="actual-mrp">
                M.R.P: <span> ₹2,500.00</span>
              </div>
            </div>
          </div> */}

          {/* <div className="cart-card">
            <div className="image-holder">
              <img className="cart-img" src={whirlpool} alt="mobile picture" />
            </div>
            <div className="desc-holder">
              <div className="desc-detail">
                <p className="prod-desc">
                  Whirlpool 235 L Frost Free Triple-Door Refrigerator (FP 253D
                  PROTTON ROY RADIANT STEEL(Z) Double Door Refrigerator space,
                  2024 Model)
                </p>
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
                  IN STOCK
                </p>
                <p className="details-list">
                  Sold By: Full-Sized Freezer-on-Top
                </p>
                <p className="details-list">Eligible for FREE Shipping</p>
              </div>
              <div className="action-holder">
                <div className="btn-holder">
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
                  </button>
                  <div className="count">7</div>
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                  </button>
                </div>
                <div className="Actions">
                  <a href="" className="act-btns">
                    Delete
                  </a>
                  <a href="" className="act-btns">
                    save for Later
                  </a>
                  <a href="" className="act-btns">
                    Share
                  </a>
                  <a href="" className="act-btns">
                    see more like this
                  </a>
                </div>
              </div>
            </div>

            <div className="price-tag">
              <div className="discount-container">
                <div className="discount-tag">29% Off</div>
                <div className="discount-text">Limited time deal</div>
              </div>

              <div className="actual-price">₹26,900.00</div>
              <div className="actual-mrp">
                M.R.P: <span> ₹38,150.00</span>
              </div>
            </div>
          </div>

          <div className="cart-card">
            <div className="image-holder">
              <img className="cart-img" src={godrej} alt="mobile picture" />
            </div>
            <div className="desc-holder">
              <div className="desc-detail">
                <p className="prod-desc">
                  Godrej 223 L 2 Star Nano Shield Technology, Inverter Frost
                  Free Double Door Refrigerator(2023 Model, RF EON 244B RI ST
                  GL, Steel Glow)
                </p>
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
                  IN STOCK
                </p>
                <p className="details-list">
                  Sold By: Full-Sized Freezer-on-Top
                </p>
                <p className="details-list">Eligible for FREE Shipping</p>
              </div>
              <div className="action-holder">
                <div className="btn-holder">
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
                  </button>
                  <div className="count">7</div>
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                  </button>
                </div>
                <div className="Actions">
                  <a href="" className="act-btns">
                    Delete
                  </a>
                  <a href="" className="act-btns">
                    save for Later
                  </a>
                  <a href="" className="act-btns">
                    Share
                  </a>
                  <a href="" className="act-btns">
                    see more like this
                  </a>
                </div>
              </div>
            </div>

            <div className="price-tag">
              <div className="discount-container">
                <div className="discount-tag">39% Off</div>
                <div className="discount-text">Limited time deal</div>
              </div>

              <div className="actual-price">₹20,450.00</div>
              <div className="actual-mrp">
                M.R.P: <span> ₹33,00.00</span>
              </div>
            </div>
          </div>
          <div className="cart-card">
            <div className="image-holder">
              <img
                className="cart-img"
                src={samsungFridge}
                alt="mobile picture"
              />
            </div>
            <div className="desc-holder">
              <div className="desc-detail">
                <p className="prod-desc">
                  Samsung 236 L, 3 Star, Digital Inverter, Frost Free Double
                  Door Refrigerator (RT28C3053S8/HL, Silver, Elegant Inox, 2024
                  Model)
                </p>
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
                  IN STOCK
                </p>
                <p className="details-list">
                  Sold By: Full-Sized Freezer-on-Top
                </p>
                <p className="details-list">Eligible for FREE Shipping</p>
              </div>
              <div className="action-holder">
                <div className="btn-holder">
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
                  </button>
                  <div className="count">7</div>
                  <button className="cart-btn">
                    <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
                  </button>
                </div>
                <div className="Actions">
                  <a href="" className="act-btns">
                    Delete
                  </a>
                  <a href="" className="act-btns">
                    save for Later
                  </a>
                  <a href="" className="act-btns">
                    Share
                  </a>
                  <a href="" className="act-btns">
                    see more like this
                  </a>
                </div>
              </div>
            </div>
            <div className="price-tag">
              <div className="discount-container">
                <div className="discount-tag">33% Off</div>
                <div className="discount-text">Limited time deal</div>
              </div>

              <div className="actual-price">₹25,940.00</div>
              <div className="actual-mrp">
                M.R.P: <span> ₹37990.00</span>
              </div>
            </div>
          </div>

          <div className="subtotal-section">Subtotal (3 Items) : ₹1,824.00</div> */}
        </div> 
        <div className="payment-section"></div>
      </div>
    </div>
  );
}

export default Cart;
