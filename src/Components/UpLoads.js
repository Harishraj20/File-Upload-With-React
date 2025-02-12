import React, { useEffect, useState, useRef } from "react";

function UpLoads() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [stats, setStats] = useState(false);
  const fileUploadRef = useRef(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  useEffect(() => {
    setTimeout(() => {
      setMsg("");
      setStats(false);
    }, 10000);
  }, [msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("quantity", quantity);
    formData.append("image", image);
    console.log("Form Data: ", formData);

    try {
      const response = await fetch(
        "http://localhost:8080/filemanagement/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMsg(data.message);
      setStats(true);
      if (fileUploadRef.current) {
        fileUploadRef.current.value = "";
      }
      setProductName("");
      setQuantity("");
    } catch (error) {
      console.error("Error:", error);
      setMsg(error.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <br />
      <p style={{ color: stats ? "green" : "red" }}>{msg}</p>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          placeholder="Enter Product Name"
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          placeholder="Enter Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label>Upload Image:</label>
        <input
          ref={fileUploadRef}
          type="file"
          accept="image/*"
          placeholder="Add Image"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default UpLoads;
