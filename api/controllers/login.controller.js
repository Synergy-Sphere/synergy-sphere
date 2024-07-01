import createError from "http-errors";
import User from "../models/User.js";


export const loginPost = async (req, res, next) => {
 
  const { username, password, fullName, email } = req.body;

  let foundUser;
  
 
  try {
    foundUser = await User.findOne({username: username, password: password, fullName: fullName, email: email});
  } catch {
    return next(createError(500, "Server error"));
  }
  
 
  if (foundUser) {    
   
    const accessToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    
    const cookieOptions = {
      
      httpOnly: true,
      
      secure: true,
      
      sameSite: "Strict"
    }

   
    const accessOptions = {
      ...cookieOptions,
      
      maxAge: 1000 * 60 * 15 
    }

    const refreshOptions = {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/refresh-token"  
    }

   
    res.cookie("accessCookie", accessToken, accessOptions)
    res.cookie("refreshCookie", refreshToken, refreshOptions)

    
    res.json({ 
      id: foundUser._id
    })
  } else {
    next(createError(401, "Login unsuccessful - please check your details"));
  }
};