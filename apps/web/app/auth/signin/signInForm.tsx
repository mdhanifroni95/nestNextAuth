import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import Link from "next/link";
import React from "react";

const SignInForm = () => {
  return (
    <form action="">
      <div className="flex flex-col gap-2 w-64">
        <div>
          <Label htmlFor="email" className="">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>

        <SubmitButton>Sign in</SubmitButton>

        <div className="flex justify-between text-sm">
          <p>Do not have an account?</p>
          <Link className="text-sm underline" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
