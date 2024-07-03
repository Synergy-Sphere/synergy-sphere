import User from "../models/User.model.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ email: email });
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundUser) {
    return next(createError(401, "Invalid email"));
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    return next(createError(401, "Invalid password"));
  }

  const accessToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
  const refreshToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, {
    expiresIn: "20d",
  });

  const cookieOptions = {
    httpOnly: true,
    // secure: true, // uncomment when it will be ready for production mode
    sameSite: "Strict",
  };

  const accessOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 15, // change later to proper values
  };

  const refreshOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 20, // change later to proper values
    path: "/refresh-token", // Only send the refreshCookie with requests to "/refresh-token"
  };

  res.cookie("accessCookie", accessToken, accessOptions);
  res.cookie("refreshCookie", refreshToken, refreshOptions);

  res.json({
    id: foundUser._id,
    username: foundUser.username,
    fullName: foundUser.fullName,
    email: foundUser.email,
  });
};
