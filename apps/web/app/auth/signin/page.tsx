import React from "react";
import SignInForm from "./signInForm";

const signin = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-96 h-70 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <hr />

      <div className=" flex flex-col gap-2 mb-6"></div>
    </div>
  );
};

export default signin;
