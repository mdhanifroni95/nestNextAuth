import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await fetch(`${BACKEND_URL}/auth/sign-out`, {
      method: "POST",
    });
  } catch (e) {
    console.error("Signout API failed", e);
  }

  await deleteSession();
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  return NextResponse.redirect(new URL("/", req.nextUrl));
}
