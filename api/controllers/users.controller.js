import usersData from "../dataRoute.js";


export const getAllUsers = (req, res) => {
  res.json(usersData);
}


export const getUser = (req, res, next) => {
  const foundUser = usersData.find((user) => user.id === req.params.id);

  if (foundUser) {
    res.json(foundUser);
  } else {
    const error = new Error("Invalid user id");
    error.status = 400;
    next(error);
  }
}


export const deleteUser = (req, res, next) => {
 
  const deletedUser = usersData.find(user => user.id === req.params.id);
  
  
  const deletedUserIndex = usersData.indexOf(deletedUser);

 
  if (deletedUserIndex === -1) {
    const error = new Error("User not found");
    error.status = 400;
    next(error);
  
  } else {
   
    usersData.splice(deletedUserIndex, 1);
    
  
  
    res.json(usersData);
  }

}