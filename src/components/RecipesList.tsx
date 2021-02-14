import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { deleteRecipe, loadRecipes } from "../model/actions";
import { useDispatch, useSelector } from "../model/store";
import { RecipeActions } from "../model/reducer";
import { Button, CircularProgress } from "@material-ui/core";
import { Recipe } from "../interfaces/entities/recipe";
import RecipeView from "./RecipeView";
import ConfirmationDialog from "./ConfirmationDialog";
import { calculateTime, showShortenText } from "../utils";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  table: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "100px",
  },
  disabled: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "100px",
    pointerEvents: "none",
    opacity: "0.4",
  },
  buttonHome: {
    marginTop: "80px",
    marginLeft: "10%",
    width: "150px",
  },
  buttonNewEntry: {
    marginTop: "80px",
    marginLeft: "15px",
    width: "150px",
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => {
    return state.recipes;
  });
  const recipe = useSelector((state) => {
    return state.openedRecipe;
  });
  const pending = useSelector((state) => {
    return state.pending;
  });

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState<
    boolean
  >(false);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(RecipeActions.loadRecipes());
      const data = await loadRecipes();
      if (data.type === "success") {
        dispatch(RecipeActions.loadRecipesSuccess(data.payload));
      } else {
        dispatch(RecipeActions.loadRecipesError());
      }
    }
    fetchMyAPI();
  }, [dispatch]);

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const confirmDelete = (confirmation: boolean) => {
    async function fetchMyAPI() {
      dispatch(RecipeActions.deleteRecipe());
      const data = await deleteRecipe(recipe ? recipe.id : 0);
      if (data.type === "success") {
        dispatch(RecipeActions.deleteRecipeSuccess(data.payload));
        toast.success("Recipe has been deleted.");
      } else {
        dispatch(RecipeActions.deleteRecipeError());
        toast.error("Recipe is not deleted");
      }
    }
    if (confirmation) {
      fetchMyAPI();
    }
  };

  const handleSeeMore = (recipe: Recipe) => {
    dispatch(RecipeActions.setRecipe(recipe));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  return (
    <div>
      <TableContainer className={pending ? classes.disabled : classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Source</TableCell>
              <TableCell align="left">Number of Ingredients</TableCell>
              <TableCell align="left">Ingredients</TableCell>
              <TableCell align="left">Preparation instructions</TableCell>
              <TableCell align="left">Preparation time</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.ingredients.length}</TableCell>
                <TableCell align="left">
                  {row.ingredients.length <= 3
                    ? row.ingredients.map((i) => i.ingredient.name).join(", ")
                    : row.ingredients
                        .slice(0, 3)
                        .map((i) => i.ingredient.name)
                        .join(", ") + "..."}
                </TableCell>
                <TableCell align="left">
                  {" "}
                  {showShortenText(row.instuction, 50)}
                </TableCell>
                <TableCell align="left">
                  {calculateTime(row.preparationTime)}
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(_row) => handleSeeMore(row)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setOpenConfirmationDialog(true);
                      dispatch(RecipeActions.setRecipe(row));
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.buttonHome} variant="contained" href="/">
        Home
      </Button>
      <Button
        className={classes.buttonNewEntry}
        variant="contained"
        href="/entry"
      >
        Add new
      </Button>
      {pending && (
        <div style={{ marginLeft: "50%" }}>
          <CircularProgress disableShrink />
        </div>
      )}
      {!pending && (
        <RecipeView open={openViewDialog} closeDialog={handleCloseViewDialog} />
      )}
      <ConfirmationDialog
        open={openConfirmationDialog}
        confirm={confirmDelete}
        closeDialog={handleCloseConfirmationDialog}
      />
    </div>
  );
}
