import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  timer: {
    color: grey[500],
    textAlign: "right",
    marginTop: "1rem",
    fontSize: "0.7rem",
  },
  typography: {
    display: "block",
    margin: 0,
    padding: 0,
  },
  relativeTime: {
    color: grey[500],
    textTransform: "capitalize",
    fontStyle: "italic",
    fontSize: "0.7rem",
  },
  isDone: {
    textDecoration: "line-through",
  },
  headerCell: {
    "&.MuiTableCell-root": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    textTransform: "uppercase",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  iconButton: {
    padding: "0.3rem",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "ease-in-out 500ms",
    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  deleteButton: {
    color: "tomato",
  },
  editButton: {
    color: theme.palette.secondary.dark,
  },
  disableButton: {
    pointerEvents: "none",
    color: "lightgray",
  },
}));
