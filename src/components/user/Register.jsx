import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, validateForm } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { name, email, username, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();

    const infoFields = document.querySelectorAll(".info-fields");
    const validated = validateForm(infoFields, formData);
    if (!validated) return false;

    const result = await register(name, email, username, password);
    if (result.success) {
      navigate("/login");
    }
  };
  return (
    <div className="bg-slate-200 content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black flex justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col bg-white items-center w-80 mt-12 p-2 rounded-lg min-h-80 h-96 shadow-lg"
      >
        <a href="/" className="text-2xl text-blue-900">
          <i className="fa-solid fa-house ml-2 text-3xl"></i>
        </a>
        <input
          name="name"
          type="text"
          value={formData?.name}
          placeholder="Enter you Name"
          className="my-1 info-fields bg-slate-200  outline-none mt-2 rounded-lg h-12 p-2 w-full"
          onChange={onChangeHandler}
        />
        <input
          name="username"
          type="text"
          value={formData?.username}
          placeholder="Enter you username"
          className="my-1 info-fields bg-slate-200  outline-none mt-2 rounded-lg h-12 p-2 w-full"
          onChange={onChangeHandler}
        />
        <input
          name="email"
          type="email"
          value={formData?.email}
          placeholder="Enter you email"
          className="my-1 info-fields bg-slate-200  outline-none mt-2 rounded-lg h-12 p-2 w-full"
          onChange={onChangeHandler}
        />
        <input
          name="password"
          type="password"
          value={formData?.password}
          placeholder="Enter you passsword"
          onChange={onChangeHandler}
          className="my-1 info-fields bg-slate-200  outline-none mt-2 rounded-lg h-12 p-2 w-full"
        />

        <input
          className="rounded-lg hover-effect bg-slate-200 mt-6 h-12 p-2 w-32 cursor-pointer text-lg "
          type="submit"
          value="Create Profile"
        />
      </form>
    </div>
  );
};

export default Register;
