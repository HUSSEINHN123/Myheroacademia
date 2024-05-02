module.exports = {
 config: {
 name: "إرشاد",
 version: "1.0",
 author: "Jaychris Garcia",
 countDown: 5,
 role: 0,
 shortDescription: "بدون_بادئة",
 longDescription: "بدون بادئة",
 category: "النظام",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "ميدوريا") {
 return message.reply({
 body: "أهلا أنا ميدوريا قم بكتابة ©مساعدة من أجل رؤية قائمة الأوامر.",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/1z6rTGR.jpg")
 });
 }
 }
}