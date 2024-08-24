import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

import { useSignup } from "../hooks";

import { StarsCanvas, EarthCanvas } from "../components";

// import LogoutButton from "../components/LogoutButton";
// import { useAuthContext } from "../contexts/authContext/AuthContext";

function Signup() {
  const { signupInfo, registerDispatch, REGISTER_TYPES } = useRegisterContext();

  // const { loggedInUser } = useAuthContext();

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
      <div
        className="w-full bg-black py-4 flex  lg:justify-between lg:items-center lg:h-[100vh] h-[100vh] flex-col lg:flex-row "

        // className="w-full  bg-black h-[100vh] flex justify-center items-center lg:justify-end"
      >
        <motion.div className="h-[660px] z-10 lg:w-[50%] lg:block hidden">
          <EarthCanvas />
        </motion.div>
        <motion.div
          //   className="w-[90%] h-[90%] mx-auto bg-white rounded-3xl

          // md:w-[75%]
          // lg:w-[35%] lg:mx-0 lg:mr-8
          // "
          className="w-[90%] mx-auto bg-white rounded-3xl z-10 md:w-[75%] lg:w-[35%] lg:mx-0 lg:mr-0"
          // className="w-[90%] h-[90%] mx-auto bg-white rounded-3xl z-10 md:w-[75%] lg:w-[35%] lg:mx-0 lg:mr-8"
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
        >
          <form
            onSubmit={handleSignup}
            className="flex flex-col justify-center items-center gap-4 p-8
            md:gap-10 md:justify-between 

            lg:gap-4 lg:h-full lg:p-4
            
            
            "
          >
            <h2
              className="text-2xl font-bold font-montserrat
            md:text-3xl
            lg:text-2xl
            xl:text-3xl
            "
            >
              Please sign up
            </h2>
            <div
              className=" font-palanquin text-sm flex flex-col gap-1
            md:w-[90%] md:justify-center md:text-xl


            lg:text-base

            2xl:text-2xl
            "
            >
              <label htmlFor="fullName">Full Name :</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
                h-[40px]
                md:h-[60px]
                "
                value={fullName}
                onChange={({ target }) =>
                  registerDispatch({
                    type: SIGNUP_FULL_NAME_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <div
              className=" font-palanquin text-sm flex flex-col gap-1
            md:w-[90%] md:justify-center md:text-xl

            lg:text-base

            2xl:text-2xl
            "
            >
              <label htmlFor="username">Username :</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
                h-[40px]
                md:h-[60px]
                "
                value={username}
                onChange={({ target }) =>
                  registerDispatch({
                    type: SIGNUP_USER_NAME_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <div
              className=" font-palanquin text-sm flex flex-col gap-1
            md:w-[90%] md:justify-center md:text-xl

            lg:text-base

            2xl:text-2xl
            "
            >
              <label htmlFor="email">Email :</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email"
                className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
                h-[40px]
                md:h-[60px]
                "
                value={email}
                onChange={({ target }) =>
                  registerDispatch({
                    type: SIGNUP_EMAIL_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <div
              className=" font-palanquin text-sm flex flex-col gap-1
            md:w-[90%] md:justify-center md:text-xl

            lg:text-base

            2xl:text-2xl
            "
            >
              <label htmlFor="password">Password :</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
                h-[40px]
                md:h-[60px]
                "
                value={password}
                onChange={({ target }) =>
                  registerDispatch({
                    type: SIGNUP_PASSWORD_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <div
              className=" font-palanquin text-sm flex flex-col gap-1
            md:w-[90%] md:justify-center md:text-xl

            lg:text-base

            2xl:text-2xl
            "
            >
              <label htmlFor="confirm-password">Confirm Password :</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Repeat your password"
                className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
                h-[40px]
                md:h-[60px]
                "
                value={confirmPassword}
                onChange={({ target }) =>
                  registerDispatch({
                    type: SIGNUP_CONFIRM_PASSWORD_INPUT,
                    payload: target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-hehe text-white
            md:w-[50%] md:text-xl
            lg:text-base
            "
            >
              Sign up
            </button>

            <Link
              to="/"
              className="btn-link mb-1
            md:text-xl
            lg:text-base
            "
            >
              Already have an account?
            </Link>
            {/* <LogoutButton /> */}
          </form>
        </motion.div>
      </div>
      <StarsCanvas />
    </>
  );
}

export default Signup;
