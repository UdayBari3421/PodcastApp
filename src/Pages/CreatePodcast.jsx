import React from "react";
import { Header } from "../Components";
import { CreatePodcastForm } from "../Components";

const CreatePodcast = () => {
  return (
    <div className="">
      <Header />
      <div className="w-8/12 m-auto mt-6 flex flex-col gap-8 text-center">
        <h1 className="text-3xl text-[--purple-dark] text-center">Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
};

export default CreatePodcast;
