import { IngredientUnit } from "../interfaces/entities/ingredient";

export const ingredients = [
  { id: 1, name: "Flour" },
  { id: 2, name: "Milk" },
  { id: 3, name: "Oil" },
  { id: 4, name: "Salt" },
  { id: 5, name: "Sugar" },
  { id: 6, name: "Eggs" },
  { id: 7, name: "Tomatoes" },
  { id: 8, name: "Peppers" },
  { id: 9, name: "Cheese" },
  { id: 10, name: "Potatoes" },
  { id: 11, name: "Meat" },
];

export const ingredientsTypes = [
  "spoon",
  "l",
  "g",
  "glass",
  "cup",
  "unit",
] as IngredientUnit[];
