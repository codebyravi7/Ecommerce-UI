import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQuantity, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    /*the below code is different from tutor at 6:52 */
    if (cart?.items) {
      cart?.items?.forEach((item) => {
        qty += item?.qty;
        price += item?.price;
      });
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);
  return (
    <div className="">
      <table className="table table-bordered border-secondary bg-slate-200 text-gray-500 text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-slate-200 text-gray-500">
              Product Image
            </th>
            <th scope="col" className="bg-slate-200 text-gray-500">
              Title
            </th>
            <th scope="col" className="bg-slate-200 text-gray-500">
              Price
            </th>
            <th scope="col" className="bg-slate-200 text-gray-500">
              Qty
            </th>
          </tr>
        </thead>
        <tbody className="">
          {cart?.items?.map((product) => (
            <tr key={product?._id}>
              <th
                className="bg-slate-200 text-gray-500 flex  items-center justify-center"
                scope="row"
              >
                <img
                  src={product?.imgSrc}
                  alt={product?.title}
                  className="w-24  rounded-lg"
                />
              </th>
              <td className="bg-slate-200 text-gray-500">{product.title}</td>
              <td className="bg-slate-200 text-gray-500">{product.price}</td>
              <td className="bg-slate-200 text-gray-500">{product.qty}</td>
            </tr>
          ))}
          <tr>
            <th
              scope="row"
              className="bg-slate-200 text-gray-500 flex justify-center p-2"
            >
              GrandTotal
            </th>
            <td className="bg-slate-200 text-gray-500 text-center">
              <button className="btn bg-gray-50 hover-effect mx-3">
                Total
              </button>
            </td>
            <td className="bg-slate-200 text-gray-500 text-center">
              {" "}
              <button className="btn btn-warning"> {price}</button>
            </td>
            <td className="bg-slate-200 text-gray-500 text-center">
              QTY : {qty}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
