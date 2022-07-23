import { useContext, useEffect, useState } from "react";
import { User, useUserLazyQuery } from "../generated/graphql";
import jwtDecode from "jwt-decode";
import { CurrentUserI, StoreStateI } from "../lib/reducers";
import { StoreContext } from "../components/StoreProvider";
import { isServer } from "../lib/isServer";

interface UserCurrentUserReturnI {
  setCurrentUser: any;
  logOut: () => any;
  currentUser?: CurrentUserI;
  isLoggedIn?: boolean;
}

export default function useCurrentUser(): UserCurrentUserReturnI {
  const [state, dispatch] = useContext<[StoreStateI, any]>(StoreContext as any);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const [userQuery] = useUserLazyQuery();

  useEffect(() => {
    setIsLoggedIn(isServer() ? false : !!localStorage.getItem("token"));
  }, [state.currentUser]);

  useEffect(() => {
    const token = !isServer() && localStorage.getItem("token");
    if (token && !state.currentUser) {
      // @ts-ignore
      let id;
      try {
        const payload: any = jwtDecode(token);
        id = payload.sub;
        userQuery({ variables: { id } }).then((res) => {
          const user = res?.data?.user;
          if (!user) {
            logOut();
            return;
          }
          setCurrentUser(user);
        });
      } catch (e) {
        logOut();
      }
    }
  }, []);

  function setCurrentUser(user: User, token?: string) {
    if (token) localStorage.setItem("token", token);
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  }

  function logOut() {
    !isServer() && localStorage.removeItem("token");
    dispatch({ type: "CLEAR_CURRENT_USER" });
    dispatch({
      type: "SHOW_SUCCESS_MESSAGE",
      payload: "You are now logged out",
    });
  }

  return {
    setCurrentUser,
    logOut,
    currentUser: state.currentUser ? state.currentUser : undefined,
    isLoggedIn,
  };
}
