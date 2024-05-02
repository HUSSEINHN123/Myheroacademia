const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "حبي",
    aliases: ["حبنا"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortdescription: "رسالة حب",
    longDescription: "رسالة حب من أجل حبيبين",
    category: "حب",
    guide: ""
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length == 0) {
      message.reply(" ✨ | يجب أن تقوم بعمل منشن لحبك الحقيقي");
      return;
    }

    let one;
    if (mention.length == 1) {
      one = mention[0];
    } else {
      one = mention[0];
    }

    try {
      const imagePath = await bal(one);
      await message.reply({
        body: "「  هل هذا حقيقي ؟ 🥰❤️ 」",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("حدث خطأ");
    }
  }
};
async function bal(one) {
  const avatarone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const image = await jimp.read("https://i.imgur.com/6iJAFZv.jpg");
  image.resize(512, 512).composite(avatarone.resize(173, 173), 70, 186);
  const imagePath = "wholesome.png";
  await image.writeAsync(imagePath);
  return imagePath;
}