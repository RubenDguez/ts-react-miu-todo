import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#d05ce3",
      main: "#9c27b0",
      dark: "#6a0080",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6abf69",
      main: "#388e3c",
      dark: "#00600f",
      contrastText: "#000",
    },
  },
});

interface ITheme {
  children: ReactNode;
}

export const Theme = ({ children }: ITheme) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
