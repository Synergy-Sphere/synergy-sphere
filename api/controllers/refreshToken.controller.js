import jwt from "jsonwebtoken";

export function refreshTokens(req, res) {
  const accessToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "15d" }); // change later
  const refreshToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "20d" }); // change later

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "Strict"
  };

  const accessOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 15 // change later
  };

  const refreshOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 20, // change later
    path: "/refresh-token"
  }

  res.cookie("accessCookie", accessToken, accessOptions)
  res.cookie("refreshCookie", refreshToken, refreshOptions)

  res.end();
}