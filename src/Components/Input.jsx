import React from "react";

const Input = ({ type, state, setState, placeholder, required }) => {
  return (
    <>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-[--theme] placeholder:text-[--purple-gray] border-2 border-[--purple-gray] rounded-xl p-4 outline-none  focus:border-[--white] w-8/12 mx-auto"
      />
    </>
  );
};

export default Input;
