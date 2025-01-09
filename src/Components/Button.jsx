import React from "react";

const Button = ({ text, type, onClick, disabled, styles }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles ? styles : ""} w-8/12 hover:shadow-md hover:border-cyan-400 hover:shadow-cyan-300 shadow-inner border-2 border-[--white] rounded-xl p-4 font-bold`}
    >
      {text}
    </button>
  );
};

export default Button;
