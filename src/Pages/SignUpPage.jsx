import React, { useState } from "react";
import { Header, LoginForm, SignUpForm } from "../Components";

const SignUpPage = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="w-8/12 m-auto mt-6 flex flex-col gap-8 text-center">
        {!flag ? <h1 className="text-3xl text-[--purple-dark] text-center">Sign Up</h1> : <h1 className="text-3xl text-[--purple-dark] text-center">Login</h1>}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p onClick={() => setFlag(!flag)} className="cursor-pointer text-center mt-8">
            Already have an Account? Click here to Login.
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)} className="cursor-pointer text-center mt-8">
            Don't Have An Account? Click here to Signup.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
