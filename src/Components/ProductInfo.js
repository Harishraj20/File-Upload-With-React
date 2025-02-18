import React from "react";
import "../Styles/ProductInfo.css";
import LgImage from "../Assests/whirlpool.jpg"
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



















        </div>
        <div className="section-3">3</div>















      </div>
    </div>
  );
}

export default ProductInfo;
