"use server";

import { getSession } from "@/utils/sessions";
import { createClient } from "@supabase/supabase-js";

export default async function supabase() {
  const accessToken = await getSession();

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    accessToken
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      : undefined
  );

  return client;
}

export async function getUser() {
  const { data, error } = await (await supabase()).auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
}