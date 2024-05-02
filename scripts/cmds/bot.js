module.exports = {
config: {
name: "بوت",
version: "2.0.0",
author: "Haru",
cooldown: 5,
role: 0,
shortDescription: "الرد التلقائي مع ردود الفعل والردود",
longDescription: "الرد التلقائي مع ردود الفعل والردود بناءً على كلمات أو مشغلات محددة.",
category: "النظام",
guide: "©بوت",
},
onStart: async ({ api, event }) => {
// Blank onStart function as per the request
},
onChat: async ({ api, event }) => {
const { body, messageID, threadID } = event;

// Reactions based on words
const emojis = {
"💜": ["السلام عليكم ", "دوم", "كيفكم", "الحمدلله", "يعقوبي", "حسين", "سلام", "ميدوريا"],
"💚": ["وعليكم السلام", "ماذا عنك", "شباب", "رفاق", "كيف حالك", "كيغ حالكي", "يب"],
"😾": ["ملل", "حزين", "حزن", "حزن2"],
"😼": ["اللعنة", "تبا", "النية", "نية", "كلب ", "أصنام", "أصدقاء ", "ممم", "🐸"],
"😸": ["مضحك", "هههه", "نكتة", "قطة", "أنا", "من"],
"⏱️": ["تخيل", "أرسم", "تخيل2", "أرسم2"],
"👋": ["هاي ", "مرحبا", "سلام","كيفكم","هلا"," السلام عليكم","👋","مساء الخير","صباح الخير"],
"🔥": ["🔥", "نار", "ممتع", "متحمس"],"💩":["خرا","لوسي","سيستا","شيت","shit"],"🤢":["مزعج",
      "مريع",
      "يثير الإشمئزاز",
      "horrible"
    ],"🌸": [
      "حب",
      "اخي",
      "جميل",
      "رائع",
      "مدهش",
      "أحبك",
      "كيف حالك أخي",
      "اليوم",
      "البارحة",
      "المساء"
    ],
    "😂": [
      "😂",
      "🤣",
      "🤣",
      "😭",
      "🙂",
      "Drôle",
      "Amusant",
      "Hilarant",
      "Loufoque",
      "Bouffonnerie",
      "Cocasse",
      "Burlesque",
      "Rigolo",
      "Absurde",
      "Irrévérencieux",
      "Ironique",
      "Ironie",
      "Parodie",
      "Esprit",
      "Facétieux"
    ],
    "😎": [
      "رائع","مدهش"," 😎"
    ],
    "⚡": [
      "خارق",
      "مدهش"
    ],
    "🤖": [
      "Prefix","بوت","Prefix"
    ],
    "😘": [
     "siesta","uwu", "©أولاد","©كلب"
    ],
    "✔️": [
      "حسنا",
      "تمام"
    ],
    "🎉": [
      "تهانينا",
      "مبروك",
      "أنا سعيد من أجلك"
    ],
    "📑": [
      "©مساعدة","©أوامر"," وثائق","أوراق","أحسب"
    ],
    "♻️": [
      "إعادة_التشغيل","إطفاء"
    ],
    "🖕": [
      "تبا","فاك","fdp","🖕"
    ],
    "🔖": [
      "cmd","command"
    ],
    "😑": [
      "مممم",
      "ماذا","كيف"
    ],
    "💍": [
      "زواج","تطقيم"
    ],
    "💵": [
      "بنك","بنك2","هدية","رهان"
    ],
    "🥰": [
      "كيوت"
    ],
    "✨": [
      "نعم","لا"
    ],
    "✖️": [
      "خطأ",
      "ليس"
    ],
    "🎮": [
      "الألعاب","لعبة","فري فاير","بابجي"
    ],
    "🤡": [
      "هل تمزح معي","عنصري"," sanchokuin","bakugo"
    ],
  "❓": [
    "الأمر الذي تستخدمه غير موجود, أكتب ©مساعدة لرؤية كافة الأوامر المتاحة"
  ],
    "😕": [
      "أخي"
    ],
    "👎": [
      "فاشل"
    ],
    "🌩️": [
      "الشتاء",
      "شتاء",
      "بارد"
    ],
  "😈": [
    "شيطان","شرير","evil","suprem","sadique"
  ],
  "🤢": [
      "سأتقيأ"
    ],
  "🔪": [
      "سأقتلك"
    ],
};

// Replies to specific words
const replies = {"🌷🌷🌷":"~~نعم ?? 🙃🌷"
};

// React based on words
for (const [emoji, words] of Object.entries(emojis)) {
for (const word of words) {
if (body.toLowerCase().includes(word)) {
api.setMessageReaction(emoji, messageID, () => {}, true);
}
}
}

// Reply based on triggers
for (const [trigger, reply] of Object.entries(replies)) {
if (body.toLowerCase().includes(trigger)) {
api.sendMessage(reply, threadID, messageID);
}
}
},
};