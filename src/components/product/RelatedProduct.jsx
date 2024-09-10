import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

function RelatedProduct({ category, id }) {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedproduct] = useState([]);
  useEffect(() => {
    setRelatedproduct(
      products?.filter(
        (data) =>
          data?.category?.toLowerCase() === category?.toLowerCase() &&
          data?._id != id
      )
    );
  }, [category, products, id]);

  return (
    <div className="bg-slate-200 content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-gray-500">
      <h1 className="text-4xl  text-center">Related Products</h1>
      <div className="products w-full flex gap-3 flex-wrap mt-8 px-2 justify-evenly">
        {relatedProduct?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-col bg-white justify-center items-center w-80 mt-2 p-2 rounded-lg min-h-80 shadow-lg hover-effect1"
          >
            <Link to={`/product/${product?._id}`}>
              <img
                className="rounded-lg h-60"
                src={product?.imgSrc}
                alt="Card image cap"
              />
            </Link>
            {/* <h5 className="card-title text-lg font-serif font-bold">
              {product?.title}
            </h5> */}
            <p className="font-semibold text-xl text-center !text-gray-800 ">
              {product?.title}
            </p>
            <div className="m-2 px-2 flex flex-col text-center font-bold">
              <p className=" text-lg font-medium !text-gray-500 mb-1">
                {product?.price} {"₹"}
              </p>
              <button
                className="bg-gray-300 p-2 px-4 shadow-2xl mx-4 font-semibold hover-effect"
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
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
