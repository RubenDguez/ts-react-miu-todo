import { createContext, ReactNode } from "react";
import { useStore } from "../hooks";
import { InitialState } from "../store";
import { IStateContext } from "../types";

interface IStore {
  children: ReactNode;
}

export const StateContext = createContext<IStateContext>({
  state: InitialState,
  onChange: () => {},
  onAdd: () => {},
  onUpdate: () => {},
  onLoad: () => {},
});

export const State = ({ children }: IStore) => {
  const { state, onChange, onAdd, onUpdate, onLoad } = useStore();

  return (
    <StateContext.Provider value={{ state, onChange, onAdd, onUpdate, onLoad }}>
      {children}
    </StateContext.Provider>
  );
};
