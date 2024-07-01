import usersData from "../data.js";

export const postLogin = (req, res, next) => {
  const { username, password } = req.body;
  const loggedInUser = usersData.find(
    user =>
      user.username === username &&
      user.password === password
  );

  if (loggedInUser) {
    res.json(loggedInUser);
  } else {
    const error = new Error("Incorrect login data");
    // 401 = "Unauthorized"
    error.status = 401;
    next(error);
  }
}