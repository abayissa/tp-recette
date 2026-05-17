"use client";

import { useState } from "react";

export default function ShoppingList({ recipes }: { recipes: any[] }) {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const handleCheckbox = (id: string) => {
    if (selectedRecipes.includes(id)) {
      setSelectedRecipes(selectedRecipes.filter((recipeId) => recipeId !== id));
    } else {
      setSelectedRecipes([...selectedRecipes, id]);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    selectedRecipes.includes(recipe.id)
  );

  const shoppingList = filteredRecipes.flatMap(
    (recipe) => recipe.shopping_list || []
  );

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Liste de courses</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Sélectionne des recettes</h2>

        {recipes.length === 0 ? (
          <p>Aucune recette disponible.</p>
        ) : (
          <ul className="space-y-3">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckbox(recipe.id)}
                    className="h-4 w-4"
                  />
                  <span>{recipe.title}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Liste de courses globale</h2>

        {shoppingList.length === 0 ? (
          <p>Aucune recette sélectionnée.</p>
        ) : (
          <ul className="space-y-2">
            {shoppingList.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}