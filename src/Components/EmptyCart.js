import React from "react";

const EmptyCart = () => {
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
          Continue shopping on the Homepage, learn about today's deals, or visit
          your Wish List.
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
            <div className="recommendations">
                Recommendations for all products:
            </div>

        </div>
      
    </div>
  );
};

export default EmptyCart;
