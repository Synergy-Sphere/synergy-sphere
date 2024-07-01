function Login() {
  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" placeholder="Enter your Email" />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
