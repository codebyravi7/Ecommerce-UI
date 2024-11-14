import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

function ShowProduct() {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="bg-slate-200 content-wrapper h-full min-w-screen max-w-screen min-h-screen p-4 text-black">
      <div className="products w-full flex gap-6 flex-wrap mt-8 justify-evenly">
        {filteredData?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-col bg-white justify-center items-center w-80 mt-4 p-4 rounded-lg min-h-80 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to={`/product/${product?._id}`}>
              <img
                className="rounded-lg h-60 object-cover mb-4"
                src={product?.imgSrc}
                alt={product?.title}
              />
            </Link>
            <p className="font-semibold text-xl text-center text-gray-800 mt-2">
              {product?.title}
            </p>
            <div className="m-2 px-2 flex flex-col text-center font-bold">
              <p className="text-lg font-medium text-gray-500 mb-2">
                ₹ {product?.price}
              </p>
              <button
                className="bg-gray-300 p-3 px-6 shadow-md mx-4 font-semibold text-black rounded-lg hover:bg-gray-400 transition-colors duration-200"
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

export default ShowProduct;
