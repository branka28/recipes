export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientUnit = "spoon" | "l" | "g" | "glass" | "cup" | "unit";

export type Quantity = {
  type: IngredientUnit;
  amount: number;
};
