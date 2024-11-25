"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  (await cookies()).delete("recess-user");
  redirect("/");
}
