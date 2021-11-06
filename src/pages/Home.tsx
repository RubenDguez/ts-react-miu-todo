import { Container, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { AddTodo, TodoTable } from "../components";
import { SearchAppBar } from "../components/AppBar";

export const Home = () => {
  const classes = useStyles();

  return (
    <>
      <SearchAppBar />
      <Container maxWidth="md" className={classes.container}>
        <Paper className={clsx(classes.paper)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AddTodo />
            </Grid>
            <Grid item xs={12}>
              <TodoTable />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "2rem",
  },
  paper: {
    paddingTop: "3rem",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
}));
