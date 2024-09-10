import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

function ProductDetail() {
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "http://localhost:1000/api";
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log("the product you clicked ->", api.data.product);
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);
  return (
    <div className="main content-wrapper  bg-slate-200 text-gray-500  min-w-screen max-w-screen min-h-screen">
      <div className="productDiv p-2 flex justify-evenly">
        <div className="left mx-2 ">
          <img
            className="w-64 rounded-lg"
            src={product?.imgSrc}
            alt="PRODUCT IMAGE"
          />
        </div>
        <div className="right mx-2 p-2 text-center">
          <div className="desc">
            <h1 className="card-title text-2xl font-serif font-bold">
              {product?.title}
            </h1>
            <p>{product?.description}</p>
          </div>
          {/* <h1>
            {product?.category} 
          </h1> */}
          <div className="m-2 px-2 flex w-full justify-between">
            <button className="bg-gray-300 p-2 px-4 shadow-md font-semibold hover-effect">
              {product?.price} {"₹"}
            </button>
            <button
              className="bg-gray-300 p-2 px-4 shadow-md font-semibold hover-effect"
              onClick={() =>
                addToCart(
                  product?._id,
                  product?.title,
                  product?.price,
                  1,
                  product?.imgSrc
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} id={product?._id} />
    </div>
  );
}

export default ProductDetail;
