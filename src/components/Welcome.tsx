import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import Cooking from "../assets/cooking.jpg";
const useStyles = makeStyles({
  button: {
    width: "280px",
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "600px",
    marginTop: "50px",
  },
});

type WelcomeProps = {};

export function Welcome(props: WelcomeProps) {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <img src={Cooking} className="App-logo" alt="logo" />
        <div className={classes.container}>
          <Button variant="contained" href="/entry" className={classes.button}>
            Add new recipe
          </Button>
          <Button variant="contained" href="/list" className={classes.button}>
            {" "}
            Recipe list
          </Button>
        </div>
      </header>
    </div>
  );
}
