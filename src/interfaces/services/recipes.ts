import { FutureResult } from "../base";
import { Ingredient } from "../entities/ingredient";
import { Recipe, UnsavedRecipe } from "../entities/recipe";

export type GetRecipes = () => FutureResult<Recipe[]>;
export type DeleteRecipe = (id: number) => FutureResult<Recipe[]>;

export type SaveRecipe = (
  recipe: Recipe | UnsavedRecipe
) => FutureResult<Recipe[]>;

export type GetIngredients = () => FutureResult<Ingredient[]>;

export type Service = {
  getRecipes: GetRecipes;
  saveRecipe: SaveRecipe;
  deleteRecipe: DeleteRecipe;
  getIngredients: GetIngredients;
};
