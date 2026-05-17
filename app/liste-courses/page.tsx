import { getRecipes } from "@/actions/getRecipes";
import ShoppingList from "./content";

export default async function ShoppingListPage() {
  const recipes = await getRecipes();

  return <ShoppingList recipes={recipes} />;
}