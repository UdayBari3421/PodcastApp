import React from "react";
import { Link } from "react-router-dom";

const PodcastCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcasts/${id}`} className="flex justify-center items-center w-fit">
      <div className="card w-64 flex justify-between items-center h-full min-h-64 p-2 rounded-2xl opacity-75 hover:opacity-100 flex-col">
        <img src={displayImage} className="w-full h-[80%] min-h-48 cursor-pointer rounded-2xl" />
        <p className="text-lg font-bold">{title}</p>
      </div>
    </Link>
  );
};

export default PodcastCard;
