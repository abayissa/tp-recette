"use server";

import supabase, { getUser } from "@/supabase/client";

export async function getRecipe(id: string) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await (await supabase())
    .from("recipes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}