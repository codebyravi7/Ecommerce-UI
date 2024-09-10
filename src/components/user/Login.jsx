import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, validateForm, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    const infoFields = document.querySelectorAll(".info-fields");
    const validated = validateForm(infoFields, formData);
    if (!validated) return false;

    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      return false;
    }
  };
  return (
    <div className="bg-slate-200 content-wrapper  h-full min-w-screen max-w-screen min-h-screen p-2 text-black flex justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col bg-white items-center w-80 mt-12 p-2 rounded-lg h-64 shadow-lg"
      >
        <a href="/" className="text-2xl text-blue-900">
          <i className="fa-solid fa-house ml-2 text-3xl"></i>
        </a>

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
          className="rounded-lg hover-effect bg-slate-200 mt-3 h-12 p-2 w-32 cursor-pointer text-lg "
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
