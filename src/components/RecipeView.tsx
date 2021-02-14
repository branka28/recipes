import React from "react";
import { deleteRecipe } from "../model/actions";
import { useDispatch, useSelector } from "../model/store";
import { RecipeActions } from "../model/reducer";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmationDialog from "./ConfirmationDialog";
import { calculateTime } from "../utils";
import { toast } from "react-toastify";
import Loader from "./Loader";

type RecipeViewProps = {
  open: boolean;
  closeDialog: () => void;
};

export default function RecipeView(props: RecipeViewProps) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => {
    return state.openedRecipe;
  });
  const pending = useSelector((state) => {
    return state.pending;
  });

  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState<
    boolean
  >(false);

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
      props.closeDialog();
    }
  };

  const ingredients = recipe?.ingredients.map((i) => {
    const newIngredient = { name: i.ingredient.name, quantity: i.quantity };
    return newIngredient;
  });

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.closeDialog}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.closeDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Recipe Detail</Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            style={{ marginTop: "100px", width: "80%", marginLeft: "10%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "30%" }} align="left">
                  <h3>RECIPE</h3>
                </TableCell>
                <TableCell style={{ width: "70%" }} align="left">
                  <h3>INSTRUCTION</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Name: {recipe?.name}</h3>
                    <h3>Source: {recipe?.source}</h3>
                    <h3>Ingredients: </h3>
                    <List>
                      {ingredients?.map((i) => (
                        <ListItem key={i.name}>
                          {i.name} - {i.quantity.amount} {i.quantity.type}
                        </ListItem>
                      ))}
                    </List>
                    <h3>
                      Preparation time:{" "}
                      {calculateTime(
                        recipe !== null ? recipe.preparationTime : 0
                      )}
                    </h3>
                    <Button
                      style={{ width: "130px" }}
                      size="small"
                      variant="contained"
                      onClick={() => setOpenConfirmationDialog(true)}
                    >
                      Delete recipe
                    </Button>
                  </div>
                </TableCell>
                <TableCell align="left">{recipe?.instuction}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
      <ConfirmationDialog
        open={openConfirmationDialog}
        confirm={confirmDelete}
        closeDialog={handleCloseConfirmationDialog}
      />
      {pending && <Loader />}
    </div>
  );
}
