import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div class="container text-black text-9xl">
        <div class="loader">
          <span></span>
        </div>
        <div class="loader">
          <span></span>
        </div>
        <div class="loader">
          <i></i>
        </div>
        <div class="loader">
          <i></i>
        </div>
      </div>
    </div>
  );
};

export default Loader;
