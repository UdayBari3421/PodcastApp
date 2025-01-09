import React, { useState } from "react";
import { Input, Button } from "../../../Components";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    if (password === confirmPassword && password.length >= 6 && fullName && email) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        console.log("user", user);

        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User created successfully");
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match");
      } else if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
      }
    }
  };

  return (
    <>
      <Input type="text" state={fullName} setState={setFullName} placeholder="Full Name" required={true} />
      <Input type="email" state={email} setState={setEmail} placeholder="Email" required={true} />
      <Input type="password" state={password} setState={setPassword} placeholder="Password" required={true} />
      <Input type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" required={true} />
      <Button type="submit" styles={"mx-auto"} disabled={loading} text={loading ? "Loading..." : "Signup"} onClick={handleSignup} />
    </>
  );
}

export default SignUpForm;
