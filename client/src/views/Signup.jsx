import { Link } from "react-router-dom";

import { useRegisterContext } from "../contexts/registerContext/RegisterContext";


// import useSignup from "../hooks/useSignup";

import { useSignup } from "../hooks";

function Signup() {
  const { signupInfo, registerDispatch, REGISTER_TYPES } = useRegisterContext();

  const { fullName, username, email, password, confirmPassword } = signupInfo;

  const {
    SIGNUP_FULL_NAME_INPUT,
    SIGNUP_USER_NAME_INPUT,
    SIGNUP_EMAIL_INPUT,
    SIGNUP_PASSWORD_INPUT,
    SIGNUP_CONFIRM_PASSWORD_INPUT,
  } = REGISTER_TYPES;

  const { loading, signingUp } = useSignup();

  async function handleSignup(e) {
    e.preventDefault();
    await signingUp({ fullName, username, email, password, confirmPassword });
  }
  return (
    <>
      <div className="w-[80%] mx-auto my-20">
        <form
          onSubmit={handleSignup}
          className="flex flex-col justify-center items-start gap-4"
        >
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full max-w-xs"
            value={fullName}
            onChange={({ target }) =>
              registerDispatch({
                type: SIGNUP_FULL_NAME_INPUT,
                payload: target.value,
              })
            }
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={({ target }) =>
              registerDispatch({
                type: SIGNUP_USER_NAME_INPUT,
                payload: target.value,
              })
            }
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={({ target }) =>
              registerDispatch({
                type: SIGNUP_EMAIL_INPUT,
                payload: target.value,
              })
            }
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={({ target }) =>
              registerDispatch({
                type: SIGNUP_PASSWORD_INPUT,
                payload: target.value,
              })
            }
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Repeat your password"
            className="input input-bordered w-full max-w-xs"
            value={confirmPassword}
            onChange={({ target }) =>
              registerDispatch({
                type: SIGNUP_CONFIRM_PASSWORD_INPUT,
                payload: target.value,
              })
            }
          />

          <button type="submit" className="btn">
            Sign up
          </button>
        </form>

        <Link to="/login" className="btn-link mt-7">
          Login
        </Link>
      </div>
    </>
  );
}

export default Signup;
