export const REGISTER_TYPES = {
  SIGNUP_FULL_NAME_INPUT: "fullName",
  SIGNUP_USER_NAME_INPUT: "username",
  SIGNUP_EMAIL_INPUT: "sign-email",
  SIGNUP_PASSWORD_INPUT: "sign-password",
  SIGNUP_CONFIRM_PASSWORD_INPUT: "confirm-password",

  LOGIN_EMAIL_INPUT: "login-email",
  LOGIN_PASSWORD_INPUT: "login-password",

  HANDLE_SIGNING_UP: "handle-signing-up",

  HANDLE_LOGGING_IN: "handle-logging-in",

  ASSIGN_LOGGED_IN_USER: "assign-logged-in-user",
};

export const registerInitialState = {
  signupInfo: {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  loginInfo: { email: "", password: "" },

  loggedInUser: null,
};

export function registerReducer(registerState, { type, payload }) {
  switch (type) {
    // * Signup inputs

    case REGISTER_TYPES.SIGNUP_FULL_NAME_INPUT: {
      return {
        ...registerState,
        signupInfo: { ...registerState.signupInfo, fullName: payload },
      };
    }

    case REGISTER_TYPES.SIGNUP_USER_NAME_INPUT: {
      return {
        ...registerState,
        signupInfo: { ...registerState.signupInfo, username: payload },
      };
    }

    case REGISTER_TYPES.SIGNUP_EMAIL_INPUT: {
      return {
        ...registerState,
        signupInfo: { ...registerState.signupInfo, email: payload },
      };
    }

    case REGISTER_TYPES.SIGNUP_PASSWORD_INPUT: {
      return {
        ...registerState,
        signupInfo: { ...registerState.signupInfo, password: payload },
      };
    }

    case REGISTER_TYPES.SIGNUP_CONFIRM_PASSWORD_INPUT: {
      return {
        ...registerState,
        signupInfo: { ...registerState.signupInfo, confirmPassword: payload },
      };
    }
    // * Login inputs
    case REGISTER_TYPES.LOGIN_EMAIL_INPUT: {
      return {
        ...registerState,
        loginInfo: { ...registerState.loginInfo, email: payload },
      };
    }

    case REGISTER_TYPES.LOGIN_PASSWORD_INPUT: {
      return {
        ...registerState,
        loginInfo: { ...registerState.loginInfo, password: payload },
      };
    }

    // * Signing up / Logging in
    case REGISTER_TYPES.ASSIGN_LOGGED_IN_USER: {
      return {
        signupInfo: {
          fullName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        loginInfo: { email: "", password: "" },

        loggedInUser: payload,
      };
    }

    default: {
      return registerState;
    }
  }
}
