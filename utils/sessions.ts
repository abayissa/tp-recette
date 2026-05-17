"use server";

import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function createCookie(sessionObject: Session) {
  const cookieStore = await cookies();

  cookieStore.set("session", sessionObject.access_token, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  return true;
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    expires: new Date(0),
  });

  return true;
}

export async function getSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  return session;
}

export async function checkAuth() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "User is not authenticated" },
      { status: 403 }
    );
  }

  return NextResponse.json(
    { message: "Authenticated" },
    { status: 200 }
  );
}