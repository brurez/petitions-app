import { useContext } from "react";
import { StoreContext } from "../lib/StoreContext";

export default function useCurrentUser() {
  const [state, dispatch] = useContext<any>(StoreContext);

  function setCurrentUser(user: any, token?: string) {
    localStorage.setItem("token", String(token));
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  }

  return {
    setCurrentUser,
    currentUser: state.currentUser,
    isLoggedIn: !!state.currentUser,
  };
}
