import React from "react";
import { useSelector } from "react-redux";
import { Button, Header, Loader } from "../Components";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  console.log("State", user);
  if (!user) {
    return <Loader />;
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfull!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="text-4xl">
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text="Logout" onClick={handleLogout} type="submit" />
      </div>
    </div>
  );
};

export default Profile;
