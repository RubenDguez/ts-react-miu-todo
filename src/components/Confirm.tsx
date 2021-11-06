import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { StateContext } from "../providers/State";
import { EConfirm, IConfirm } from "../types";

export const Confirm = ({ mode, todo, open, onClose }: IConfirm) => {
  const { onUpdate } = useContext(StateContext);

  const handleConfirmation = useCallback(() => {
    onUpdate(
      mode === EConfirm.DELETE
        ? { ...todo, isVisible: false }
        : { ...todo, isVisible: true }
    );
    onClose(false);
  }, [onUpdate, onClose, todo, mode]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>
        {mode === EConfirm.DELETE
          ? "Confirm Delete Todo"
          : "Confirm Retrieve Todo"}
      </DialogTitle>
      <DialogContent>
        {mode === EConfirm.DELETE
          ? "Are you suse you want to delete this todo?"
          : "Are you suse you want to retrieve this todo?"}
      </DialogContent>
      <DialogActions>
        <Button
          color={mode === EConfirm.DELETE ? "error" : "info"}
          onClick={handleConfirmation}
        >
          {mode === EConfirm.DELETE ? "delete" : "retrieve"}
        </Button>
        <Button color="secondary" onClick={() => onClose(false)}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
