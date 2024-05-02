const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "مطلوب2",
    version: "1.1",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: "صورة شحص مطلوب",
    longDescription: "صور شخص مطلوب",
    category: "متعة",
    guide: {
      en: "{pn} @تاغ"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn nhấn tay vào trán"
    },
    en: {
      noTag: "أنت تحتاج أن تعمل تاغ للشخص اللذي تريد أن يكون مطلوبا"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Wanted().getImage(avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid2}_Wanted.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `${(content || "أنت مطلوب الآن المارينز الآن يبحثون عنك!")} خارج عن القانون`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};