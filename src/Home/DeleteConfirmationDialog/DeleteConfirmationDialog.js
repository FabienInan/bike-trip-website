import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

import React from "react";

export function DeleteConfirmationDialog(props) {

  const {openConfirmationDialog, setOpenConfirmationDialog, deleteArticle} = props;

  return (
    <div>
      <Dialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete an article"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteArticle} color="primary">
            Yes
          </Button>
          <Button onClick={() => setOpenConfirmationDialog(false)} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}