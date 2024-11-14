import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useLocation } from "react-router-dom";

function SearchProduct() {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchproduct] = useState([]);

  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (typeof data === "string") {
      setSearchproduct(
        products?.filter((product) =>
          product?.title?.toLowerCase().includes(data.toLowerCase())
        )
      );
    } else {
      const searchTerms = data.map((term) => term.toLowerCase());
      const filteredProducts = products.filter((product) => {
        const title = product?.title?.toLowerCase() || "";
        return searchTerms.some((term) => title.includes(term));
      });
      if (filteredProducts.length === 0) {
        // Handle no products found
      }
      setSearchproduct(filteredProducts);
    }
  }, [data, products]);

  return (
    <div className="bg-slate-200 content-wrapper h-full min-w-screen max-w-screen min-h-screen p-4 text-black">
      {searchProduct.length > 0 ? (
        <div className="products w-full flex gap-6 flex-wrap mt-8 justify-evenly">
          {searchProduct?.map((product) => (
            <div
              key={product?._id}
              className="flex flex-col bg-white justify-center items-center w-80 mt-4 p-4 rounded-lg min-h-80 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/product/${product?._id}`}>
                <img
                  className="rounded-lg h-60 object-cover"
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
                  className="bg-gray-300 p-2 px-6 shadow-md mx-4 font-semibold text-black hover:bg-gray-400 rounded-lg transition-colors"
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
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            No Products Found
          </h1>
          <p className="mt-4 text-gray-500">
            We couldn't find any products matching your search. Try again with
            different keywords.
          </p>
          <Link to="/" className="mt-6 text-blue-600 hover:text-blue-800">
            Go back to homepage
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
