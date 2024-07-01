import createError from "http-errors";
import User from "../models/User.js";

export const signUpPost = async (req, res, next) => {
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
        email
      });
  
      res.status(201).json({
        id: newUser._id,
      })
 
    } catch (err) {
      if (err.name === "ValidationError") {
       
        console.log(err.errors)

        const errMsg = Object.values(err.errors)[0].message;

        return next(createError(400, errMsg));
      }

      next(createError(500, "Login could not be completed. Please try again"));
    }
  }
};