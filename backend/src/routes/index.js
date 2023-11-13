const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const chatRouter = require("./chatRouter");

router.use("/users", userRouter);
router.use("/chats", chatRouter);

module.exports = router;
