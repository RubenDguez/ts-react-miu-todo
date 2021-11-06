import { useCallback, useReducer } from "react";
import { v4 } from "uuid";
import { InitialState, reducer } from "../store";
import { EType, TTodo } from "../types";
import { addTodo, getTodos, updateTodo } from "../utils";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const onLoad = useCallback(() => {
    getTodos().then((resp) => {
      dispatch({ type: EType.LOAD, payload: { todos: resp } });
    });
  }, [dispatch]);

  const onChange = useCallback(
    (todo: TTodo) => {
      dispatch({ type: EType.CHANGE_ADD, payload: { todo } });
    },
    [dispatch]
  );

  const onAdd = useCallback(() => {
    addTodo(state.todo)
      .then((resp) => {
        if (resp)
          dispatch({
            type: EType.ADD,
            payload: { todo: { ...state.todo, id: resp } },
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: EType.ADD,
          payload: { todo: { ...state.todo, id: v4() } },
        });
      });
  }, [dispatch, state]);

  const onUpdate = useCallback(
    (todo: TTodo) => {
      updateTodo(todo).then((resp) => {
        dispatch({ type: EType.UPDATE, payload: { update: todo } });
        console.log(
          resp
            ? "Todo updated successfully..."
            : "Something went wrong while updating todo..."
        );
      });
    },
    [dispatch]
  );

  const onSearch = useCallback(
    (search: string, isSearching: boolean) => {
      dispatch({ type: EType.SEARCH, payload: { search, isSearching } });
    },
    [dispatch]
  );

  return { state, onLoad, onChange, onAdd, onUpdate, onSearch };
};
