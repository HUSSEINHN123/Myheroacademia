const fs = require('fs');

function l() {
  try {
    const d = fs.readFileSync("admin.json", "utf8");
    return JSON.parse(d);
  } catch (e) {
    return {};
  }
}

function s(s) {
  fs.writeFileSync("admin.json", JSON.stringify(s, null, 2));
}

let a = l();

module.exports = {
  config: {
    name: "مضاد_الآدمن",
    version: "1.0",
    author: "Kshitiz",
    countDown: 5,
    role: 1,
    shortDescription: "",
    longDescription: "anti gc admin: إذا قام شخص ما بإزالتك من المشرف، فسيقوم الروبوت بإضافتك مرة أخرى كمسؤول. إذا تمت إزالة الروبوت من المشرف، moye moye.",
    category: "المجموعة",
    guide: "{pn} إيقافةأو تشغيل في الوقت الحالي دائما شغال",
  },

  onStart: async function({ message, event, threadsData, args }) {
    if (args[0] === "إيقاف") {
      a[event.threadID] = 'off';
      s(a);
      return message.reply(`✅`);
    } else if (args[0] === "تشغيل") {
      delete a[event.threadID];
      s(a);
      return message.reply(`❌`);
    } else {
      return message.reply(`كيفية الإستخدام : {pn} إيقاف لإيقاف الميزة`);
    }
  },

  onEvent: async function({ api, event, threadsData }) {
    if (a[event.threadID] === 'off' || !event.logMessageData || event.logMessageData.ADMIN_EVENT !== "remove_admin") {
      return;
    }

    const d = event.threadID;
    const f = event.logMessageData.TARGET_ID;
    const g = event.author;

    try {
      if (g !== api.getCurrentUserID() && f !== api.getCurrentUserID()) {
        await api.changeAdminStatus(d, f, true);
        await api.changeAdminStatus(d, g, false);
      }
    } catch (h) {
      console.error("Error", h);
    }
  }
};