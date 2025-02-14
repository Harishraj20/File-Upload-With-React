import React, { useEffect, useState } from "react";

const EmptyCart = ({ addToCart }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/filemanagement/recommendedproducts"
        );
        if (!response.ok) {
          throw new Error("Server error");
        }
        const data = await response.json();
        setRecommendedProducts(data);
        console.log("Fetched recommended products:", data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecommendedProducts();
  }, []);

  return (
    <div className="no-cart">
      <div className="left-section">
        <div className="no-cart-msg">
          <p
            className="
      empty-msg"
          >
            Your Cart is empty
          </p>
          <p className="empty-cart-description">
            Your shopping cart is waiting. Give it purpose - fill it wilh
            groceries, clothing, household supplies, electronics and more.
            Continue shopping on the Homepage, learn about today's deals, or
            visit your Wish List.
          </p>
        </div>
        <div className="empty-div">
          <div className="no-cart-heading">Your Items</div>
          <div className="no-cart-description">No Items saved for Later</div>
        </div>
        <div className="subscription-details">
          The price and availabity of items are subject to change. The shopping
          cart is a temporary place to store a list of your items and reflects
          each item's most recent price. Do do you have any promotional code?
          We'll ask you to enter your claim code when it's time to pay.
        </div>
      </div>
      <div className="right-section">
        <div className="recommendations">Recommendations for all products:</div>
        <div className="recomendation-holder">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((prod) => (
              <div className="recommended-card" key={prod.id}>
                <div className="img-holder">
                  <img
                    src={`http://localhost:8080/filemanagement/${
                      prod.imagePath.split("uploads/")[1]
                    }`}
                    alt={prod.productName}
                  />
                </div>
                <div className="text-field">
                  <p className="rec-desc">
                    <a
                      href="/"
                      style={{ textDecoration: "none", color: "#2162a1" }}
                    >
                      {prod.productDescription}
                    </a>
                  </p>
                  <p className="rec-price">
                    {prod.mrp.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <button
                    className="rec-btn"
                    onClick={() => addToCart(prod.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No Products</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
