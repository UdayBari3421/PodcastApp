import React from "react";
import Button from "./Button";

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div className="flex flex-col gap-6 p-4 ring-[--blue] ring-2 rounded-2xl shadow-lg shadow-[--purple-gray] mb-32">
      <h1 className="text-xl font-medium">
        {index}.&nbsp;{title}
      </h1>
      <span className="flex gap-3 items-center justify-between w-full">
        <p className="text-[--purple-gray] ms-1 w-8/12">{description}</p>
        <Button text="Play" onClick={() => onClick(audioFile)} styles={"w-fit px-12 mr-0"} />
      </span>
    </div>
  );
}

export default EpisodeDetails;
