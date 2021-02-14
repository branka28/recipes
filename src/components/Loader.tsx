import React from "react";
import { CircularProgress } from "@material-ui/core";

type LoaderProps = {};

export default function Loader(props: LoaderProps) {
  return (
    <div style={{ marginLeft: "50%", marginTop: "-25%" }}>
      <CircularProgress disableShrink />
    </div>
  );
}
