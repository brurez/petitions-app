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

// React hook used to provide information about the logged user if any
export default function useCurrentUser(): UserCurrentUserReturnI {
  const [state, dispatch] = useContext<[StoreStateI, any]>(StoreContext as any);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const [userQuery] = useUserLazyQuery();

  // checks on the first render if there is a token saved on local storage
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
        // gets user information from the server using the id present in the JWT
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

  // saves on store state the information about the user
  function setCurrentUser(user: User, token?: string) {
    if (token) localStorage.setItem("token", token);
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  }

  // logs out the current user removing the token from local storage
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
