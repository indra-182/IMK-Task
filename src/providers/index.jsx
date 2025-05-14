import { useReducer } from "react";
import { StateContext } from "../context";
import { initialState, reducer } from "../store/reducer";

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
