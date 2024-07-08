import { createContext, useContext, useReducer } from "react";

import {
  registerInitialState,
  registerReducer,
  REGISTER_TYPES,
} from "./registerReducer";

const RegisterContext = createContext(null);

export function useRegisterContext() {
  return useContext(RegisterContext);
}

function RegisterContextProvider({ children }) {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    registerInitialState
  );

  const { signupInfo, loginInfo } = registerState;

  return (
    <RegisterContext.Provider
      value={{
        signupInfo,
        loginInfo,
        registerDispatch,
        REGISTER_TYPES,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContextProvider;
