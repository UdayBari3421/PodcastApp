import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";
import FileInput from "./FileInput";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/bannerImages/${Date.now()}-${bannerImage.name}`);
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/displayImages/${Date.now()}-${displayImage.name}`);
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const podcastDocRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setDisplayImage(null);
        setBannerImage(null);

        console.log("podcastDocRef", podcastDocRef);
        toast.success("Podcast created successfully");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  return (
    <>
      <Input type="text" state={title} setState={setTitle} placeholder="Title" required={true} />
      <Input type="text" state={desc} setState={setDesc} placeholder="Description" required={true} />
      <FileInput accept="image/*" text="Upload banner image" id="banner-image-input" fileHandleFnc={bannerImageHandle} />
      <FileInput accept="image/*" text="Upload display image" id="display-image-input" fileHandleFnc={displayImageHandle} />
      <Button type="submit" styles={"mx-auto"} disabled={loading} text={loading ? "Loading..." : "Create Podcast"} onClick={handleSubmit} />
    </>
  );
};

export default CreatePodcastForm;
