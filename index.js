require("dotenv").config();
const discord = require("discord.js");
const axios = require("axios");
const bot = new discord.Client();

const TOKEN = process.env.TOKEN;
const PROXY = "https://cors-anywhere.herokuapp.com/";

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  const request = msg.content.trim().split(" ");
  const verb = request[0];
  const url = request[1];

  if (verb === "GET") {
    axios
      .get(url)
      .then((response) => {
        //console.log(JSON.stringify(response.data, null, 4).length);

        //splitting message if longer than 2000 chars
        if (JSON.stringify(response.data, null, 4).length > 2000) {
          //split
          const stringList = splitMessage(
            JSON.stringify(response.data, null, 4)
          );

          msg.reply(
            "The contents exceeded discord message length \n Therefore contents had to be split"
          );
          msg.channel.send(stringList[0]);
          msg.channel.send(stringList[1]);
        } else {
          //content doesnt exceed length limit so send.
          msg.reply(JSON.stringify(response.data, null, 4));
          console.log(response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply("there was an error fetching your response");
      });
  }
});

//helper function to split string
function splitMessage(str) {
  var middle = Math.ceil(str.length / 2);
  var stringFirst = str.slice(0, middle);
  var stringLast = str.slice(middle);

  var stringList = [stringFirst, stringLast];

  return stringList;
}
