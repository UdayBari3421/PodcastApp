import React, { useEffect, useState } from "react";
import { Header, Input } from "../Components";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../store/slices/podcastSlice";
import { db } from "../firebase";
import PodcastCard from "../Components/PodcastCard";

function Podcasts() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  var filteredPodcasts = podcasts?.filter((podcast) => podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div>
      <Header />
      <div className="w-8/12 m-auto mt-6 flex flex-col gap-8 text-center">
        <h1 className="text-3xl text-[--purple-dark] text-center">Discover Podcasts</h1>
        <Input type="text" state={search} setState={setSearch} placeholder="Search By Title" />
        {filteredPodcasts && filteredPodcasts.length > 0 ? (
          <div className="flex justify-center items-center gap-8 flex-wrap mt-4">
            {filteredPodcasts.map((item) => {
              return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage} />;
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts Created Yet"}</p>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
