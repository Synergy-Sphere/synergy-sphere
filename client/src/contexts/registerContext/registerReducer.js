export const REGISTER_TYPES = {
  SIGNUP_FULL_NAME_INPUT: "fullName",
  SIGNUP_USER_NAME_INPUT: "username",
  SIGNUP_EMAIL_INPUT: "signup-email",
  SIGNUP_PASSWORD_INPUT: "signup-password",
  SIGNUP_CONFIRM_PASSWORD_INPUT: "confirm-password",

  LOGIN_EMAIL_INPUT: "login-email",
  LOGIN_PASSWORD_INPUT: "login-password",
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
    default: {
      return registerState;
    }
  }
}
