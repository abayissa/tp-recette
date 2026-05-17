"use client";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard({ recipes }: { recipes: any[] }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/connexion");
  };

  return (
    <main className="space-y-6">
      <h1>Dashboard</h1>

      <nav className="bg-white p-4 rounded-xl shadow flex gap-4">
        <Link href="/profil">Mon profil</Link> |{" "}
        <Link href="/generation">Générer une recette</Link> |{" "}
        <Link href="/liste-courses">Liste de courses</Link>
      </nav>

     

      <h2>Mes recettes</h2>

      {recipes.length === 0 ? (
        <p>Aucune recette générée pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="bg-white p-4 rounded-xl shadow">
              <Link href={`/recette/${recipe.id}`} className="text-green-600 font-semibold hover:underline">
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

       <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Se déconnecter</button>
    </main>
  );
}