import { UnsavedRecipe } from "../interfaces/entities/recipe";
import { Service } from "../services/recipes";

export async function loadRecipes() {
  const result = await Service().getRecipes();
  return result;
}

export async function loadIngredients() {
  const result = await Service().getIngredients();
  return result;
}

export async function saveRecipe(recipe: UnsavedRecipe) {
  await Service().saveRecipe(recipe);
  const result = loadRecipes();
  return result;
}

export async function deleteRecipe(id: number) {
  const result = await Service().deleteRecipe(id);
  return result;
}
