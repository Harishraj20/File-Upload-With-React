import React, { useEffect, useState, useContext } from "react";
import { CartContext, ProductContext } from "../Context/Context";

function CartContextProvider({ children }) {
  const { productList, fetchProducts } = useContext(ProductContext);
  const [cartList, setCartList] = useState([]);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [toolTipId, setToolTipId] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const cartProducts = localStorage.getItem("cart");
      const parsedList = cartProducts ? JSON.parse(cartProducts) : [];

      setCartList(parsedList);
      await fetchProducts();
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToolTipId("");
      setIsDivOpen(false);
    }, 10000);
  }, [toolTipId, isDivOpen]);

  useEffect(() => {
    if (productList.length > 0) {
      setCartList(() => synchronizeCart(cartList));
    }
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const calculateDiscount = (discountValue, costPrice) => {
    const discountedAmount = costPrice * (discountValue / 100);
    const discountedPrice = costPrice - discountedAmount;
    return discountedPrice;
  };

  const calculateCartTotal = () => {
    return cartList.reduce(
      (total, item) =>
        total +
        Math.round(calculateDiscount(item.discount, item.mrp)) * item.qty,
      0
    );
  };

  const calculateCartCount = () => {
    return cartList.reduce((total, item) => total + item.qty, 0);
  };

  const removeCartItem = (id) => {
    setCartList((prevState) => prevState.filter((item) => item.id !== id));
  };

  const decrementCart = (id) => {
    setCartList((prevState) => {
      const updatedCart = prevState.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      );
      return synchronizeCart(updatedCart);
    });
  };

  const calculateActualAmount = () => {
    return cartList.reduce((total, item) => total + item.mrp * item.qty, 0);
  };
  const totalDiscountedPercent = () => {
    const discountAmount = calculateCartTotal();
    const actualPrice = calculateActualAmount();
    const totalPercentOfDiscount =
      ((actualPrice - discountAmount) / actualPrice) * 100;
    return Math.round(totalPercentOfDiscount);
  };

  const synchronizeCart = (updatedCart) => {
    const newList = updatedCart.map((product) => {
      const fetchedProduct = productList.find((prod) => prod.id === product.id);

      if (!fetchedProduct)
        return { ...product, status: true, stockMessage: "" };

      let stockMessage = "";
      if (product.qty < fetchedProduct.quantity) {
        if (fetchedProduct.quantity <= 4) {
          stockMessage = `Only ${fetchedProduct.quantity} Left !`;
        }
        return {
          ...product,
          status: true,
          stockMessage,
          quantity: fetchedProduct.quantity,
        };
      } else {
        return {
          ...product,
          status: false,
          stockMessage: "",
          quantity: fetchedProduct.quantity,
        };
      }
    });
    return newList;
  };
  const handleCart = (id) => {
    const product = productList.find((prod) => prod.id === id);

    if (product.quantity === 0) {
      return;
    }

    setCartList((prevState) => {
      const existingCartItem = prevState.find((element) => element.id === id);

      let updatedCart;
      if (existingCartItem) {
        if (existingCartItem.qty < product.quantity) {
          updatedCart = prevState.map((prod) =>
            prod.id === id ? { ...prod, qty: prod.qty + 1 } : prod
          );
        } else {
          updatedCart = [...prevState];
        }
      } else {
        updatedCart = [...prevState, { ...product, qty: 1 }];
      }
      const newList = synchronizeCart(updatedCart);
      return newList;
    });
  };
  return (
    <CartContext.Provider
      value={{
        calculateCartCount,
        calculateDiscount,
        totalDiscountedPercent,
        setCartList,
        productList,
        fetchProducts,
        cartList,
        decrementCart,
        removeCartItem,
        handleCart,
        isDivOpen,
        toolTipId,
        setToolTipId,
        setIsDivOpen,
        calculateCartTotal,
        calculateActualAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
