import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Row } from ".";
import { StateContext } from "../providers/State";
import { useStyles } from "./styles";

export const TodoTable = () => {
  const [time, setTime] = useState(Date.now());
  const { state, onLoad } = useContext(StateContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.todoList.length < 1 && !loading) {
      console.log("loading data from firestore...");
      setLoading(true);
      onLoad();
    }
  }, [state, onLoad, loading]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {state.todoList.length > 0 && (
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "40%" }} className={classes.headerCell}>
                  Title
                </TableCell>
                <TableCell sx={{ width: "40%" }} className={classes.headerCell}>
                  Due date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: "20%" }}
                  className={classes.headerCell}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.todoList.map((row) => (
                <Row key={row.id} data={row} />
              ))}
            </TableBody>
          </Table>
          <p className={classes.timer}>{`${moment(time).format("LL LTS")}`}</p>
        </TableContainer>
      )}
    </>
  );
};
