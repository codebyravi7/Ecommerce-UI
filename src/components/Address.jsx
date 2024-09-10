import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress, validateForm } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Your form has been submited")
    // Get all elements with the class 'info-fields'
    const infoFields = document.querySelectorAll(".info-fields");
    const validated = validateForm(infoFields);
    if (!validated) return false;
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address adedd ", result);

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };
  return (
    <div className="bg-slate-200 content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black">
      <div className="my-3 p-4 bg-white shadow-xl m-4 rounded-lg ">
        <h1 className="text-2xl font-semibold text-center">Shipping Address</h1>
        <form onSubmit={submitHandler} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label className="form-label">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangerHandler}
                type="text"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputEmail13"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangerHandler}
                type="text"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangerHandler}
                type="text"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label className="form-label ">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangerHandler}
                type="text"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputEmail13"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangerHandler}
                type="number"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label className="form-label ">PhoneNumber</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangerHandler}
                type="number"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label className="form-label">Address/Nearby</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangerHandler}
                type="text"
                className="info-fields form-control bg-light text-dark outline-none"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: "bold" }}
            >
              Submit
            </button>
          </div>
        </form>

        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button
              className="btn btn-warning font-bold"
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
