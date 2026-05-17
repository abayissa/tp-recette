"use server";

import { logout as destroySession } from "@/utils/sessions";

export async function logout() {
  await destroySession();
  return true;
}