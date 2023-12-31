const { PrismaClient } = require("@prisma/client");
const {
  encryptPassword,
  checkPassword,
  generateSignature,
} = require("../utility/passwordUtility");
const errorHandler = require("../utility/customErrorHandler");
const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    if (users) {
      return res.status(200).json({ message: "OK", users: users });
    }
    return res.json(200).json({ message: "OK", users: "no users " });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const createUser = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (
    !email ||
    !name ||
    !password ||
    email.trim() == "" ||
    name.trim() == "" ||
    password.trim() == ""
  ) {
    next(errorHandler(404, "provide name email and password"));
  }
  const exisitingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (exisitingUser) {
    next(errorHandler(400, "user with email already exists"));
  }
  try {
    const encryptedPassword = await encryptPassword(password);
    console.log(encryptedPassword);
    const user = await prisma.user.create({
      data: { name, email, password: encryptedPassword },
    });
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application

    const token = generateSignature({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    return res
      .status(201)
      .json({ message: "USER CREATED", name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password.trim() == "" || email.trim == "") {
    next(errorHandler(404, "you must provide email or password"));
  }

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }

  const correctPassword = await checkPassword(password, user.password);

  if (correctPassword) {
    const token = generateSignature({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    console.log(token);
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });

    return res.status(200).json({
      message: "LOGGED IN SUCCESSFULLY",
      name: user.name,
      email: user.email,
    });
  } else {
    next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found or token malfunctioned" });
    }

    res.status(200).json({ message: "user Found", user: user });
  } catch (e) {
    // console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logOutUser = (req, res) => {
  console.log("Clearing cookie...");
  res.clearCookie(process.env.COOKIE_NAME, {
    path: "/",
    domain: "localhost",
    httpOnly: true,
    // encrypt thr cookie in a signed format
    signed: true,
  });
  console.log("Cookie cleared!");
  res.status(200).json({ message: "successfully signed out" });
};

const deleteUser = (req, res) => {
  res.send("deleting user");
};

const updateUser = (req, res) => {
  res.send("update user");
};

module.exports = {
  getAllUsers,
  logOutUser,
  deleteUser,
  updateUser,
  createUser,
  loginUser,
  verifyUser,
};
