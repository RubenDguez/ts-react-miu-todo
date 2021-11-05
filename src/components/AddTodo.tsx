import { Add } from "@mui/icons-material";
import { Grid, IconButton, TextField, Theme } from "@mui/material";
import { useCallback, useContext } from "react";
import { StateContext } from "../providers/State";
import { DesktopDatePicker, TimePicker } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { purple } from "@mui/material/colors";

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
          <Grid container spacing={1}>
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
              <IconButton
                size="large"
                disabled={!state.todo.title}
                onClick={handleAdd}
                className={clsx(classes.addButton)}
              >
                <Add fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    position: "relative",
    top: "0.9rem",
    left: "1.9rem",

    "&.MuiIconButton-root": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      transition: "ease-in-out 500ms",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: purple[200],
    },
  },
}));
