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
  | { type: EType.CHANGE_ADD; payload: { todo: TTodo } }
  | { type: EType.ADD; payload: { todo: TTodo } }
  | { type: EType.LOAD; payload: { todos: TTodo[] } }
  | { type: EType.UPDATE; payload: { update: TTodo } }
  | { type: EType.SEARCH; payload: { search: string; isSearching: boolean } };

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
  mode: EConfirm;
  todo: TTodo;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export interface ITime {
  dtime: Date | null;
  isDone: boolean;
}

export enum EType {
  CHANGE_ADD,
  ADD,
  LOAD,
  UPDATE,
  SEARCH,
}

export enum EConfirm {
  DELETE,
  RETRIEVE,
}

export enum EKey {
  TITLE,
  DATETIME,
}
