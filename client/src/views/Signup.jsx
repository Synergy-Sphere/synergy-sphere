import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className="w-[80%] mx-auto my-20">
        <form className="flex flex-col justify-center items-start gap-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your Email"
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Repeat your password"
            className="input input-bordered w-full max-w-xs"
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
