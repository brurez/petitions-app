import React, { createContext, useReducer } from "react";

export const StoreContext = createContext(null);

const initialState = {
  message: { open: false, text: "", kind: "error" },
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "SHOW_ERROR_MESSAGE":
      return {
        ...state,
        message: { open: true, text: action.payload, kind: "error" },
      };
    case "HIDE_MESSAGE":
      return { ...state, message: { ...state.message, open: false } };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
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
