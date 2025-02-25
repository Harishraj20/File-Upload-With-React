import React, { useState, useRef, useEffect, useContext } from "react";
import "../Styles/Header.css";
import amazonIcon from "../Assests/amazon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { CartContext, ProductContext } from "../Context/Context";

function Header() {
  const { setFilteredProducts, productList } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { calculateCartCount } = useContext(CartContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }
    setShowResults(false);
    setFilteredProducts(searchResult);
  };
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const handleSearchField = async (e) => {
    const value = e.target.value;
    setSearch(value);
    await fetchSearchResults(value);
    setShowResults(true);
  };


  const navigateToHomePage = () => {
    setSearch("");
    setSearchResult([]);
    setFilteredProducts(productList);
    navigate("/")
  }

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setShowResults(false);
      setFilteredProducts(productList);
      setSearchResult([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/filemanagement/search?val=${query}`
      );
      if (!response.ok) {
        throw new Error("Internal server error...");
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };
  const handleProductSelect = (product) => {
    console.log(product.productName);
    setSearch(product.productName)
    setFilteredProducts([product]);
    setShowResults(false);
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="logo-png" onClick={() => navigateToHomePage()}>
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
      <div className="search-field" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-holder">
            <select name="" id="" className="select-field" disabled>
              <option value="all">all</option>
              <option value="television">television fgyheyuyr</option>
            </select>
            <input
              onChange={handleSearchField}
              type="text"
              className="search-input"
              placeholder="search products"
              value={search}
              onFocus={() => setShowResults(true)}
            />

            <span
              className="select-icon"
              onClick={(e) => handleSearchSubmit(e)}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                size="lg"
                style={{ color: "#000000" }}
              />
            </span>
            {showResults && searchResult.length > 0 && (
              <div className="search-list">
                {searchResult.map((product, index) => (
                  <div className="result-div" key={index} onClick={() => {
                    handleProductSelect(product)
                  }}>
                    <div className="search-icon">
                      <FontAwesomeIcon
                        icon="fa-solid fa-magnifying-glass"
                        size="sm"
                      />
                    </div>
                    {product.productName}
                  </div>
                ))}
              </div>
            )}
            {showResults && searchResult.length === 0 && search.trim() && (
              <div className="search-list empty">No Results</div>
            )}
          </div>
        </form>
      </div>
      <div className="account-details">
        <div className="hello-msg">Hello, Sign in</div>
        <div className="acc-listing">Account & Lists</div>
      </div>
      <div className="orders-summary">Orders & Returns</div>
      <div className="cart-icon" onClick={() => navigate("/cart")}>
        <div className="cart-icon-tag">
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="2xl" />
        </div>
        <div className="cart-count-div">{calculateCartCount()}</div>
        <div className="cart-name-tag">Cart</div>
      </div>
    </div>
  );
}

export default Header;
