import React, { useEffect, useState, useContext, useMemo } from "react";
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

  const calculateCartTotal = useMemo(() => {
    return cartList.reduce(
      (total, item) =>
        total +
        Math.round(calculateDiscount(item.discount, item.mrp)) * item.qty,
      0
    );
  }, [cartList]);

  const calculateCartCount = useMemo(() => {
    return cartList.reduce((total, item) => total + item.qty, 0);
  }, [cartList]);

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

  const calculateActualAmount = useMemo(() => {
    return cartList.reduce((total, item) => total + item.mrp * item.qty, 0);
  }, [cartList]);

  const totalDiscountedPercent = useMemo(() => {
    if (calculateActualAmount === 0) return 0;

    const totalPercentOfDiscount =
      ((calculateActualAmount - calculateCartTotal) / calculateActualAmount) * 100;

    return Math.round(totalPercentOfDiscount);
  }, [calculateCartTotal, calculateActualAmount]);


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
      const existingCartItem = prevState.find((item) => item.id === id);

      if (existingCartItem) {
        if (existingCartItem.qty >= 3) {
          setToolTipId(id);
          setIsDivOpen(true);
          return prevState;
        }

        return synchronizeCart(
          prevState.map((item) =>
            item.id === id && item.qty < product.quantity
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        );
      }

      return synchronizeCart([...prevState, { ...product, qty: 1 }]);
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
