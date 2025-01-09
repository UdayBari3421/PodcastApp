import React, { useState } from "react";
import { Button, FileInput, Header, Input } from "../Components";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function CreateEpisodePage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    if ((title, desc, audioFile, id)) {
      setLoading(true);
      try {
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(audioRef, audioFile);
        const audioUrl = await getDownloadURL(audioRef);

        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioUrl,
        };

        await addDoc(collection(db, `podcasts/${id}/episodes`), episodeData);

        toast.success("Episode created successfully");
        setLoading(false);
        navigate(`/podcasts/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile(null);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="w-8/12 m-auto mt-6 flex flex-col gap-8 text-center">
        <h1 className="text-3xl text-[--purple-dark] text-center">Create An Episode</h1>
        <Input type="text" state={title} setState={setTitle} placeholder="Title" required={true} />
        <Input type="email" state={desc} setState={setDesc} placeholder="Description" required={true} />
        <FileInput accept="audio/*" text="Upload Audio File" id="audio-image-input" fileHandleFnc={audioFileHandle} />
        <Button type="submit" disabled={loading} text={loading ? "Loading..." : "Create Episode"} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateEpisodePage;
