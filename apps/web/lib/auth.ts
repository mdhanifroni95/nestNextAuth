"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, SignUpFormSchema } from "./type";

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
    redirect("/auth/sing-in");
  } else {
    return {
      message:
        response.status === 409
          ? "The user is already existed"
          : response.statusText,
    };
  }
}
