import Link from "next/link";
import React from "react";
import SignUpFrom from "./signUpFrom";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-24">Sing Up Page</h1>
      <SignUpFrom />
      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link className="underline" href={"/auth/singin"}>
          Sing in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
