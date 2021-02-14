import {
  useDispatch as useDispatchVanilla,
  useSelector as useSelectorVanilla,
  TypedUseSelectorHook,
} from "react-redux";
import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import { RecipeReducer } from "./reducer";

export const Store = configureStore({
  reducer: RecipeReducer,
});

export type RootState = ReturnType<typeof RecipeReducer>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export function useDispatch() {
  const dispatch: AppDispatch = useDispatchVanilla();

  return dispatch;
}

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorVanilla;
