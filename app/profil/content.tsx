"use client";

import { saveProfile } from "@/actions/saveProfile";
import { FormEvent, useState } from "react";

export default function Profil() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const saved = await saveProfile(form);

    if (!saved) {
      setMessage("Erreur lors de la sauvegarde.");
    } else {
      setMessage("Profil sauvegardé.");
    }
  };

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">
        Profil utilisateur
      </h1>

      {message && (
        <p className="text-green-600 font-medium">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label htmlFor="goal" className="block mb-2">
            Objectif :
          </label>

          <select
            name="goal"
            id="goal"
            className="w-full border rounded-lg p-2"
          >
            <option value="prise de masse">
              Prise de masse
            </option>

            <option value="perte de poids">
              Perte de poids
            </option>

            <option value="energie">
              Gain d'énergie
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="intolerances"
            className="block mb-2"
          >
            Intolérances alimentaires :
          </label>

          <textarea
            name="intolerances"
            id="intolerances"
            placeholder="Lactose, gluten..."
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label
            htmlFor="preferences"
            className="block mb-2"
          >
            Préférences alimentaires :
          </label>

          <textarea
            name="preferences"
            id="preferences"
            placeholder="Poulet, vegan, végétarien..."
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Sauvegarder
        </button>
      </form>
    </main>
  );
}