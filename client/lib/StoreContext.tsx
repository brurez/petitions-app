import React, { createContext, useReducer } from "react";
import {User} from "../generated/graphql";

const initialState: StoreStateI = {
  message: { open: false, text: "", kind: "error" },
  currentUser: null,
};

export const StoreContext = createContext([initialState]);

export interface CurrentUserI extends User {}

export interface MessageI {
  open: boolean,
  text: string,
  kind: string
}

export interface StoreStateI {
  currentUser: CurrentUserI | null,
  message: MessageI,
}

const reducer = (state: StoreStateI, action: { type: string; payload: any }) => {
  console.info("REDUCER CALL", action.type, action.payload)
  switch (action.type) {
    case "SHOW_ERROR_MESSAGE":
      return {
        ...state,
        message: { open: true, text: action.payload, kind: "error" },
      };
    case "SHOW_SUCCESS_MESSAGE":
      return {
        ...state,
        message: { open: true, text: action.payload, kind: "success" },
      };
    case "HIDE_MESSAGE":
      return { ...state, message: { ...state.message, open: false } };

    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "CLEAR_CURRENT_USER":
      return { ...state, currentUser: null }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // @ts-ignore
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
