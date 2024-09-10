import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import AllOrders from "../AllOrders";
const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="bg-white content-wrapper  h-full min-w-screen max-w-screen min-h-screen text-black">
      <div className="">
        <h1 className="text-center text-xl font-bold">Welcome {user?.name}</h1>
        <AllOrders />
      </div>
    </div>
  );
};

export default Profile;
