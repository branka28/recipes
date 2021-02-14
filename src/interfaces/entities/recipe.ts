import { Ingredient, Quantity } from "./ingredient";

export type Recipe = {
  id: number;
  name: string;
  source: string;
  ingredients: { ingredient: Ingredient; quantity: Quantity }[];
  preparationTime: number;
  instuction: string;
};
export type UnsavedRecipe = {
  name: string;
  source: string;
  ingredients: { ingredient: Ingredient; quantity: Quantity }[];
  preparationTime: number;
  instuction: string;
};
