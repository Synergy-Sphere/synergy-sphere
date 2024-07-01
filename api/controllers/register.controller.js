import { v4 as uuidv4 } from "uuid";
import usersData from "../data.js";

export const postUser = (req, res) => {
  // The req body will contain values for username and password
  const { username, password } = req.body;

  // Create new user object
  const newUser = {
    username: username,
    password: password,
    id: uuidv4()
  };

  // Push new user object into usersData array
  usersData.push(newUser);

  // Send response to the client
  res.status(201).json(newUser);
}