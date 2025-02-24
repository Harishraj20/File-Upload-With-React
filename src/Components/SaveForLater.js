import React, { useContext } from "react";
import { CartContext } from "../Context/Context";

function SaveForLater({ saveForLater }) {
    const { calculateDiscount, setCartList, moveToCart } =
        useContext(CartContext);
    return (
        <div className="empty-div">
            <div className="no-cart-heading">Your Items (Saved For Later)</div>
            <div className="no-cart-description">
                {saveForLater.length > 0 ? (
                    saveForLater
                        .filter((prod) => prod.quantity > 0)
                        .map((prod) => (
                            <div className="product-card-container" key={prod.id}>
                                <div className="image-wrapper">
                                    <img
                                        src={`http://localhost:8080/filemanagement/${prod.imagePath.split("uploads/")[1]
                                            }`}
                                        alt={prod.prodName}
                                        className="product-image"
                                    />
                                </div>
                                <div className="product-details">
                                    <div
                                        className="product-title"
                                        onClick={() => navigate(`/product/${prod.id}`)}
                                    >
                                        <p className="product-description">
                                            {prod.productDescription}
                                        </p>
                                    </div>
                                    <div className="pricing-info">
                                        <span className="currency-symbol">₹</span>
                                        <p className="discounted-price">
                                            {
                                                calculateDiscount(prod.discount, prod.mrp)
                                                    .toLocaleString("en-IN", {
                                                        style: "currency",
                                                        currency: "INR",
                                                    })
                                                    .split("₹")[1]
                                                    .split(".")[0]
                                            }
                                        </p>
                                    </div>
                                    <div className="vendor-info">Sold by: {prod.seller}</div>
                                    <div className="cart-action">
                                        <button
                                            className="add-to-cart-button"
                                            onClick={() => {
                                                moveToCart(prod);
                                            }}
                                        >
                                            Move To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No Items saved for Later</p>
                )}
            </div>
        </div>
    );
}

export default SaveForLater;
