import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { StateContext } from "../providers/State";
import { IConfirmDeleteTodo } from "../types";

export const ConfirmDeleteTodo = ({
  id,
  open,
  onClose,
}: IConfirmDeleteTodo) => {
  const { onDelete } = useContext(StateContext);
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm Delete Todo</DialogTitle>
      <DialogContent>Are you suse you want to delete this todo?</DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => onDelete(id)}>
          delete
        </Button>
        <Button color="secondary" onClick={() => onClose(false)}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
