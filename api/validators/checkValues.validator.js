import createError from "http-errors";

function checkValues(props) {
  return function (req, res, next) {
    props.forEach((field) => {
      if (!req.body[field]) {
        if (!req.body["confirmPassword"]) {
          return next(createError(400, "Please confirm your password"));
        } else {
          return next(
            createError(
              400,
              `${field.slice(0, 1).toUpperCase() + field.slice(1)} is required`
            )
          );
        }
      }
    });

    next();
  };
}

export default checkValues;
