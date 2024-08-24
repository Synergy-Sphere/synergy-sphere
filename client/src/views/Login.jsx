import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  // usePresence,
  // useAnimate,
} from "framer-motion";

import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

import { useLogin, useSignup } from "../hooks";
import { StarsCanvas, EarthCanvas, PixelsEffect, Heading } from "../components";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

function Login() {
  const [pixelView, setPixelView] = useState(true);
  const [heading, setHeading] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => setPixelView(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    const headingTimeOut = setTimeout(() => setHeading(false), 5000);

    return () => clearTimeout(headingTimeOut);
  }, []);

  const {
    loginInfo,
    signupInfo,

    registerDispatch,

    isLoginView,

    REGISTER_TYPES,
  } = useRegisterContext();

  const { email: loginEmail, password: loginPassword } = loginInfo;
  // const { fullName, username, email, password, confirmPassword } = signupInfo;

  const {
    LOGIN_EMAIL_INPUT,
    LOGIN_PASSWORD_INPUT,

    // SIGNUP_FULL_NAME_INPUT,
    // SIGNUP_USER_NAME_INPUT,
    // SIGNUP_EMAIL_INPUT,
    // SIGNUP_PASSWORD_INPUT,
    // SIGNUP_CONFIRM_PASSWORD_INPUT,

    // IS_LOGIN_VIEW,
  } = REGISTER_TYPES;

  const { loading, loggingIn } = useLogin();
  // const { signingUp } = useSignup();

  async function handleLogin(e) {
    e.preventDefault();

    await loggingIn(loginEmail, loginPassword);

    registerDispatch({
      type: LOGIN_EMAIL_INPUT,
      payload: "",
    });

    registerDispatch({
      type: LOGIN_PASSWORD_INPUT,
      payload: "",
    });
  }

  // async function handleSignup(e) {
  //   e.preventDefault();
  //   await signingUp({ fullName, username, email, password, confirmPassword });

  //   registerDispatch({
  //     type: SIGNUP_FULL_NAME_INPUT,
  //     payload: "",
  //   });

  //   registerDispatch({
  //     type: SIGNUP_USER_NAME_INPUT,
  //     payload: "",
  //   });

  //   registerDispatch({
  //     type: SIGNUP_EMAIL_INPUT,
  //     payload: "",
  //   });

  //   registerDispatch({
  //     type: SIGNUP_PASSWORD_INPUT,
  //     payload: "",
  //   });

  //   registerDispatch({
  //     type: SIGNUP_CONFIRM_PASSWORD_INPUT,
  //     payload: "",
  //   });
  // }

  // const [isPresent, safeToRemove] = usePresence();
  // const [scope, animate] = useAnimate();

  // useEffect(() => {
  //   if (!isPresent) {
  //     async function exitAnimation() {
  //       await animate(
  //         scope.current,
  //         {
  //           scale: 1.5,
  //         },
  //         {
  //           ease: "easeIn",
  //           duration: 1.5
  //         }
  //       );

  //       await animate(
  //         scope.current,
  //         {
  //           opacity: 0,
  //         },
  //         {
  //           delay: 1,
  //         }
  //       );
  //       safeToRemove();
  //     }

  //     exitAnimation();
  //   }
  // }, isPresent);

  return (
    <>
      {heading && (
        <div className="absolute z-50 inset-0 bg-black">
          <Heading pixelView={pixelView} />

          <PixelsEffect pixelView={pixelView} setPixelView={setPixelView} />
        </div>
      )}
      {!heading && (
        <div className="w-full bg-black py-4 flex justify-center  lg:justify-between lg:items-center h-[100vh] flex-col lg:flex-row ">

          <motion.div className="md:h-[660px] z-10 h-[350px] lg:w-[50%] hidden lg:block">
            <EarthCanvas />
          </motion.div>

          <motion.div
            // ref={scope}
            className="w-[90%] h-[75%] mx-auto bg-white rounded-3xl z-10 md:w-[75%] lg:w-[35%] lg:mx-0 lg:mr-0"
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            exit={{
              opacity: 0,
              x: 25,
            }}
            layout
          >
            <motion.form
              onSubmit={handleLogin}
              className="flex flex-col justify-center items-center gap-8 p-8 h-full md:gap-12 md:justify-between"
              // initial={{
              //   opacity: 0,
              //   x: 25,
              // }}
              // animate={{
              //   opacity: 1,
              //   x: 0,
              // }}
              // transition={{
              //   ease: "easeInOut",
              //   duration: 1,
              // }}
              // exit={{
              //   opacity: 0,
              //   x: 25,
              // }}
            >
              <h2
                className="text-2xl font-bold font-montserrat
            md:text-3xl
            "
              >
                Welcome Back
              </h2>
              <div
                className=" font-palanquin text-lg flex flex-col gap-4
            md:w-[90%] md:justify-center md:text-2xl
            "
              >
                <label htmlFor="loginEmail">Email :</label>
                <input
                  id="loginEmail"
                  type="text"
                  placeholder="Enter your Email"
                  className="input input-bordered w-full bg-slate-100 focus:outline-none border-none"
                  value={loginEmail}
                  onChange={({ target }) =>
                    registerDispatch({
                      type: LOGIN_EMAIL_INPUT,
                      payload: target.value,
                    })
                  }
                />
              </div>
              <div
                className=" font-palanquin text-lg flex flex-col gap-4
            md:w-[90%] md:justify-center md:text-2xl
            "
              >
                <label htmlFor="loginPassword">Password :</label>
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full bg-slate-100 focus:outline-none border-none"
                  value={loginPassword}
                  onChange={({ target }) =>
                    registerDispatch({
                      type: LOGIN_PASSWORD_INPUT,
                      payload: target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn w-full bg-hehe text-white
            md:w-[50%] md:text-xl
            "
              >
                Login
              </button>
              <Link to="/signup" className="btn-link mt-7">
                Don't have an account?
              </Link>
              {/* <button
                  className="btn-link mb-1 md:text-xl lg:text-base"
                  onClick={() =>
                    registerDispatch({
                      type: IS_LOGIN_VIEW,
                      payload: false,
                    })
                  }>
                  Don't have an account?
                </button> */}
            </motion.form>
          </motion.div>

          {isLoginView ? (
            <p></p>
          ) : (
            // <AnimatePresence>
            //   <motion.div className="w-[90%] h-[90%] mx-auto bg-white rounded-3xl z-10 md:w-[75%] lg:w-[35%] lg:mx-0 lg:mr-8">
            //     <motion.form
            //       onSubmit={handleSignup}
            //       className="flex flex-col justify-center items-center gap-4 p-8 md:gap-10 md:justify-between lg:gap-4 lg:h-full lg:p-4"
            //     >
            //       <h2 className="text-2xl font-bold font-montserrat  md:text-3xl lg:text-2xl xl:text-3xl">
            //         Please sign up
            //       </h2>
            //       <div className=" font-palanquin text-sm flex flex-col gap-1 md:w-[90%] md:justify-center md:text-xl lg:text-base  2xl:text-2xl">
            //         <label htmlFor="fullName">Full Name :</label>
            //         <input
            //           id="fullName"
            //           type="text"
            //           placeholder="Enter your full name"
            //           className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
            //         h-[40px]
            //         md:h-[60px]
            //         "
            //           value={fullName}
            //           onChange={({ target }) =>
            //             registerDispatch({
            //               type: SIGNUP_FULL_NAME_INPUT,
            //               payload: target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <div
            //         className=" font-palanquin text-sm flex flex-col gap-1
            //     md:w-[90%] md:justify-center md:text-xl

            //     lg:text-base

            //     2xl:text-2xl
            //     "
            //       >
            //         <label htmlFor="username">Username :</label>
            //         <input
            //           id="username"
            //           type="text"
            //           placeholder="Enter your username"
            //           className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
            //         h-[40px]
            //         md:h-[60px]
            //         "
            //           value={username}
            //           onChange={({ target }) =>
            //             registerDispatch({
            //               type: SIGNUP_USER_NAME_INPUT,
            //               payload: target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <div
            //         className=" font-palanquin text-sm flex flex-col gap-1
            //     md:w-[90%] md:justify-center md:text-xl

            //     lg:text-base

            //     2xl:text-2xl
            //     "
            //       >
            //         <label htmlFor="email">Email :</label>
            //         <input
            //           id="email"
            //           type="email"
            //           placeholder="Enter your Email"
            //           className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
            //         h-[40px]
            //         md:h-[60px]
            //         "
            //           value={email}
            //           onChange={({ target }) =>
            //             registerDispatch({
            //               type: SIGNUP_EMAIL_INPUT,
            //               payload: target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <div
            //         className=" font-palanquin text-sm flex flex-col gap-1
            //     md:w-[90%] md:justify-center md:text-xl

            //     lg:text-base

            //     2xl:text-2xl
            //     "
            //       >
            //         <label htmlFor="password">Password :</label>
            //         <input
            //           id="password"
            //           type="password"
            //           placeholder="Enter your password"
            //           className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
            //         h-[40px]
            //         md:h-[60px]
            //         "
            //           value={password}
            //           onChange={({ target }) =>
            //             registerDispatch({
            //               type: SIGNUP_PASSWORD_INPUT,
            //               payload: target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <div
            //         className=" font-palanquin text-sm flex flex-col gap-1
            //     md:w-[90%] md:justify-center md:text-xl

            //     lg:text-base

            //     2xl:text-2xl
            //     "
            //       >
            //         <label htmlFor="confirm-password">Confirm Password :</label>
            //         <input
            //           id="confirm-password"
            //           type="password"
            //           placeholder="Repeat your password"
            //           className="input input-bordered w-full bg-slate-100 focus:outline-none border-none
            //         h-[40px]
            //         md:h-[60px]
            //         "
            //           value={confirmPassword}
            //           onChange={({ target }) =>
            //             registerDispatch({
            //               type: SIGNUP_CONFIRM_PASSWORD_INPUT,
            //               payload: target.value,
            //             })
            //           }
            //         />
            //       </div>

            //       <button
            //         type="submit"
            //         className="btn w-full bg-hehe text-white
            //     md:w-[50%] md:text-xl
            //     lg:text-base
            //     "
            //       >
            //         Sign up
            //       </button>

            //       {/* <Link
            //         to="/"
            //         className="btn-link mb-1
            //     md:text-xl
            //     lg:text-base
            //     "
            //       >
            //         Already have an account?
            //       </Link> */}

            //       <button
            //         className="btn-link mb-1
            //     md:text-xl
            //     lg:text-base
            //     "
            //         onClick={() =>
            //           registerDispatch({
            //             type: IS_LOGIN_VIEW,
            //             payload: true,
            //           })
            //         }
            //       >
            //         Already have an account?
            //       </button>
            //       {/* <LogoutButton /> */}
            //     </motion.form>
            //   </motion.div>
            // </AnimatePresence>

            <p></p>
          )}
        </div>
      )}
      <StarsCanvas />
    </>
  );
}

export default Login;
