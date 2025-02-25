import React, { useContext } from "react";
import { CartContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function SaveForLater({ productList, setSaveForLater }) {
    const { calculateDiscount, setCartList } = useContext(CartContext);
    const navigate = useNavigate();

    const moveToCart = (prod) => {
        console.log(prod);
        setCartList((prevState) => [...prevState, prod]);
        setSaveForLater((prevState) => {
            const filterSaveForLater = prevState.filter(
                (product) => product.id !== prod.id
            );
            return filterSaveForLater;
        });
    };

    return (
        <>
            {productList.length > 0 ? (
                <div className="empty-div">
                    <div className="no-cart-heading">
                        Saved For Later ( {productList.length}{" "}
                        {productList.length === 1 ? "Item" : "Items"})
                    </div>
                    <div className="no-cart-description">
                        {productList
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
                                                onClick={() => moveToCart(prod)}
                                            >
                                                Move To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div className="empty-div-message">
                    <div className="no-cart-heading-div">
                        Your Items (Saved For Later)
                    </div>
                    <p className="no-item-msg">No Items saved for Later</p>
                </div>
            )}
        </>
    );
}

export default SaveForLater;
