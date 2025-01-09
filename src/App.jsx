import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage.jsx";
import Profile from "./Pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice.js";
import { PrivateRoutes } from "./Components";
import CreatePodcast from "./Pages/CreatePodcast.jsx";
import Podcasts from "./Pages/Podcasts.jsx";
import PodcastDetails from "./Pages/PodcastDetails.jsx";
import CreateEpisodePage from "./Pages/CreateEpisodePage.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubsribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: user.email,
                  uid: user.uid,
                })
              );
            }
          },
          (err) => {
            console.log("Error fetching user", err);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubsribeAuth();
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-podcast" element={<CreatePodcast />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcasts/:id" element={<PodcastDetails />} />
            <Route path="/podcasts/:id/create-episode" element={<CreateEpisodePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
