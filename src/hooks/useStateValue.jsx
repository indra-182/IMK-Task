import { useContext } from "react";
import { StateContext } from "../context";

export const useStateValue = () => useContext(StateContext);
