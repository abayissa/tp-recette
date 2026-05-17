"use server";

import supabase, { getUser } from "@/supabase/client";

export async function getRecipes() {
  const user = await getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await (await supabase())
    .from("recipes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}