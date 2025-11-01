"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
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
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.password}</p>
        )}
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
