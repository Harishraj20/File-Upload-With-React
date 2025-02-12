import React, { useEffect, useState } from "react";
import ProductContext from "../Context/Context";

function ProductContextProvider({ children }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    console.log("Fetch products Method........");
    try {
      const response = await fetch(
        "http://localhost:8080/filemanagement/fetchProducts"
      );

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      const data = await response.json();

      if (data.length === 0) {
        console.log("No products Available");
        return;
      }

      setProductList(data);
      console.log("Data Fetched From DB: ", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <ProductContext.Provider value={{productList,setProductList, fetchProducts}}>{children}</ProductContext.Provider>;
}

export default ProductContextProvider;
