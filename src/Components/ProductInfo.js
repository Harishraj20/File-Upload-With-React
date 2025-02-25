import React from "react";
import "../Styles/ProductInfo.css";
import LgImage from "../Assests/whirlpool.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
function ProductInfo() {
  //sample data for design purpose
  const product = {
    id: 1,
    productName: "LG Double Door Refrigerator",
    productDescription:
      "LG 272 L 3 Star Frost-Free Smart Inverter Compressor Double Door Refrigerator (GL-S312SPZX, Shiny Steel, Convertible & Multi Air Flow Cooling, 2023 Model)",
    quantity: 20,
    capacity: "272 L",
    starRating: 3,
    technology: "Smart Inverter Compressor",
    stockStatus: "true",
    seller: "LG Appliances Store",
    discount: 30,
    offer: "Limited time deal",
    mrp: 29980,

    recommendation: "yes",
    deliveryday: 2,
  };

  return (
    <div className="product-page">
      <div className="product-info">
        <div className="section-1">
          <img src={LgImage} alt="img" />
        </div>
        <div className="section-2">
          <div className="product-description-page">
            {product.productDescription}
          </div>
          <div className="star-rating info">
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={
                  index < product.starRating
                    ? "fa-solid fa-star"
                    : faStarRegular
                }
                style={{ color: "#f49510" }}
              />
            ))}
          </div>
          <div className="price-detailing product">
            <div className="productInfo-price">
              <div className="productInfo-discount-percent">- 30%</div>
              <div className="productInfo-discounted-price">₹29,990</div>
            </div>
            <div className="mrp-productinfo">
              M.R.P - <span>35,0000</span>
            </div>
            <div className="tax-text">Inclusive of all taxes</div>
          </div>

          <div className="product-specs">
            <div className="spec-detail">Product : {product.productName} </div>
            <div className="spec-detail">Brand : LG </div>
            <div className="spec-detail">Seller : {product.seller}</div>
            <div className="spec-detail">
              Technology used : {product.technology}
            </div>
            <div className="spec-detail">Delivery : 29, feb 2024 </div>
          </div>
        </div>
        <div className="section-3">3</div>
      </div>
    </div>
  );
}

export default ProductInfo;
