import { Add } from "@mui/icons-material";
import { DesktopDatePicker, TimePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import clsx from "clsx";
import { useCallback, useContext } from "react";
import { StateContext } from "../providers/State";
import { InitialState } from "../store";
import { EKey } from "../types";
import { useStyles } from "./styles";

export const AddTodo = () => {
  const { state, onChange, onAdd } = useContext(StateContext);
  const classes = useStyles();

  const handleChange = useCallback(
    (key: EKey, value: string | Date | null) => {
      switch (key) {
        case EKey.TITLE:
          onChange({ ...state.todo, title: value as string });
          break;
        case EKey.DATETIME:
          if (value) onChange({ ...state.todo, dueDate: value as Date });
          break;

        default:
          break;
      }
    },
    [onChange, state]
  );

  const handleAdd = useCallback(() => {
    onAdd();
    onChange(InitialState.todo);
  }, [onChange, onAdd]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Grid container spacing={1}>
        {/* left side */}
        <Grid item xs={10}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Title"
                size="small"
                onChange={(e) => handleChange(EKey.TITLE, e.target.value)}
                value={state.todo.title}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Due Date"
                inputFormat="MM/dd/yyyy"
                value={state.todo.dueDate}
                onChange={(e) => handleChange(EKey.DATETIME, e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Time"
                inputFormat="hh:mm"
                value={state.todo.dueDate}
                onChange={(e) => handleChange(EKey.DATETIME, e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* right side */}
        <Grid item xs={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div
                onClick={handleAdd}
                className={clsx({
                  [classes.addButton]: true,
                  [classes.disableAddButton]: !state.todo.title,
                })}
              >
                <Add fontSize="large" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
