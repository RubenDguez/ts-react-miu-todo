import { TTodo } from "../types";

export const InitialState = {
  todo: {
    id: "",
    title: "",
    done: false,
    dueDate: null,
    isVisible: true,
  } as TTodo,
  todoList: Array<TTodo>(),
  isSearching: false,
  search: "",
};
