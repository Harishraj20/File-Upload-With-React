import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
function Products() {
  const [products, setProducts] = useState([]);
  const [prodMsg, setProdMsg] = useState("");
  const [cart, setCart] = useState([]);

  const generateDeliveryTime = () => {
    const date = new Date();

    const newDate = new Date(date);
    newDate.setDate(date.getDate() + Math.floor(Math.random() * 6) + 2);
    const formattedDate = newDate.toLocaleDateString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    return formattedDate;
  };
  const calculateDiscountedVal = (discountValue, costPrice) => {
    const discountedAmount = costPrice * (discountValue / 100);
    const discountedPrice = costPrice - discountedAmount;

    const formattedPrice = discountedPrice.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    console.log(formattedPrice);
    return formattedPrice.split("₹")[1].split(".")[0];
  };

  useEffect(() => {
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
          setProdMsg("No Products available!");
          return;
        }

        setProducts(data);
        console.log(data);
      } catch (error) {
        setProdMsg(error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("called 2nd");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Items from Cart: ", storedCart);
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleCart = (id) => {
    console.log(`Cart method called! for product ${id}`);
    const product = products.find((prod) => prod.id === id);

    if (!product) {
      setProdMsg("Product not found!");
      return;
    }

    if (product.quantity === 0) {
      console.log("Out of stock!");
      setProdMsg("Product out of stock!");
      return;
    }

    setCart((prevState) => {
      const existingCartItem = prevState.find((element) => element.id === id);

      if (existingCartItem) {
        console.log("Already in the cart! Increasing quantity...");
        setProdMsg("Product already in cart. Quantity updated!");

        return prevState.map((prod) =>
          prod.id === id ? { ...prod, qty: prod.qty + 1 } : prod
        );
      }

      console.log("Adding new product to the cart...");
      setProdMsg("Product added to cart!");

      return [...prevState, { ...product, qty: 1 }];
    });
  };
  return (
    <div className="home-page">
      <p style={{ color: "green" }} className="cart-message">
        {prodMsg}
      </p>
      <div className="product-holder">
        {products.length > 0 ? (
          products
            .filter((prod) => prod.quantity > 0)
            .map((prod, index) => (
              <div className="product-card" key={prod.id}>
                <div className="img-container">
                  <img
                    src={`http://localhost:8080/filemanagement/${
                      prod.imagePath.split("uploads/")[1]
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
                      {calculateDiscountedVal(prod.discount, prod.mrp)}
                    </p>
                    <p className="actual-cost">M.R.P: ₹{prod.mrp}</p>
                    <p className="discount-value">({prod.discount}% off)</p>
                  </div>
                  <div className="delivery-time">
                    FREE delivery <span>{generateDeliveryTime()}</span>
                  </div>
                  <div className="seller-info">sold by: {prod.seller}</div>
                  <div className="product-cart-container">
                    <button
                      className="add-to-cart"
                      onClick={() => handleCart(prod.id)}
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
