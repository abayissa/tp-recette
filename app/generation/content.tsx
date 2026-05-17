"use client";

import { generateRecipe } from "@/actions/generateRecipe";
import { FormEvent, useState } from "react";

export default function Generation() {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const response = await generateRecipe(form);

    setRecipe(response);

    setLoading(false);
  };

  return (
    <main className="space-y-6">
      <h1>Génération de recette</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <label>Ingrédients :</label>

        <textarea
          name="ingredients"
          placeholder="Poulet, riz, tomates..."
          required
          className="w-full border rounded-lg p-2"
        />

        <br />

        <label>Nombre de personnes :</label>

        <input type="number" name="people" required className="w-full border rounded-lg p-2" />

        <br />

        <label>Type de plat :</label>

        <select name="mealType" className="w-full border rounded-lg p-2">
          <option value="plat">Plat</option>
          <option value="dessert">Dessert</option>
          <option value="petit-déjeuner">Petit-déjeuner</option>
        </select>

        <br />

        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          {loading ? "Génération..." : "Générer"}
        </button>
      </form>

      {recipe && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2>{recipe.title}</h2>

          <h3>Ingrédients</h3>
          <ul>
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <h3>Nutrition</h3>

          <p>Calories : {recipe.nutrition.calories}</p>
          <p>Protéines : {recipe.nutrition.proteines}</p>
          <p>Glucides : {recipe.nutrition.glucides}</p>
          <p>Lipides : {recipe.nutrition.lipides}</p>
        </div>
      )}
    </main>
  );
}
