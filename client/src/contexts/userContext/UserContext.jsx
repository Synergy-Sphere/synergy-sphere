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

  // useEffect(() => {
  //   async function updateUserProfile() {
  //     try {
  //       const settings = {
  //         method: "PATCH",
  //         body: JSON.stringify({ interests: userState.userInterests }),
  //         credentials: "include",
  //       };
  //       const response = await fetch(
  //         `http://localhost:5555/createProfile/${loggedInUser?._id}/interests`,
  //         settings
  //       );

  //       if (!response.ok) {
  //         const { error } = await response.json();
  //         throw new Error(error.message);
  //       }

  //       const data = await response.json();
  //       await updateUser(data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   updateUserProfile();
  //   console.log(loggedInUser);
  // }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ ...userState, userDispatch, ...USER_TYPES }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
