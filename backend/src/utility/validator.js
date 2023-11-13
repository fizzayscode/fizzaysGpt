const { body } = require("express-validator");

const validate = (validations = []) => {
  return async (req, res, next) => {
    const errors = [];
    for (let validation of validations) {
      const result = await validation.run(req);
      // console.log(result);
      if (!result.isEmpty()) {
        errors.push(result.array());
      }
    }
    if (errors.length > 0) {
      // Handle validation errors here
      return res.status(422).json({ errors });
    }

    // No validation errors, continue to the next middleware
    next();
  };
};

const loginValidator = [
  body("email").trim().isEmail().notEmpty().withMessage("email is required"),
  body("password").trim().notEmpty().withMessage("password must be provided"),
];

const signUpValidator = [
  body("email").trim().isEmail().notEmpty().withMessage("email is required"),
  body("password")
    .trim()
    .isStrongPassword()
    .notEmpty()
    .withMessage("password cant be weak and is required"),
  body("name").trim().notEmpty(),
];

const chatValidator = [
  body("message").trim().notEmpty().withMessage("message is required"),
];

module.exports = {
  validate,
  chatValidator,
  loginValidator,
  signUpValidator,
  chatValidator,
};
