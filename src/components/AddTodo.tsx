import { Add } from "@mui/icons-material";
import { DesktopDatePicker, TimePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import clsx from "clsx";
import { useCallback, useContext } from "react";
import { StateContext } from "../providers/State";
import { useStyles } from "./styles";

export const AddTodo = () => {
  const { state, onChange, onAdd } = useContext(StateContext);

  const classes = useStyles();

  const handleChange = useCallback(
    (value) => {
      onChange({ ...state.todo, title: value });
    },
    [onChange, state]
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (date) onChange({ ...state.todo, dueDate: date });
    },
    [onChange, state]
  );

  const handleAdd = useCallback(() => {
    onAdd();
    onChange({ ...state.todo, title: "", id: "", dueDate: null });
  }, [onChange, onAdd, state]);

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
                onChange={(e) => handleChange(e.target.value)}
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
                onChange={(e) => handleDateChange(e)}
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
                onChange={(e) => handleDateChange(e)}
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
