import { Link } from "react-router-dom";

import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

import { useLogin } from "../hooks";

function Login() {
  const { loginInfo, registerDispatch, REGISTER_TYPES } = useRegisterContext();

  const { email, password } = loginInfo;


  const { LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT } = REGISTER_TYPES;

  const { loading, loggingIn } = useLogin();

  async function handleLogin(e) {
    e.preventDefault();

    await loggingIn({ email, password });
  }


  return (
    <>
      <div className="w-[80%] mx-auto my-20">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-start gap-4"
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your Email"
            className="input input-bordered w-full max-w-xs"


            value={email}


            onChange={({ target }) =>
              registerDispatch({
                type: LOGIN_EMAIL_INPUT,
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
                type: LOGIN_PASSWORD_INPUT,
                payload: target.value,
              })
            }
          />

          <button type="submit" className="btn">
            Login
          </button>
          <Link to="/signup" className="btn-link mt-7">
            Sign up
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
