import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/filemanagement/product/${id}`
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log(errorText)
                    throw new Error(errorText);
                }

                const data = await response.json();
                setProductDetail(data);
            } catch (error) {
                console.log(error.message)
                setErrorMsg(error.message);
            }
        };
        fetchProduct();
    }, [id]);

    if (errorMsg) {
        return <div className="product-info-detail" style={{fontSize:"larger"}}>{errorMsg}</div>;
    }

    if (!productDetail) {
        return <div className="product-info-detail" style={{fontSize:"larger"}}>Loading product details...</div>;
    }

    return (
        <div className="product-info-detail">
            <div>
                <img
                    style={{ width: "50px", height: "100px" }}
                    src={`http://localhost:8080/filemanagement/${productDetail.imagePath?.split("uploads/")[1] || ""
                        }`}
                    alt={productDetail.productName || "No Image"}
                />
            </div>
            <div>Product - Name: {productDetail.productName}</div>
            <div>Product - Description: {productDetail.productDescription}</div>
            <div>Product - Quantity: {productDetail.quantity}</div>
            <div>Product - Capacity: {productDetail.capacity}</div>
            <div>Product - Technology: {productDetail.technology}</div>
            <div>Product - Seller: {productDetail.seller}</div>
            <div>Product - Discount: {productDetail.discount}</div>
            <div>Product - Offer: {productDetail.offer}</div>
            <div>Product - M.R.P: {productDetail.mrp}</div>
        </div>
    );
}

export default ProductDetail;
