import { useCallback, useReducer } from "react";
import { v4 } from "uuid";
import { InitialState, reducer } from "../store";
import { TTodo } from "../types";
import { addTodo, getTodos, updateTodo } from "../utils";

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

  const onUpdate = useCallback(
    (todo: TTodo) => {
      updateTodo(todo).then((resp) => {
        dispatch({ type: "UPDATE", payload: { update: todo } });
        console.log(
          resp
            ? "Todo updated successfully..."
            : "Something went wrong while updating todo..."
        );
      });
    },
    [dispatch]
  );

  return { state, onChange, onAdd, onUpdate, onLoad };
};
