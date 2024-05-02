const axios = require("axios");
const fs = require("fs-extra");
module.exports = {
  config: {
    name: "هينتاي",
    author: "حسين يعقوبي",
    aliases: ["hintai"],
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "احصل على صورة أنمي جريئة",
      tl: "Get an image of the anime character Siesta",
    },
    longDescription: {
      en: "احصل على صورة لشخصية أنمي جرية",
      tl: "Get an image of the anime character Siesta",
    },
    category: "متعة",
    guide: {
      en: "{p}هينتاي",
      tl: "{p}siesta",
    },
  },

  onStart: async function ({ api, event, args }) {
    
    // تفاعل مع الرسالة قبل إرسال الصور
    api.setMessageReaction("😏", event.messageID, (err) => {}, true);

    try {
      // استرداد الصور من API
      const siestaResponse = await axios.get('https://ahegao.netlify.app/random');
      const ext = siestaResponse.headers['content-type'].split('/')[1];
      const path = __dirname + `/cache/hintai.${ext}`;

      // تحميل الصورة وإرسالها
      const callback = function () {
        api.sendMessage({
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      };

      const imageStream = fs.createWriteStream(path);
      axios.get(siestaResponse.request.res.responseUrl, { responseType: 'stream' }).then(response => {
        response.data.pipe(imageStream);
        imageStream.on('finish', callback);
      });
    } catch (error) {
      console.error("Error fetching Siesta image:", error.message);
      api.sendMessage("حدث خطأ أثناء جلب الصورة. يرجى المحاولة مرة أخرى.", event.threadID);
    }
  },
};
