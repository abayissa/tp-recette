"use server";

import supabase from "@/supabase/client";

export async function register(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return false;
  }

  const { error } = await (await supabase()).auth.signUp({
    email: email as string,
    password: password as string,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}