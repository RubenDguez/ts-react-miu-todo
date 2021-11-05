import { Cancel, Delete, Edit, Update } from "@mui/icons-material";
import { DateTimePicker } from "@mui/lab";
import {
  Switch,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useCallback, useContext, useState } from "react";
import { ConfirmDeleteTodo, Time } from ".";
import { StateContext } from "../providers/State";
import { IRow, TTodo } from "../types";
import { useStyles } from "./styles";

export const Row = ({ data }: IRow) => {
  const { onDone, onUpdate } = useContext(StateContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localTodo, setLocalTodo] = useState<TTodo>(data);

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

  if (!data.isVisible) return <></>;
  return (
    <>
      <ConfirmDeleteTodo id={data.id} open={open} onClose={setOpen} />
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
              <Tooltip title="Cancel" arrow placement="bottom">
                <Cancel
                  className={classes.iconButton}
                  onClick={() => setIsEdit(false)}
                />
              </Tooltip>
              <Tooltip title="Update" arrow placement="bottom">
                <Update
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.disableButton]: !localTodo.title,
                  })}
                  onClick={handleUpdate}
                />
              </Tooltip>
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
              <Tooltip title="Done" arrow placement="bottom">
                <Switch
                  size="small"
                  value={data.done}
                  onClick={() => onDone(data.id)}
                />
              </Tooltip>
              <Tooltip title="Edit" arrow placement="bottom">
                <Edit
                  onClick={() => setIsEdit(true)}
                  className={clsx({
                    [classes.iconButton]: true,
                    [classes.editButton]: true,
                    [classes.disableButton]: data.done,
                  })}
                />
              </Tooltip>
              <Tooltip title="Delete" arrow placement="bottom">
                <Delete
                  className={clsx(classes.iconButton, classes.deleteButton)}
                  onClick={() => setOpen(true)}
                />
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
