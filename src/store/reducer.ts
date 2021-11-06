import { EType, TAction, TState } from "../types";

export const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case EType.LOAD:
      return {
        ...state,
        todoList: action.payload.todos,
      };
    case EType.CHANGE_ADD:
      return {
        ...state,
        todo: action.payload.todo,
      };
    case EType.ADD:
      return {
        ...state,
        todoList: [action.payload.todo, ...state.todoList],
      };
    case EType.UPDATE:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id !== action.payload.update.id) return todo;
          return { ...action.payload.update };
        }),
      };
    case EType.SEARCH:
      return {
        ...state,
        search: action.payload.search,
        isSearching: action.payload.isSearching,
      };
    default:
      return state;
  }
};
