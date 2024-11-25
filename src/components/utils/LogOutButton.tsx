"use client";

import { logoutUser } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function LogOutButton() {
  return <Button onClick={() => logoutUser()}>Log out &rarr;</Button>;
}
