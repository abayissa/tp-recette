"use server";

import supabase from "@/supabase/client";
import { createCookie } from "@/utils/sessions";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return false;
  }

  const { data, error } = await (await supabase()).auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error || !data.session) {
    console.error(error);
    return false;
  }

  await createCookie(data.session);

  return true;
}