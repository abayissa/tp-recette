"use server";

import OpenAI from "openai";
import supabase, { getUser } from "@/supabase/client";

export async function generateRecipe(formData: FormData) {
  const ingredients = formData.get("ingredients");
  const people = formData.get("people");
  const mealType = formData.get("mealType");

  const user = await getUser();

  if (!user) {
    return false;
  }

  const { data: profile } = await (await supabase())
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const prompt = `
Tu es un assistant nutritionnel.

Génère une recette adaptée à ce profil :

Objectif : ${profile?.goal}
Intolérances : ${profile?.intolerances}
Préférences : ${profile?.preferences}

Ingrédients disponibles :
${ingredients}

Nombre de personnes :
${people}

Type de plat :
${mealType}

Réponds uniquement en JSON valide avec cette structure :

La clé shopping_list doit obligatoirement contenir tous les ingrédients nécessaires à acheter pour réaliser la recette, avec les quantités. Elle ne doit jamais être vide.

{
  "title": "",
  "ingredients": [],
  "instructions": [],
  "nutrition": {
    "calories": "",
    "proteines": "",
    "glucides": "",
    "lipides": ""
  },
  "shopping_list": ["quantité + ingrédient à acheter", "quantité + ingrédient à acheter"]
}
`;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  if (!response.output_text) {
    return false;
  }

  const cleanedResponse = response.output_text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

  const recipe = JSON.parse(cleanedResponse);

  const { error } = await (await supabase())
    .from("recipes")
    .insert({
      user_id: user.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      nutrition: recipe.nutrition,
      shopping_list: recipe.shopping_list,
      meal_type: mealType,
      people_count: Number(people),
    });

  if (error) {
    console.error(error);
    return false;
  }

  return recipe;
}