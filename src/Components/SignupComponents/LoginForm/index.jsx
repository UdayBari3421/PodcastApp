import React, { useState } from "react";
import { Input, Button } from "../..";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        console.log("user", user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        console.log("userData", userData);
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login successfull!");
        navigate("/profile");
      } catch (error) {
        console.log("error", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please fill all the fields");
    }
  };

  return (
    <>
      <Input type="email" state={email} setState={setEmail} placeholder="Email" required={true} />
      <Input type="password" state={password} setState={setPassword} placeholder="Password" required={true} />
      <Button type="submit" styles={"mx-auto"} text={loading ? "Loading..." : "Login"} disabled={loading} onClick={handleLogin} />
    </>
  );
}

export default LoginForm;
