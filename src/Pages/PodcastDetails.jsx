import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { AudioPlayer, Button, Header, EpisodeDetails } from "../Components";
import { toast } from "react-toastify";

function PodcastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id) {
      getData();
    }

    const unsubscribe = onSnapshot(
      query(collection(db, `podcasts/${id}/episodes`)),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.log("Error fetching episodes", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-8/12 m-auto mt-6 flex flex-col gap-8">
        {podcast.id && (
          <>
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl text-[--purple-dark] font-bold">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  styles="mx-0 w-fit"
                  text="Create Episode"
                  onClick={() => {
                    navigate(`/podcasts/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <img src={podcast.bannerImage} className="card rounded-2xl p-2 w-full h-80 object-cover" />
            <p className="text-[--purple-gray]">{podcast.description}</p>
            <h1 className="text-3xl text-[--purple-dark] font-bold">Episodes</h1>
            {episodes.length > 0 ? (
              episodes.map((episode, index) => (
                <EpisodeDetails
                  key={index}
                  index={index + 1}
                  title={episode.title}
                  description={episode.description}
                  audioFile={episode.audioFile}
                  onClick={(file) => {
                    setPlayingFile(file);
                  }}
                />
              ))
            ) : (
              <p className="text-center">No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast?.displayImage} />}
    </div>
  );
}

export default PodcastDetails;
