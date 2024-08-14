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

    await loggingIn(email, password);
  }

  return (
    <>
      <div className="w-full bg-gray-500 h-[100vh] flex justify-center items-center">
        <div className="w-[90%] h-[75%] mx-auto bg-white rounded-3xl">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-8 p-8 "
          >
            <h2 className="text-2xl font-bold font-montserrat">Welcome Back</h2>
            <div className=" font-palanquin text-lg flex flex-col gap-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter your Email"
                className="input input-bordered w-full max-w-xs bg-slate-100 focus:outline-none border-none"
                value={email}
                onChange={({ target }) =>
                  registerDispatch({
                    type: LOGIN_EMAIL_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>
            <div className=" font-palanquin text-lg flex flex-col gap-4">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs  bg-slate-100 focus:outline-none border-none"
                value={password}
                onChange={({ target }) =>
                  registerDispatch({
                    type: LOGIN_PASSWORD_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn w-full bg-hehe text-white">
              Login
            </button>
            <Link to="/signup" className="btn-link mt-7">
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
