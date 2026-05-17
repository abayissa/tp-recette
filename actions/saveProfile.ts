"use server";

import supabase, { getUser } from "@/supabase/client";

export async function saveProfile(formData: FormData) {
  const goal = formData.get("goal");
  const intolerances = formData.get("intolerances");
  const preferences = formData.get("preferences");

  const user = await getUser();

  if (!user) {
    return false;
  }

  const { error } = await (await supabase())
    .from("profiles")
    .upsert({
      user_id: user.id,
      goal,
      intolerances,
      preferences,
    });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}