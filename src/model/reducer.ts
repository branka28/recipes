import { Action, createAction } from "@reduxjs/toolkit";
import { Ingredient } from "../interfaces/entities/ingredient";
import { Recipe } from "../interfaces/entities/recipe";

type RecipeState = {
  recipes: Recipe[];
  ingredients: Ingredient[];
  pending: boolean;
  openedRecipe: Recipe | null;
};

export const RecipeActions = {
  loadRecipes: createAction("LOAD_RECIPES"),
  loadRecipesSuccess: createAction<Recipe[]>("LOAD_RECIPES_SUCCESS"),
  loadRecipesError: createAction("LOAD_RECIPES_ERROR"),
  saveRecipe: createAction("SAVE_RECIPE"),
  saveRecipeSuccess: createAction<Recipe[]>("SAVE_RECIPE_SUCCESS"),
  saveRecipeError: createAction("SAVE_RECIPE_ERROR"),
  deleteRecipe: createAction("DELETE_RECIPE"),
  deleteRecipeSuccess: createAction<Recipe[]>("DELETE_RECIPE_SUCCESS"),
  deleteRecipeError: createAction("DELETE_RECIPE_ERROR"),
  loadIngredients: createAction<Ingredient[]>("LOAD_INGREDIENTS"),
  setRecipe: createAction<Recipe>("SET_RECIPE"),
};

export const initialState: RecipeState = {
  recipes: [],
  ingredients: [],
  pending: false,
  openedRecipe: null,
};

export function RecipeReducer(
  state: RecipeState = initialState,
  action: Action
): RecipeState {
  if (RecipeActions.loadRecipes.match(action)) {
    return { ...state, pending: true };
  }
  if (RecipeActions.loadRecipesSuccess.match(action)) {
    return { ...state, recipes: action.payload, pending: false };
  }
  if (RecipeActions.loadRecipesError.match(action)) {
    return { ...state, pending: false };
  }
  if (RecipeActions.loadIngredients.match(action)) {
    return { ...state, ingredients: action.payload };
  }
  if (RecipeActions.saveRecipe.match(action)) {
    return { ...state, pending: true };
  }
  if (RecipeActions.saveRecipeSuccess.match(action)) {
    return { ...state, recipes: action.payload, pending: false };
  }
  if (RecipeActions.saveRecipeError.match(action)) {
    return { ...state, pending: false };
  }
  if (RecipeActions.deleteRecipe.match(action)) {
    return { ...state, pending: true };
  }
  if (RecipeActions.deleteRecipeSuccess.match(action)) {
    return { ...state, recipes: action.payload, pending: false };
  }
  if (RecipeActions.deleteRecipeError.match(action)) {
    return { ...state, pending: false };
  }
  if (RecipeActions.setRecipe.match(action)) {
    return { ...state, openedRecipe: action.payload };
  }

  return state;
}
