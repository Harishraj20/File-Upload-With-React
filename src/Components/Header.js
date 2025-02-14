import React from "react";
import "../Styles/Header.css";
import amazonIcon from "../Assests/amazon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <div className="header">
      <div className="logo-png">
        <img src={amazonIcon} alt="amazon" />
      </div>
      <div className="user-location">
        <FontAwesomeIcon
          icon="fa-solid fa-location-dot"
          size="xl"
          className="location-icon"
        />
        <div className="header-address-div">
          <p className="location-text">Delivering to Chennai 600021</p>
          <p className="update-location">Update Location</p>
        </div>
      </div>
      <div className="search-field">
        <div className="search-holder">
          <select name="" id="" className="select-field">
            <option value="all">all</option>
            <option value="television">television fgyheyuyr</option>
          </select>
          <input
            type="text"
            className="search-input"
            placeholder="search products"
          />
          <span className="select-icon">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              size="lg"
              style={{ color: "#000000" }}
            />{" "}
          </span>
        </div>
      </div>
      <div className="account-details">
        <div className="hello-msg">Hello, Sign in</div>
        <div className="acc-listing">Account & Lists</div>
      </div>
      <div className="orders-summary">Orders & Returns</div>
      <div className="cart-icon">
        <div className="cart-icon-tag">
          {" "}
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            size="2xl"
          />
        </div>
        <div className="cart-count-div">80</div>
        <div className="cart-name-tag">Cart</div>
      </div>
    </div>
  );
}

export default Header;
