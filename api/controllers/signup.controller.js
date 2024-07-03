import createError from "http-errors";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, fullName, email, confirmPassword } = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ username: username });
  } catch {
    return next(createError(500, "Server error"));
  }

  if (foundUser) {
    return next(createError(409, "Such username already in use"));
  } else {
    try {
      foundUser = await User.findOne({ email: email });
    } catch (error) {
      return next(createError(500, "Server error"));
    }

    if (foundUser) {
      return next(createError(409, "Such email already in use"));
    } else {
      if (password !== confirmPassword) {
        return next(
          createError(409, "Confirm Password is not matching to Password")
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const cookieOptions = {
          httpOnly: true,
          // secure: true, // uncomment when it will be ready for production mode
          sameSite: "Strict"
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

        try {
          const newUser = await User.create({
            username,
            password: hashedPassword,
            fullName,
            email,
          });

          const accessToken = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_KEY,
            {
              expiresIn: "15d", // change later to proper values
            }
          );

          const refreshToken = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_KEY,
            { expiresIn: "20d" } // change later to proper values
          );

          res.cookie("accessCookie", accessToken, accessOptions);
          res.cookie("refreshCookie", refreshToken, refreshOptions);

          res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            fullName: newUser.fullName,
            email: newUser.email,
          });
        } catch (err) {
          if (err.name === "ValidationError") {
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
    }
  }
};