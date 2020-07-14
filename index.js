require("dotenv").config();
const discord = require("discord.js");
const axios = require("axios");
const bot = new discord.Client();

const TOKEN = process.env.TOKEN;
const PROXY = "https://cors-anywhere.herokuapp.com/"; //CORS

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on("message", (msg) => {
  const request = msg.content.trim().split(" ");
  const verb = request[0].toUpperCase();
  const url = prefixUrl(request[1]);
  const message = request[2]; //message to POST / PUT

  if (verb == "!help") {
    showHelp(msg);
  }

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
            "\n ⚠️ The contents exceeded discord message length \n 🚚 Therefore contents had to be split"
          );
          msg.channel.send(stringList[0]);
          msg.channel.send(stringList[1]);
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        } else {
          //content doesnt exceed length limit so send.
          msg.reply(" GET 🛩 \n 🚚 Response Recieved:");
          msg.channel.send(JSON.stringify(response.data, null, 4));
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply("🔴 there was an error fetching your response");
        msg.channel.send(
          `Error : ${error.response.data} Status : ${error.response.status}`
        );
      });
  } else if (verb === "POST") {
    axios
      .post(url, JSON.stringify(message))
      .then((response) => {
        if (JSON.stringify(response.data, null, 4).length > 2000) {
          const stringList = splitMessage(
            JSON.stringify(response.data, null, 4)
          );
          msg.reply(
            "\n ⚠️ The response exceed discord message length \n 🚚 Therefore contents had to be split"
          );
          msg.channel.send(stringList[0]);
          msg.channel.send(stringList[1]);
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        } else {
          msg.reply("POST ✉️ \n🚚 Response Recieved:");
          msg.channel.send(JSON.stringify(response.data, null, 4));
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply("🔴 There was an error fetching your response");
        msg.channel.send(
          `Error : ${error.response.data} Status : ${error.response.status}`
        );
      });
  } else if (verb == "PUT") {
    axios
      .put(url, JSON.stringify(message))
      .then((response) => {
        if (JSON.stringify(response.data, null, 4).length > 2000) {
          const stringList = splitMessage(
            JSON.stringify(response.data, null, 4)
          );
          msg.reply(
            "\n ⚠️ The response exceed discord message length \n 🚚 Therefore contents had to be split"
          );
          msg.channel.send(stringList[0]);
          msg.channel.send(stringList[1]);
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        } else {
          msg.reply("PUT 📦 \n🚚 Response Recieved:");
          msg.channel.send(JSON.stringify(response.data, null, 4));
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply("🔴 There was an error fetching your response");
        msg.channel.send(
          `Error : ${error.response.data} Status : ${error.response.status}`
        );
      });
  } else if (verb == "DELETE") {
    axios
      .delete(url)
      .then((response) => {
        if (JSON.stringify(response.data, null, 4).length > 2000) {
          //split
          const stringList = splitMessage(
            JSON.stringify(response.data, null, 4)
          );

          msg.reply(
            "\n ⚠️ The contents exceeded discord message length \n 🚚 Therefore contents had to be split"
          );
          msg.channel.send(stringList[0]);
          msg.channel.send(stringList[1]);
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        } else {
          //content doesnt exceed length limit so send.
          msg.reply(" DELETE 🗑 \n 🚚 Response Recieved:");
          msg.channel.send(JSON.stringify(response.data, null, 4));
          console.log(
            `Sent response to user ${
              msg.member.user.tag
            }: response ${JSON.stringify(response.data, null, 4)}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply("There was an error");
        msg.channel.send(
          `Error : ${error.response.data} Status : ${error.response.status}`
        );
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

//function to infer https://..
function prefixUrl(url) {
  if (url !== undefined) {
    return url.includes("https://") ? url : "https://" + url;
  } else {
    return url;
  }
}

function showHelp(msg) {
  msg.reply(
    "\n ⚙️ PostyBot Commands \n \n 🛩 GET 'url' \n ✉️ POST 'url' 'json/raw-content' "
  );
}
