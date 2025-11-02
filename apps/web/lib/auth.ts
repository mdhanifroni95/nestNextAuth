"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./type";
import { createSession } from "./session";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    } as FormState;
  }

  const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  console.log("response", response);

  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409
          ? "The user is already existed"
          : response.statusText,
    };
  }
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // console.log("validationFields", validationFields);

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    } as FormState;
  }

  const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  console.log("response", response);

  if (response.ok) {
    const result = await response.json();
    //TODO: create The session for Authenticated User
    await createSession({
      user: {
        id: result.id,
        name: result.name,
      },
    });
    console.log("result", { result });
    redirect("/");
  }

  return {
    message:
      response.status === 401 ? "Invalid credentials" : response.statusText,
  };
}
