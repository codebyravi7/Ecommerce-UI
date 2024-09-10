import React, { useState, useEffect } from "react";

const ShowOrderProduct = ({ items }) => {

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    /*the below code is different from tutor at 6:52 */
    if (items) {
      items?.forEach((item) => {
        qty += item?.qty;
        price += item?.price;
      });
      setPrice(price);
      setQty(qty);
    }
  }, [items]);
  return (
    <div>
      <table className="table table-bordered border-secondary bg-slate-200 text-gray-500 text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-light text-black text-center">
              Product Image
            </th>
            <th scope="col" className="bg-light text-black text-center">
              Title
            </th>
            <th scope="col" className="bg-light text-black text-center">
              Price
            </th>
            <th scope="col" className="bg-light text-black text-center">
              Qty
            </th>
          </tr>
        </thead>
        <tbody className="">
          {items?.map((product) => (
            <tr key={product?._id}>
              <th
                className="bg-light text-black text-center flex  items-center justify-center"
                scope="row"
              >
                <img
                  src={product?.imgSrc}
                  alt={product?.title}
                  className="w-24  rounded-lg"
                />
              </th>
              <td className="bg-light text-black text-center">
                {product.title}
              </td>
              <td className="bg-light text-black text-center">
                {product.price}
              </td>
              <td className="bg-light text-black text-center">{product.qty}</td>
            </tr>
          ))}
          <tr>
            <th
              scope="row"
              className="bg-light text-black text-center flex justify-center p-2"
            >
              GrandTotal
            </th>
            <td className="bg-light text-black text-center">
              <button className="btn btn-primary">Total</button>
            </td>
            <td className="bg-light text-black text-center">
              {" "}
              <button className="btn btn-warning"> {price}</button>
            </td>
            <td className="bg-light text-black text-center">{qty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowOrderProduct;
