import createError from "http-errors";
import User from "../models/User.model.js";

export const registerPost = async (req, res, next) => {
  const { username, password, fullName, email } = req.body;

  let foundUsername;

  try {
    foundUsername = await User.findOne({ username: username });
  } catch {
    return next(createError(500, "Server error"));
  }

  if (foundUsername) {
    next(createError(409, "Username already exists"));
  } else {
    try {
      const newUser = await User.create({
        username,
        password,
        fullName,
        email,
      });

      res.status(201).json({
        id: newUser._id,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        // Send back the specific message in the schema to the frontend
        console.log(err.errors);

        const errMsg = Object.values(err.errors)[0].message;

        return next(createError(400, errMsg));
      }

      next(
        createError(
          500,
          "Registration could not be completed. Please try again"
        )
      );
    }
  }
};