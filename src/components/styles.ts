import { Theme } from "@mui/material";
import { green, grey, purple, red, yellow } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  footerText: {
    color: grey[500],
    textAlign: "right",
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
  isActive: {
    textDecoration: "line-through",
  },
  isVisible: {
    color: red[300],
  },
  headerCell: {
    "&.MuiTableCell-root": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    textTransform: "uppercase",
  },
  deletedRowCell: {
    "&.MuiTableCell-root": {
      backgroundColor: red[50],
      color: red[500],
    },
  },
  footerContainer: {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  showDeletedSwitch: {
    marginLeft: "0.5rem",
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
    color: red[400],
  },
  retrieveButton: {
    color: green[500],
  },
  editButton: {
    color: yellow[700],
  },
  updateButton: {
    color: green[500],
  },
  cancelButton: {
    color: red[400],
  },
  disableButton: {
    pointerEvents: "none",
    color: grey[300],
  },
  addButton: {
    display: "flex",
    position: "relative",
    left: "1.5rem",
    top: "0.7rem",
    alignItems: "center",
    justifyContent: "space-around",
    transition: "ease-in-out 500ms",
    cursor: "pointer",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    width: 75,
    height: 75,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  disableAddButton: {
    pointerEvents: "none",
    backgroundColor: purple[200],
  },
}));
