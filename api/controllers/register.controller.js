// registerController

import createError from "http-errors";
import User from "../models/User.model.js";

export const registerPost = async (req, res, next) => {
  const { username, password } = req.body;

  let foundUsername;

  // Try to find an existing document with the same username
  try {
    foundUsername = await User.findOne({ username: username });
  } catch {
    return next(createError(500, "Server error"));
  }

  // If a document with the same username already exists, send a 409 error response
  if (foundUsername) {
    next(createError(409, "Username already exists"));
  // If no document is found, try to create a new "user" document
  } else {
    try {
      const newUser = await User.create(req.body);
  
      res.status(201).json({
        id: newUser._id,
      })
    // Catch error
    } catch (err) {
      if (err.name === "ValidationError") {
        // Send back the specific message in the schema to the frontend
        console.log(err.errors)

        const errMsg = Object.values(err.errors)[0].message;

        return next(createError(400, errMsg));
      }

      next(createError(500, "Registration could not be completed. Please try again"));
    }
  }
};