"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow rounded-xl p-4 mb-6 flex gap-4">
      <Link
        href="/dashboard"
        className="hover:text-green-600"
      >
        Dashboard
      </Link>

      <Link
        href="/generation"
        className="hover:text-green-600"
      >
        Génération
      </Link>

      <Link
        href="/profil"
        className="hover:text-green-600"
      >
        Profil
      </Link>

      <Link
        href="/liste-courses"
        className="hover:text-green-600"
      >
        Courses
      </Link>
    </nav>
  );
}