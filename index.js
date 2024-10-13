const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
dotenv.config();

const Token = process.env.BOT_TOKEN;

const bot = new TelegramBot(Token , {polling : true});

bot.on('message', (msg) => {
    const text = msg.text;

    console.log("Message received: ", text);
})

bot.onText(/\/echo (.+)/, (msg, match) => {
    
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    
    bot.sendMessage(chatId, resp);
});


bot.onText(/\/[Jj]oke/ , async (msg) => {
    const joke = await axios.get('https://v2.jokeapi.dev/joke/Any');

    const setUp = joke.data.setup;
    const punchline = joke.data.delivery;

    bot.sendMessage(msg.chat.id , setUp + " " + punchline);
})


const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

bot.onText(/\/[Ww]rite (.+)/ , async (msg , match) => {
    const prompt = match[1];

    const reply = await model.generateContent(prompt);

    bot.sendMessage(msg.chat.id, reply.response.text());
})

