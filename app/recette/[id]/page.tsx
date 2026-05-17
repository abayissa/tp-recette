import { getRecipe } from "@/actions/getRecipe";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = await getRecipe(id);

  if (!recipe) {
    return <p>Recette introuvable.</p>;
  }

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Ingrédients</h2>

        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>

        <ol className="space-y-2 list-decimal list-inside">
          {recipe.instructions.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Nutrition</h2>

        <div className="space-y-2">
          <p>Calories : {recipe.nutrition.calories}</p>
          <p>Protéines : {recipe.nutrition.proteines}</p>
          <p>Glucides : {recipe.nutrition.glucides}</p>
          <p>Lipides : {recipe.nutrition.lipides}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Liste de courses</h2>

        <ul className="space-y-2">
          {recipe.shopping_list.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}