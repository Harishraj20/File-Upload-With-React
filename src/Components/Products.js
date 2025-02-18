import React, { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../Context/Context";

function Products() {
  const { handleCart, productList, calculateDiscount } = useContext(CartContext);
  const [prodMsg, setProdMsg] = useState("");

  useEffect(() => {
    setTimeout(() => { setProdMsg(""); }, 5000);
  }, [prodMsg]);

  const generateDeliveryTime = (value) => {
    const date = new Date();

    const newDate = new Date(date);
    newDate.setDate(date.getDate() + value);
    const formattedDate = newDate.toLocaleDateString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    return formattedDate;
  };

  return (
    <div className="home-page">
      {prodMsg && <p className="cart-message">{prodMsg}</p>}
      <div className="product-holder">
        {productList.length > 0 ? (
          productList
            .filter((prod) => prod.quantity > 0)
            .map((prod) => (
              <div className="product-card" key={prod.id}>
                <div className="img-container">
                  <img
                    src={`http://localhost:8080/filemanagement/${prod.imagePath.split("uploads/")[1]
                      }`}
                    alt={prod.prodName}
                    className="product-card-image"
                  />
                </div>
                <div className="content-holder">
                  <div className="product-name-holder">
                    <p className="product-name">{prod.productDescription}</p>
                  </div>
                  <div className="star-rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={
                          index < prod.starRating
                            ? "fa-solid fa-star"
                            : faStarRegular
                        }
                        style={{ color: "#f49510" }}
                      />
                    ))}
                  </div>

                  <div className="price-detailing">
                    <span className="price-symbol">₹</span>
                    <p className="dicount-price">
                      {calculateDiscount(prod.discount, prod.mrp).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).split("₹")[1].split(".")[0]}
                    </p>
                    <p className="actual-cost">M.R.P: ₹{prod.mrp}</p>
                    <p className="discount-value">({prod.discount}% off)</p>
                  </div>
                  <div className="delivery-time">
                    FREE delivery <span>{generateDeliveryTime(prod.deliveryday)}</span>
                  </div>
                  <div className="seller-info">sold by: {prod.seller}</div>
                  <div className="product-cart-container">
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        setProdMsg("Item added to cart")
                         handleCart(prod.id) }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
