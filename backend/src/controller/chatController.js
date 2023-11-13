const { PrismaClient } = require("@prisma/client");
const OpenAI = require("openai");
const myCustomOpenAi = require("../openai-config");

const prisma = new PrismaClient();

const getAllChats = (req, res) => {
  res.send("getting all users");
};

const generateChatCompletion = async (req, res) => {
  const { message } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
      include: {
        chats: true, // Fetch user's chats
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "you have to log in or register" });
    }
    // grab chats of the user to get the context of the convo
    // console.log(user);
    const chats = user.chats.map(({ content, role }) => ({
      role: role, // Assuming your chat object has a 'role' property
      content: content, // Assuming your chat object has a 'content' property
    }));
    console.log(chats);
    chats.push({ content: message, role: "user" });
    // send all chats plus the new one to the user
    user.chats.push({ role: "user", content: message });

    const chatResponse = await myCustomOpenAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    console.log(
      "first==================>" + chatResponse.choices[0].message.content
    );
    user.chats.push({
      role: "assistant",
      content: chatResponse.choices[0].message.content,
    });
    user.chats.map((each) => {
      console.log(each);
    });
    console.log("second====================>");

    return res.status(200).json({ userChats: user.chats });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const createChat = (req, res) => {
  res.send("update user");
};

const getChat = (req, res) => {
  res.send("getting 1 user" + req.params);
};

const deleteChat = (req, res) => {
  res.send("deleting user");
};

const updateChat = (req, res) => {
  res.send("update user");
};

module.exports = {
  getAllChats,
  getChat,
  deleteChat,
  updateChat,
  createChat,
  generateChatCompletion,
};
