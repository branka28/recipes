import { ResultError, ResultSuccess } from "../interfaces/base";
import { UnsavedRecipe } from "../interfaces/entities/recipe";
import {
  DeleteRecipe,
  GetIngredients,
  GetRecipes,
  SaveRecipe,
  Service as ServiceInterface,
} from "../interfaces/services/recipes";

import { ingredients } from "./mockup";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Service: () => ServiceInterface = () => {
  const getRecipes: GetRecipes = async () => {
    try {
      var existingEntries = JSON.parse(
        localStorage.getItem("allEntries") as string
      );
      if (existingEntries == null) existingEntries = [];

      const response = existingEntries;

      await sleep(2000);
      return ResultSuccess(response);
    } catch (e) {
      console.error(e);
      return ResultError(e);
    }
  };

  const saveRecipe: SaveRecipe = async (recipe: UnsavedRecipe) => {
    try {
      var existingEntries = JSON.parse(
        localStorage.getItem("allEntries") as string
      );
      if (existingEntries == null) existingEntries = [];
      const ids = existingEntries.map((e: any) => e.id);
      const nextId =
        existingEntries.length > 0
          ? ids.reduce(function (a: number, b: number) {
              return Math.max(a, b);
            }) + 1
          : 1;
      existingEntries.push({ ...recipe, id: nextId });
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));

      const response = await getRecipes();
      if (response.type === "success") {
        await sleep(100);
        return ResultSuccess(response.payload);
      } else {
        return ResultError([]);
      }
    } catch (e) {
      console.error(e);
      return ResultError(e);
    }
  };

  const deleteRecipe: DeleteRecipe = async (id: number) => {
    try {
      var existingEntries = JSON.parse(
        localStorage.getItem("allEntries") as string
      );
      if (existingEntries == null) existingEntries = [];

      const newArray = existingEntries.filter((e: any) => e.id !== id);

      localStorage.setItem("allEntries", JSON.stringify(newArray));
      const response = await getRecipes();
      if (response.type === "success") {
        await sleep(300);
        return ResultSuccess(response.payload);
      } else {
        return ResultError([]);
      }
    } catch (e) {
      return ResultError(e);
    }
  };

  const getIngredients: GetIngredients = async () => {
    try {
      await sleep(500);
      return ResultSuccess(ingredients);
    } catch (e) {
      console.error(e);
      return ResultError(e);
    }
  };

  return {
    saveRecipe,
    getRecipes,
    getIngredients,
    deleteRecipe,
  };
};
