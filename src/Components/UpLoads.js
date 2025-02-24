import React, { useEffect, useState, useRef } from "react";

function UpLoads() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    quantity: 0,
    capacity: "",
    starRating: 1,
    technology: "",
    stockStatus: "",
    seller: "",
    discount: 0,
    offer: "",
    mrp: 0,
    recommendation: "",
    deliveryday: 1,
  });

  const [image, setImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [msg, setMsg] = useState("");
  const [stats, setStats] = useState(false);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
      setStats(false);
    }, 10000);
  }, [msg]);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDatas = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      console.log(key, value)
      formDatas.append(key, value);
    });

    formDatas.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:8080/filemanagement/upload",
        {
          method: "POST",
          body: formDatas,
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
      setFormData({
        productName: "",
        productDescription: "",
        quantity: 0,
        capacity: "",
        starRating: 1,
        technology: "",
        stockStatus: "",
        seller: "",
        discount: 0,
        offer: "",
        mrp: 0,
        recommendation: "",
        deliveryday: 1,
      });
    } catch (error) {
      console.error("Error:", error);
      setMsg(error.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>ADD PRODUCTS</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="input-holder">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            placeholder="Enter Product Name"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Product Description:</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            placeholder="Enter Product Description"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            placeholder="Enter Quantity"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Capacity:</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            placeholder="Enter Capacity"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Star Rating:</label>
          <input
            type="number"
            name="starRating"
            value={formData.starRating}
            min="1"
            max="5"
            placeholder="Enter Star Rating (1-5)"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Technology:</label>
          <input
            type="text"
            name="technology"
            value={formData.technology}
            placeholder="Enter Technology"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Stock Status:</label>
          <select
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleOnChange}
            required
          >
            <option value="">Select</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="input-holder">
          <label>Seller:</label>
          <input
            type="text"
            name="seller"
            value={formData.seller}
            placeholder="Enter Seller Name"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            min="0"
            max="100"
            placeholder="Enter Discount (%)"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Offer:</label>
          <select
            name="offer"
            value={formData.offer}
            onChange={handleOnChange}
            required
          >
            <option value="">Select Offer</option>
            <option value="Mega Sale">Mega Sale</option>
            <option value="Best Seller">Best Seller</option>
            <option value="Exclusive Deal">Exclusive Deal</option>
            <option value="Season Sale">Season Sale</option>
            <option value="Limited time deal">Limited time deal</option>
          </select>
        </div>

        <div className="input-holder">
          <label>MRP:</label>
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            placeholder="Enter MRP"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Upload Image:</label>
          <input
            ref={fileUploadRef}
            type="file"
            accept="image/*"
            placeholder="Add Image"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="input-holder">
          <label>Recommendation:</label>
          <select
            name="recommendation"
            value={formData.recommendation}
            onChange={handleOnChange}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="input-holder">
          <label>Delivery Day:</label>
          <input
            type="number"
            name="deliveryday"
            min="1"
            max="5"
            value={formData.deliveryday}
            placeholder="Enter Delivery Day"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-submit-container">
          <button type="submit" className="add-btn" onClick={handleSubmit}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpLoads;
