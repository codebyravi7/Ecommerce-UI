// Filename - components/Footer.js
import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Footer = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    // Create an object with EmailJS service ID, template ID, Public Key, and Template params
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: user?.name,
        from_email: user?.email,
        to_name: "RaviKant",
        message: message,
      },
    };

    // Send the email using EmailJS
    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res);
      toast.success("NewsLetter Subscribed !!!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-4 pt-2 bg-slate-200">
      <section className="bg-black-50 sm:pt-16 lg:pt-24">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl ">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12 ">
            <div className="pl-2">
              <p className="text-sm font-semibold text-black tracking-widest uppercase">
                Company
              </p>

              <ul className="mt-6 space-y-4 ">
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base  text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base  text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Features{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base  text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Works{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex  text-gray-400 text-base transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Career{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-widest text-black uppercase">
                Help
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base  text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Customer Support{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Delivery Details{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-base text-gray-400 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8 px-4 text-center">
              <p className="font-semibold text-medium tracking-widest text-black uppercase">
                Subscribe to newsletter
              </p>

              <form
                action="#"
                method="POST"
                className="mt-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <textarea
                    cols="30"
                    rows="5"
                    value={message}
                    placeholder="Enter your message"
                    className="resize-none w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className=" px-6 py-3 my-2 font-semibold text-gray-500 bg-gray-50 hover-effect"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

          <p className="text-sm text-center text-gray-600">
            © Copyright 2021, All Rights Reserved by Postcraft
          </p>
        </div>
      </section>
    </div>
  );
};
export default Footer;
