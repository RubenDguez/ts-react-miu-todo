import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { StateContext } from "../providers/State";
import { IConfirm } from "../types";

export const Confirm = ({ mode, todo, open, onClose }: IConfirm) => {
  const { onUpdate } = useContext(StateContext);

  const handleConfirmation = useCallback(() => {
    onUpdate(
      mode === "DELETE"
        ? { ...todo, isVisible: false }
        : { ...todo, isVisible: true }
    );
    onClose(false);
  }, [onUpdate, onClose, todo, mode]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>
        {mode === "DELETE" ? "Confirm Delete Todo" : "Confirm Retrieve Todo"}
      </DialogTitle>
      <DialogContent>
        {mode === "DELETE"
          ? "Are you suse you want to delete this todo?"
          : "Are you suse you want to retrieve this todo?"}
      </DialogContent>
      <DialogActions>
        <Button
          color={mode === "DELETE" ? "error" : "info"}
          onClick={handleConfirmation}
        >
          {mode === "DELETE" ? "delete" : "retrieve"}
        </Button>
        <Button color="secondary" onClick={() => onClose(false)}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
