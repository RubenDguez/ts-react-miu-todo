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
import { IRow, TConfirm, TTodo } from "../types";
import { useStyles } from "./styles";

export const Row = ({ data, showVisible }: IRow) => {
  const { onUpdate } = useContext(StateContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<TConfirm>("DELETE");
  const [isEdit, setIsEdit] = useState(false);
  const [localTodo, setLocalTodo] = useState<TTodo>(data);
  const [ring, setRing] = useState(false);
  const path = require("../assets/ring.mp3");

  const alarm = useMemo(() => {
    return new Audio(path.default);
  }, [path]);

  const handleTitleChange = useCallback(
    (value: string) => {
      setLocalTodo({ ...data, title: value });
    },
    [data]
  );

  const handleDateTimeChange = useCallback(
    (value: Date | null) => {
      setLocalTodo({ ...data, dueDate: value });
    },
    [data]
  );

  const handleUpdate = useCallback(() => {
    onUpdate(localTodo);
    setIsEdit(false);
  }, [onUpdate, localTodo]);

  const handleConfirm = useCallback((mode: TConfirm) => {
    setMode(mode);
    setOpen(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff =
        (data.title, " => ", moment(Date.now()).diff(moment(data.dueDate)));
      if (diff > -999 && diff < 999) {
        if (!ring) {
          alarm.play();
          setRing(true);
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
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <DateTimePicker
              value={localTodo.dueDate}
              onChange={(e) => handleDateTimeChange(e)}
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
          <TableCell>
            <Typography
              variant="body2"
              className={clsx({ [classes.isDone]: data.done })}
            >
              {data.title}
            </Typography>
          </TableCell>
          <TableCell>
            <Time dtime={data.dueDate} isDone={data.done} />
          </TableCell>
          <TableCell>
            <div className={classes.buttonContainer}>
              <Switch
                size="small"
                checked={data.done}
                onClick={() => onUpdate({ ...data, done: !data.done })}
              />

              <Edit
                onClick={() => setIsEdit(true)}
                className={clsx({
                  [classes.iconButton]: true,
                  [classes.editButton]: true,
                  [classes.disableButton]: data.done,
                })}
              />

              {data.isVisible && (
                <Delete
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.deleteButton]: true,
                  })}
                  onClick={() => handleConfirm("DELETE")}
                />
              )}
              {!data.isVisible && (
                <Undo
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.retrieveButton]: true,
                  })}
                  onClick={() => handleConfirm("RETRIEVE")}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
