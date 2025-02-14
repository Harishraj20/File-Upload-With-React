// import React, { useEffect, useState ,useContext} from "react";
// import { CartContext,ProductContext } from "../Context/Context";

// function CartContextProvider({children}) {
//   const { productList, fetchProducts } = useContext(ProductContext);
//   const [cartList, setCartList] = useState([]);
//   const [isDivOpen, setIsDivOpen] = useState(false);
//   const [toolTipId, setToolTipId] = useState("");
//   useEffect(() => {
//     console.log("Im called");
//     const loadProducts = async () => {
//       const cartProducts = localStorage.getItem("cart");
//       const parsedList = cartProducts ? JSON.parse(cartProducts) : [];

//       console.log("Use effect's cart value: ", cartProducts);
//       setCartList(parsedList);
//       await fetchProducts();
//     };

//     loadProducts();
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setToolTipId("");
//       setIsDivOpen(false);
//     }, 10000);
//   }, [toolTipId, isDivOpen]);

//   useEffect(() => {
//     console.log("Im called - 2");
//     if (productList.length > 0) {
//       synchronizeCart(cartList);
//     }
//   }, [productList]);

//   useEffect(() => {
//     console.log("Im called - 3");

//     localStorage.setItem("cart", JSON.stringify(cartList));
//   }, [cartList]);

//   const calculateDiscount = (discountValue, costPrice) => {
//     const discountedAmount = costPrice * (discountValue / 100);
//     const discountedPrice = costPrice - discountedAmount;
//     return discountedPrice;
//   };

//   const calculateCartTotal = () => {
//     console.log("Calculate Cart Total called!");
//     return cartList.reduce(
//       (total, item) =>
//         total +
//         Math.round(calculateDiscount(item.discount, item.mrp)) * item.qty,
//       0
//     );
//   };

//   const calculateCartCount = () => {
//     console.log("calculateCartCount called!");

//     return cartList.reduce((total, item) => total + item.qty, 0);
//   };

//   const removeCartItem = (id) => {
//     console.log("removeCartItem called!");
//     setCartList((prevState) => prevState.filter((item) => item.id !== id));
//   };

//   const decrementCart = (id) => {
//     console.log("decrementCart called!");
//     setCartList((prevState) => {
//       const updatedCart = prevState.map((item) =>
//         item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
//       );
//       synchronizeCart(updatedCart);
//       return updatedCart;
//     });
//   };

//   const calculateActualAmount = () => {
//     console.log("calculateActualAmount called!");
//     return cartList.reduce((total, item) => total + item.mrp * item.qty, 0);
//   };
//   const totalDiscountedPercent = () => {
//     const discountAmount = calculateCartTotal();
//     const actualPrice = calculateActualAmount();
//     const totalPercentOfDiscount =
//       ((actualPrice - discountAmount) / actualPrice) * 100;
//     return Math.round(totalPercentOfDiscount);
//   };

//   const incrementCart = (prod) => {
//     if (prod.qty === 3) {
//       setIsDivOpen(true);
//       setToolTipId(prod.id);
//       console.log("returned");
//       return;
//     }

//     console.log("calculateActualAmount");
//     if (prod.qty >= prod.quantity) {
//       return;
//     }
//     setCartList((prevState) => {
//       const updatedList = prevState.map((item) =>
//         item.id === prod.id ? { ...item, qty: Math.max(item.qty + 1, 1) } : item
//       );
//       synchronizeCart(updatedList);
//       return updatedList;
//     });
//   };

//   const synchronizeCart = (updatedCart) => {
//     setCartList(
//       updatedCart.map((product) => {
//         const fetchedProduct = productList.find(
//           (prod) => prod.id === product.id
//         );

//         if (fetchedProduct) {
//           let stockMessage = "";
//           if (product.qty <= fetchedProduct.quantity) {
//             if (fetchedProduct.quantity <= 4) {
//               stockMessage = `Only ${fetchedProduct.quantity} Left !`;
//             }

//             return {
//               ...product,
//               status: true,
//               stockMessage,
//               quantity: fetchedProduct.quantity,
//             };
//           } else {
//             return {
//               ...product,
//               status: false,
//               stockMessage: "",
//               quantity: fetchedProduct.quantity,
//             };
//           }
//         } else {
//           return { ...product, status: true, stockMessage: "" };
//         }
//       })
//     );
//   };
//   const handleCart = (id) => {
//     console.log(`Cart method called! for product ${id}`);
//     const product = productList.find((prod) => prod.id === id);

//     if (product.quantity === 0) {
//       console.log("Out of stock!");
//       return;
//     }

//     setCartList((prevState) => {
//       const existingCartItem = prevState.find((element) => element.id === id);

//       if (existingCartItem) {
//         console.log("Already in the cart! Increasing quantity...");

//         return prevState.map((prod) =>
//           prod.id === id ? { ...prod, qty: prod.qty + 1 } : prod
//         );
//       }

//       console.log("Adding new product to the cart...");

//       return [...prevState, { ...product, qty: 1 }];
//     });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         calculateCartCount,calculateDiscount,
//         totalDiscountedPercent,
//         productList,
//         fetchProducts,
//         cartList,
//         incrementCart,
//         decrementCart,
//         removeCartItem,
//         handleCart,
//         isDivOpen,
//         toolTipId,
//         setToolTipId,
//         setIsDivOpen,
//         calculateCartTotal,calculateActualAmount
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartContextProvider;
