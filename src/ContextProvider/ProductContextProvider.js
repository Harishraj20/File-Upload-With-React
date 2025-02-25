import React, { useEffect, useState } from "react";
import { ProductContext } from "../Context/Context";

function ProductContextProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
        return;
      }

      setProductList(data);
      setFilteredProducts(data);
    } catch (error) { }
  };

  return (
    <ProductContext.Provider value={{ productList, setProductList, fetchProducts, filteredProducts, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
