const axios = require("axios");

module.exports = {
  config: {
    name: 'شات2',
    aliases: ["simma"],
    version: '2.0',
    author: 'RUBISH',
    countDown: 0,
    role: 0,
    shortDescription: 'دردشة مع سيما',
    longDescription: {
      vi: 'Chat with simma',
      en: 'قم بالدردشة مع سيما'
    },
    category: 'دردشة',
    guide: {
      vi: '   {pn} [on | off]: bật/tắt simsimi'
        + '\n'
        + '\n   {pn} teach <question> - <response>: dạy Simma'
        + '\n   Ví dụ:\n    {pn} teach ai là người đẹp trai nhất?',
      en: '   {pn} [تشغيل | ايقاف]: قم بتشغيل سيما عن كريق إستخدام تشغيا/إيقاف'
        + '\n'
        + '\n   {pn} تعليم <سؤالك> - <إجابة سيم>: قم بتعليم سيما'
        + '\n   مثال:\n    {pn}  من هو أوسم رجل في العالم ؟',
    }
  },

  onStart: async function ({ args, threadsData, message, event, getLang }) {
    if (args[0] == 'تشغيل' || args[0] == 'إيقاف') {
      await threadsData.set(event.threadID, args[0] == "on", "settings.simma");
      return message.reply(args[0] == "تشغيل" ? 'تم تشغيل الدردشة مع سيما بنجاح ✅' : 'تم إيقاف تشغيل الدردشة مه سيما ❌');
    } else if (args[0] === 'تعليم') {
      args.shift();
      const content = args.join(' ').trim();
      const [ask, ans] = content.split('-').map(item => item.trim());

      if (!ask || !ans) {
        return message.reply('يجب أن يكون الجواب و السؤال مفرقان بهذه العلامة " - ".');
      }

      try {
        const simmateachResponse = await axios.get(`https://simma.rubish-api.repl.co/teach?query=${encodeURIComponent(ask)}&response=${encodeURIComponent(ans)}`);

        if (simmateachResponse.status === 200) {
          const simmaresponseMessage = simmateachResponse.data.message || "Successfully taught simma.";
          return message.reply(simmaresponseMessage);
        } else {
          const errorMessage = simmateachResponse.data.error || "لم أستطع تعام هذا أرحوك حاول مجددا لاحقا.";
          return message.reply(errorMessage);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء التعليم', error.message);
        return message.reply("لم أستطع تعلم ذلك. الرجاء معاودة المحاولة في وقت لاحق.");
      }
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const simmaresponseMessage = await getMessage(yourMessage);
        return message.reply(`${simmaresponseMessage}`);
      } catch (err) {
        console.log(err);
        return message.reply("لا أعرف ماذا تقول . \n\nأرجوك علمني✏️");
      }
    }
  },

  onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simma"))) {
      try {
        const simmaresponseMessage = await getMessage(args.join(" "));
        return message.reply(`${simmaresponseMessage}`);
      } catch (err) {
        return message.reply("لا أعرف ماذا تقول . \n\nأرجوك علمني✏️");
      }
    }
  },
};

async function getMessage(yourMessage) {
  const res = await axios.get(`https://simma.rubish-api.repl.co/chat?query=${encodeURIComponent(yourMessage)}`);

  if (res.status !== 200) throw new Error('Request failed');

  return res.data.response || 'لا رد من سيما';
        }