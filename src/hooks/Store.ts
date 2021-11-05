import { useCallback, useReducer } from "react";
import { v4 } from "uuid";
import { InitialState, reducer } from "../store";
import { TTodo } from "../types";
import { addTodo, getTodos } from "../utils";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const onChange = useCallback(
    (todo: TTodo) => {
      dispatch({ type: "CHANGE ADD", payload: { todo } });
    },
    [dispatch]
  );

  const onLoad = useCallback(() => {
    getTodos().then((resp) => {
      dispatch({ type: "LOAD", payload: { todos: resp } });
    });
  }, [dispatch]);

  const onAdd = useCallback(() => {
    addTodo(state.todo)
      .then((resp) => {
        if (resp)
          dispatch({
            type: "ADD",
            payload: { todo: { ...state.todo, id: resp } },
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ADD",
          payload: { todo: { ...state.todo, id: v4() } },
        });
      });
  }, [dispatch, state]);

  const onDone = useCallback(
    (id: string) => {
      dispatch({ type: "DONE", payload: { id } });
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE", payload: { id } });
    },
    [dispatch]
  );

  const onUpdate = useCallback(
    (todo: TTodo) => {
      dispatch({ type: "UPDATE", payload: { update: todo } });
    },
    [dispatch]
  );

  return { state, onChange, onAdd, onDone, onDelete, onUpdate, onLoad };
};
