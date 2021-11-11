import { Cancel, Delete, Edit, Undo, Update } from "@mui/icons-material";
import { DateTimePicker } from "@mui/lab";
import {
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import moment from "moment";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Confirm, Time } from ".";
import { StateContext } from "../providers/State";
import { EKey, IRow, EConfirm, TTodo } from "../types";
import { useStyles } from "./styles";

export const Row = ({ data, showVisible }: IRow) => {
  const { onUpdate } = useContext(StateContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<EConfirm>(EConfirm.DELETE);
  const [isEdit, setIsEdit] = useState(false);
  const [localTodo, setLocalTodo] = useState<TTodo>(data);
  const [ring, setRing] = useState(false);
  const path = require("../assets/ring.mp3");

  const alarm = useMemo(() => {
    return new Audio(path.default);
  }, [path]);

  const handleChange = useCallback(
    (key: EKey, value: string | Date | null) => {
      switch (key) {
        case EKey.TITLE:
          setLocalTodo({ ...data, title: value as string });
          break;
        case EKey.DATETIME:
          if (value) setLocalTodo({ ...data, dueDate: value as Date });
          break;

        default:
          break;
      }
    },
    [data]
  );

  const handleUpdate = useCallback(() => {
    onUpdate(localTodo);
    setIsEdit(false);
  }, [onUpdate, localTodo]);

  const handleConfirm = useCallback((mode: EConfirm) => {
    setMode(mode);
    setOpen(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.dueDate !== null) {
        const diff = moment(Date.now()).diff(moment(data.dueDate));
        if (diff > -999 && diff < 999) {
          if (!ring) {
            alarm.play();
            setRing(true);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data, ring, alarm]);

  if (!showVisible && !data.isVisible) return <></>;
  return (
    <>
      <Confirm todo={data} open={open} onClose={setOpen} mode={mode} />
      {isEdit && (
        <TableRow>
          <TableCell>
            <TextField
              autoFocus
              fullWidth
              size="small"
              value={localTodo.title}
              onChange={(e) => handleChange(EKey.TITLE, e.target.value)}
            />
          </TableCell>
          <TableCell>
            <DateTimePicker
              value={localTodo.dueDate}
              onChange={(e) => handleChange(EKey.DATETIME, e)}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="small" />
              )}
            />
          </TableCell>
          <TableCell>
            <div className={classes.buttonContainer}>
              <Cancel
                className={clsx({
                  [classes.iconButton]: true,
                  [classes.cancelButton]: true,
                })}
                onClick={() => setIsEdit(false)}
              />

              <Update
                className={clsx({
                  [classes.iconButton]: true,
                  [classes.updateButton]: true,
                  [classes.disableButton]: !localTodo.title,
                })}
                onClick={handleUpdate}
              />
            </div>
          </TableCell>
        </TableRow>
      )}
      {!isEdit && (
        <TableRow>
          <TableCell
            className={clsx({ [classes.deletedRowCell]: !data.isVisible })}
          >
            <Typography
              variant="body2"
              className={clsx({ [classes.isNotActive]: !data.isActive })}
            >
              {data.title}
            </Typography>
          </TableCell>
          <TableCell
            className={clsx({ [classes.deletedRowCell]: !data.isVisible })}
          >
            <Time
              dtime={data.dueDate}
              isActive={data.isActive}
              isVisible={data.isVisible}
            />
          </TableCell>
          <TableCell
            className={clsx({ [classes.deletedRowCell]: !data.isVisible })}
          >
            <div className={classes.buttonContainer}>
              <Switch
                size="small"
                value={data.isActive}
                checked={data.isActive}
                onClick={() => onUpdate({ ...data, isActive: !data.isActive })}
              />

              <Edit
                onClick={() => setIsEdit(true)}
                className={clsx({
                  [classes.iconButton]: true,
                  [classes.editButton]: true,
                  [classes.disableButton]: !data.isActive,
                })}
              />

              {data.isVisible && (
                <Delete
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.deleteButton]: true,
                  })}
                  onClick={() => handleConfirm(EConfirm.DELETE)}
                />
              )}
              {!data.isVisible && (
                <Undo
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.retrieveButton]: true,
                  })}
                  onClick={() => handleConfirm(EConfirm.RETRIEVE)}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
