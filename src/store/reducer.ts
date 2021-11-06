import { TAction, TState } from "../types";

export const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        todoList: action.payload.todos,
      };
    case "CHANGE ADD":
      return {
        ...state,
        todo: action.payload.todo,
      };
    case "ADD":
      return {
        ...state,
        todoList: [action.payload.todo, ...state.todoList],
      };
    case "UPDATE":
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id !== action.payload.update.id) return todo;
          return { ...action.payload.update };
        }),
      };

    default:
      return state;
  }
};
