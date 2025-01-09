import React, { useState } from "react";

const FileInput = ({ accept, id, fileHandleFnc, text }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const onChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          !selectedFile ? "text-[--purple-gray]" : "text-[--white] border-green-500"
        } text-start bg-[--theme] border-2 border-[--purple-gray] rounded-xl p-4 outline-none focus:border-[--white] w-8/12 mx-auto`}
      >
        {selectedFile ? `The File ${selectedFile} was selected` : text}
      </label>
      <input type="file" hidden id={id} accept={accept} onChange={onChange} />
    </>
  );
};

export default FileInput;
