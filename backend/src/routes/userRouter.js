const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
  loginUser,
  verifyUser,
  logOutUser,
} = require("../controller/userController");
const {
  validate,
  signUpValidator,
  loginValidator,
} = require("../utility/validator");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/signup").post(validate(signUpValidator), createUser);
router.route("/login").post(validate(loginValidator), loginUser);
router.route("/auth-status").get(verifyToken, verifyUser);
router.route("/logout").get(verifyToken, logOutUser);

router.route("/").get(getAllUsers);

router.route("/:id").delete(deleteUser).patch(updateUser);

module.exports = router;
