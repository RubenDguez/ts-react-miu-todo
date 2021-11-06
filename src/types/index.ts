import { Dispatch, SetStateAction } from "react";
import { InitialState } from "../store";

export type TState = typeof InitialState;

export type TTodo = {
  id: string;
  title: string;
  dueDate: Date | null;
  done: boolean;
  isVisible: boolean;
};

export type TConfirm = "DELETE" | "RETRIEVE";

export type TAction =
  | { type: "CHANGE ADD"; payload: { todo: TTodo } }
  | { type: "ADD"; payload: { todo: TTodo } }
  | { type: "LOAD"; payload: { todos: TTodo[] } }
  | { type: "UPDATE"; payload: { update: TTodo } }
  | { type: "SEARCH"; payload: { search: string; isSearching: boolean } };

export interface IStateContext {
  state: typeof InitialState;
  onChange: (todo: TTodo) => void;
  onAdd: () => void;
  onUpdate: (todo: TTodo) => void;
  onLoad: () => void;
  onSearch: (search: string, isSearching: boolean) => void;
}

export interface IRow {
  data: TTodo;
  showVisible: boolean;
}

export interface IConfirm {
  mode: TConfirm;
  todo: TTodo;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export interface ITime {
  dtime: Date | null;
  isDone: boolean;
}
