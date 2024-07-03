import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.model.js";

async function authenticateToken(req, res, next) {
  try {
    const { accessCookie, refreshCookie } = req.cookies;

    if (!accessCookie && !refreshCookie) {
      throw new Error("User could not be authenticated. Please try again");
    }

    let token;

    if (refreshCookie) {
      token = refreshCookie;
    } else {
      token = accessCookie;
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const foundUser = await User.findById(id);

    if (foundUser) {
      req.user = foundUser;
    } else {
      return next(createError(404, "User not found"));
    }

    next();
  } catch (err) {
    next(createError(401, err.message))
  }
}

export default authenticateToken;