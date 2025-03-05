import React from "react";
import "../Styles/Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaymentComponent = ({
  actualCartPrice,
  totalCartDiscountPercent,
  finalCartAmount,
  totalItems,
}) => {
  return (
    <div className="payment-div">
      <div className="heading">SUBTOTAL ({totalItems} {totalItems == 1 ? "Item" : "Items"}): </div>
      <div className="total-amount">
        <div className="payment-text">Total Amount: </div>
        <div className="payment-value">{finalCartAmount}</div>
      </div>
      <div className="actual-amount">
        <div className="payment-text">Actual Price: </div>
        <div className="payment-value" id="payment-value-text">{actualCartPrice}</div>
      </div>
      <div className="overall-discount">
        <div className="payment-text">Total Discount (%): </div>
        <div className="payment-value">{totalCartDiscountPercent}%(off)</div>
      </div>
      <div className="proceed-to-pay-div">
        <button className="payment-button">
          Procced to Checkout{" "}
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right"
            size="sm"
            className="checkout-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default PaymentComponent;
