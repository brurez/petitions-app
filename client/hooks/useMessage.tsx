import { useContext } from "react";
import { StoreContext } from "../lib/StoreContext";

export type MessageType = {
  text: string;
  kind: "error";
};

export default function useMessage() {
  const [state, dispatch]  = useContext<any>(StoreContext);

  function showErrorMessage(message: string) {
    dispatch({ type: "SHOW_ERROR_MESSAGE", payload: message });
    setTimeout(() => dispatch( { type: "HIDE_MESSAGE" }), 6000);
  }

  return { message: state.message, showErrorMessage };
}
