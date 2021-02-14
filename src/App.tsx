import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Welcome } from "./components/Welcome";
import RecipesList from "./components/RecipesList";
import RecipesEntry from "./components/RecipesEntry";
import { ToastContainer } from "react-toastify";
import "./reactToastify.css";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  toastBody: {
    fontSize: "12px",
    color: "#fff",
    fontWeight: 600,
    " word-break": "break-word",
  },
  closeButton: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const classes = useStyles();
  const CloseButton = ({ closeToast }: any) => (
    <i
      className={clsx(classes.closeButton, "material-icons")}
      onClick={closeToast}
    >
      X
    </i>
  );

  return (
    <Router>
      <Switch>
        <Route path="/list">
          <RecipesList />
        </Route>
        <Route path="/entry">
          <RecipesEntry />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
      <ToastContainer
        closeButton={CloseButton}
        toastClassName={classes.toastBody}
        newestOnTop={true}
        closeOnClick={true}
        hideProgressBar={true}
      />
    </Router>
  );
};
