const express = require("express");
const {
  deleteChat,
  createChat,
  getAllChats,
  getChat,
  updateChat,
  generateChatCompletion,
} = require("../controller/chatController");
const { verifyToken } = require("../middleware/verifyToken");
const { validate, chatValidator } = require("../utility/validator");

const router = express.Router();

router
  .route("/new")
  .post(validate(chatValidator), verifyToken, generateChatCompletion);

router.route("/").get(getAllChats).post(createChat);

router.route("/:id").get(getChat).delete(deleteChat).patch(updateChat);

module.exports = router;
