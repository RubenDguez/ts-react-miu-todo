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

export type TAction =
  | { type: "CHANGE ADD"; payload: { todo: TTodo } }
  | { type: "ADD"; payload: { todo: TTodo } }
  | { type: "LOAD"; payload: { todos: TTodo[] } }
  | { type: "DONE"; payload: { id: string } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "UPDATE"; payload: { update: TTodo } };

export interface IStateContext {
  state: typeof InitialState;
  onChange: (todo: TTodo) => void;
  onAdd: () => void;
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: TTodo) => void;
  onLoad: () => void;
}

export interface IRow {
  data: TTodo;
}

export interface IConfirmDeleteTodo {
  id: string;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export interface ITime {
  dtime: Date | null;
  isDone: boolean;
}
