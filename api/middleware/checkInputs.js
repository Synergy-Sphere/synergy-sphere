export const checkInputs = (req, res, next) => {
    console.log("checking user inputs...");
    const { username, password } = req.body;
  
   
    if (!username || !password) {
      const error = new Error("missing fields");
      error.status = 400;
      next(error);
    }
  
    next();
  };