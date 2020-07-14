require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  
  const request = msg.content.trim().split(" ");
  const verb = request[0];
  const url = request[1];


  if()
    
  
});
