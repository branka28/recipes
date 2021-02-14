import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import produce from "immer";
import { Ingredient, IngredientUnit } from "../interfaces/entities/ingredient";
import MaskedInput from "react-text-mask";

import { loadIngredients, saveRecipe } from "../model/actions";
import { useDispatch, useSelector } from "../model/store";
import { RecipeActions } from "../model/reducer";
import { UnsavedRecipe } from "../interfaces/entities/recipe";
import { useHistory } from "react-router";
import { ingredientsTypes } from "../services/mockup";
import { toast } from "react-toastify";
import Loader from "./Loader";

const useStyles = makeStyles({
  table: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "100px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
    marginLeft: "30%",
    marginTop: "100px",
  },
  field: {
    width: "690px",
    marginTop: "20px",
    marginLeft: "10px",
  },
  autocomplete: {
    width: "250px",
    marginTop: "20px",
    marginLeft: "10px",
  },
  tableContainer: {
    width: "690px",
    marginTop: "40px",
    marginBottom: "40px",
    marginLeft: "10px",
  },
  disabled: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
    marginLeft: "30%",
    marginTop: "100px",
    pointerEvents: "none",
    opacity: "0.4",
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => {
    return state.ingredients;
  });
  const pending = useSelector((state) => {
    return state.pending;
  });
  const [name, setName] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [instructions, setInstructions] = useState<string>("");
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [ingredientUnit, setIngredientUnit] = useState<IngredientUnit>(
    "spoon" as IngredientUnit
  );
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [chosenIngredient, setChosenIngredient] = useState<
    {
      ingredient: Ingredient;
      quantity: { amount: number; type: IngredientUnit };
    }[]
  >([]);
  const [errorName, setErrorName] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorInstructions, setErrorInstructions] = useState(false);
  const [errorIngredients, setErrorIngredients] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await loadIngredients();
      if (data.type === "success") {
        dispatch(RecipeActions.loadIngredients(data.payload));
      }
    }

    fetchMyAPI();
  }, [dispatch]);

  const handleQuantity = (amount: string) => {
    setIngredientAmount(Number(amount));
  };

  const handleIngredient = (gradient: Ingredient | null) => {
    setErrorIngredients(false);
    setIngredient(gradient);
  };

  const handleIngredientUnit = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setIngredientUnit(event.target.value as IngredientUnit);
  };

  const addIngredient = () => {
    if (ingredientAmount > 0 && ingredient !== null) {
      const existingIndex = chosenIngredient.findIndex(
        (i) =>
          i.ingredient.id === ingredient.id &&
          i.quantity.type === ingredientUnit
      );

      if (existingIndex === -1) {
        setChosenIngredient([
          ...chosenIngredient,
          {
            ingredient: ingredient,
            quantity: { amount: ingredientAmount, type: ingredientUnit },
          },
        ]);
      } else {
        const nextState = produce(chosenIngredient, (draft) => {
          draft[existingIndex].quantity.amount += ingredientAmount;
        });
        setChosenIngredient(nextState);
      }
    }
  };

  const handleChangeName = (name: string) => {
    setErrorName(false);
    setName(name);
  };

  const handleChangeSource = (source: string) => {
    setSource(source);
  };

  const handleChangeTime = (time: string) => {
    setErrorTime(false);
    const transformed = time.split(":");
    const numberOfMinutes =
      parseInt(transformed[0]) * 60 + parseInt(transformed[1]);
    setPreparationTime(numberOfMinutes);
  };

  const handleChangeInstructions = (instructions: string) => {
    setErrorInstructions(false);
    setInstructions(instructions);
  };

  const removeIngredient = (id: number, unit: IngredientUnit) => {
    const newIngredients = chosenIngredient.filter(
      (i) =>
        (i.ingredient.id === id && i.quantity.type !== unit) ||
        i.ingredient.id !== id
    );
    setChosenIngredient(newIngredients);
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `list`;
    history.push(path);
  };
  const handleSaveRecipe = () => {
    const recipe: UnsavedRecipe = {
      name: name,
      source: source,
      ingredients: chosenIngredient,
      preparationTime: preparationTime,
      instuction: instructions,
    };
    if (name === "") {
      setErrorName(true);
    }
    if (preparationTime === 0) {
      setErrorTime(true);
    }
    if (instructions === "") {
      setErrorInstructions(true);
    }
    if (chosenIngredient.length === 0) {
      setErrorIngredients(true);
    }

    async function fetchMyAPI() {
      dispatch(RecipeActions.saveRecipe());
      const data = await saveRecipe(recipe);
      if (data.type === "success") {
        dispatch(RecipeActions.saveRecipeSuccess(data.payload));
        toast.success("New recipe has been saved.");
        routeChange();
      } else {
        dispatch(RecipeActions.saveRecipeError());
        toast.error("Recipe is not saved");
      }
    }
    if (name !== "" && preparationTime !== 0 && instructions !== "") {
      fetchMyAPI();
    }
  };

  const colorFieldTime = errorTime ? "red" : "#BEBEBE";

  return (
    <div>
      <Paper className={pending ? classes.disabled : classes.paper}>
        <h3 style={{ marginLeft: "10px" }}>ADD NEW RECIPE</h3>
        <TextField
          required
          id="name"
          label="Name"
          variant="outlined"
          className={classes.field}
          value={name}
          onChange={(event) => {
            handleChangeName(event.target.value);
          }}
          error={errorName}
        />
        <TextField
          id="source"
          label="Source"
          variant="outlined"
          className={classes.field}
          value={source}
          onChange={(event) => {
            handleChangeSource(event.target.value);
          }}
        />
        <div style={{ display: "flex" }}>
          <Autocomplete
            id="combo-box-demo"
            options={ingredients}
            value={ingredient}
            getOptionLabel={(i) => i.name}
            onChange={(event: any, newValue: Ingredient | null) => {
              handleIngredient(newValue);
            }}
            className={classes.autocomplete}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Choose ingredients"
                variant="outlined"
                error={errorIngredients}
              />
            )}
          />
          <TextField
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            id="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            style={{ width: "100px", marginLeft: "20px", marginTop: "20px" }}
            value={ingredientAmount}
            onChange={(event) => {
              handleQuantity(event.target.value);
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ingredientUnit}
            style={{
              marginLeft: "30px",
              marginRight: "30px",
              width: "80px",
              height: "40px",
              marginTop: "35px",
            }}
            onChange={handleIngredientUnit}
          >
            {ingredientsTypes.map((i: IngredientUnit) => {
              return (
                <MenuItem value={i} key={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            style={{ marginLeft: "20px", marginTop: "30px" }}
            size="small"
            variant="contained"
            onClick={addIngredient}
          >
            Add
          </Button>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Typography style={{ color: "#888888" }}>
            List of ingredients *
          </Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Unit</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chosenIngredient.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="left">{row.ingredient.name}</TableCell>
                  <TableCell align="left">{row.quantity.amount}</TableCell>
                  <TableCell align="left">{row.quantity.type}</TableCell>
                  <TableCell align="left">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        removeIngredient(row.ingredient.id, row.quantity.type)
                      }
                    >
                      -
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            marginLeft: "10px",
            color: "#888888",
          }}
        >
          <Typography style={{ color: colorFieldTime }}>
            Preparation time *
          </Typography>
          <MaskedInput
            required
            style={{
              borderColor: colorFieldTime,
              width: "100px",
              marginLeft: "20px",
            }}
            placeholder="HH: MM"
            mask={[/\d/, /\d/, ":", /\d/, /\d/]}
            onChange={(event) => {
              handleChangeTime(event.target.value);
            }}
          />
        </div>
        <TextField
          required
          id="source"
          label="Write instructions"
          variant="outlined"
          className={classes.field}
          multiline={true}
          value={instructions}
          onChange={(event) => {
            handleChangeInstructions(event.target.value);
          }}
          error={errorInstructions}
        />
        <Button
          style={{ marginTop: "40px", width: "100%" }}
          variant="contained"
          onClick={handleSaveRecipe}
        >
          Save recipe
        </Button>
      </Paper>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          style={{ marginTop: "80px", marginLeft: "30%", width: "150px" }}
          variant="contained"
          href="/"
        >
          Home
        </Button>
        <Button
          style={{ marginTop: "80px", marginLeft: "15px", width: "150px" }}
          variant="contained"
          href="/list"
        >
          Go to list
        </Button>
      </div>
      {pending && <Loader />}
    </div>
  );
}
