require("dotenv").config();
const OpenAI = require("openai");

const myCustomOpenAi = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
  organization: process.env.OPEN_AI_ORG,
});

module.exports = myCustomOpenAi;
