import React, { createContext, useReducer } from "react";
import { reducers, StoreStateI } from "../lib/reducers";

// Initial Store state
const initialState: StoreStateI = {
  message: { open: false, text: "", kind: "error" },
  currentUser: null,
};

// Create Flux Store as a React Context
export const StoreContext = createContext([initialState]);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    // @ts-ignore
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
