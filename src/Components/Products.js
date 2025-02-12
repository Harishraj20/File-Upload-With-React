import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [prodMsg, setProdMsg] = useState("");
  const [cart, setCart] = useState([]);

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
    <>
      <h2 className="title">PRODUCTS LIST</h2>
      <p style={{ color: "green" }} className="cart-message">
        {prodMsg}
      </p>
      <div className="product-holder">
        {products.length > 0 ? (
          products
            .filter((prod) => prod.quantity > 0)
            .map((prod, index) => (
              <div className="product-card" key={index}>
                <div className="img-container">
                  <img
                    src={`http://localhost:8080/filemanagement/${
                      prod.imagePath.split("uploads/")[1]
                    }`}
                    alt={prod.prodName}
                  />
                </div>
                <div className="content-holder">
                  <p className="product-name">
                    Name: <span>{prod.productName}</span>
                  </p>
                  <p className="product-quantity">
                    Quantity: <span>{prod.quantity}</span>
                  </p>
                  <button
                    className="add-to-cart"
                    onClick={() => handleCart(prod.id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}

export default Products;
