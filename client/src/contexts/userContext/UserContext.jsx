import { createContext, useContext, useEffect, useReducer } from "react";

import { userInitialState, userReducer, USER_TYPES } from "./userReducer";
import { useAuthContext } from "../authContext/AuthContext";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

function UserContextProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  const { loggedInUser, updateUser } = useAuthContext();
// console.log("user state --> ", userState);
  return (
    <UserContext.Provider value={{ ...userState, userDispatch, ...USER_TYPES }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
