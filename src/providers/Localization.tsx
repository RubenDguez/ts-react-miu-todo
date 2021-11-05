import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@date-io/date-fns";
import { ReactNode } from "react";

interface ILocalization {
  children: ReactNode;
}

export const Localization = ({ children }: ILocalization) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
};
