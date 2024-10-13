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
    const joke = await axios.get('https://v2.jokeapi.dev/joke/Any')

    const setUp = joke.data.setup;
    const punchline = joke.data.delivery;

    bot.sendMessage(msg.chat.id , setUp + " " + punchline);
})

