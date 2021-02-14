import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

type AlertDialogProps = {
  open: boolean;
  closeDialog: () => void;
  confirm: (confirmation: boolean) => void;
};

export default function AlertDialog(props: AlertDialogProps) {
  const handleConfirm = () => {
    props.confirm(true);
    props.closeDialog();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.closeDialog();
          props.confirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this recipe?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes
          </Button>
          <Button
            onClick={() => {
              props.closeDialog();
              props.confirm(false);
            }}
            color="primary"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
