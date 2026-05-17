"use client";

import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Inscription() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const registered = await register(form);

    if (!registered) {
      setMessage("Une erreur est survenue pendant l'inscription.");
    } else {
      router.push("/connexion");
    }
  };

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">
        Inscription
      </h1>

      {message && (
        <p className="text-red-500 font-medium">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2"
          >
            Email :
          </label>

          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2"
          >
            Mot de passe :
          </label>

          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
}