import React from "react";
import SignInForm from "./signInForm";
import { BACKEND_URL } from "@/lib/constants";

const signin = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-96 h-70 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <hr />
      <a
        className="border px-6 py-6 rounded bg-sky-600 text-white mt-3"
        href={`${BACKEND_URL}/auth/google/login`}
      >
        Sign In with Google
      </a>
      <div className=" flex flex-col gap-2 mb-6"></div>
    </div>
  );
};

export default signin;
