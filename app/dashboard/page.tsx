import { getRecipes } from "@/actions/getRecipes";
import Dashboard from "./content";

export default async function DashboardPage() {
  const recipes = await getRecipes();

  return <Dashboard recipes={recipes} />;
}