const fs = require("fs-extra");

module.exports = {
	config: {
		name: "أحصل_على_الملفات",
		aliases: ["getstate", "getcookie"],
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Lấy fbstate hiện tại",
			en: "أحصل هلى الملفات الحالية"
		},
		longDescription: {
			vi: "Lấy fbstate hiện tại",
			en: "قم بالحصول على الملفات الحالية"
		},
		category: "المالك",
		guide: {
			en: "   {pn}: ستحصل على الملفات على الفور (appState)\n"
				+ "   {pn} [cookies|كوكيز|c]: قم بالحصول على الملفات على شكل كوكيز"
				+ "   {pn} [البدأ|str|s]: قم بالحصول على الملفات\n",
			vi: "   {pn}: قم بالحصول على الملفات (appState)\n"
				+ "   {pn} [cookies|cookie|c]: get fbstate dạng cookies\n"
				+ "   {pn} [string|str|s]: get fbstate dạng string\n"
		}
	},

	langs: {
		vi: {
			success: "Đã gửi fbstate đến bạn, vui lòng kiểm tra tin nhắn riêng của bot"
		},
		en: {
			success: "لقد أرسلت الملفات في الخاص لأن ذالك سري للعاية و مهم"
		}
	},

	onStart: async function ({ message, api, event, args, getLang }) {
		let fbstate;
		let fileName;

		if (["cookie", "كوكيز", "c"].includes(args[0])) {
			fbstate = JSON.stringify(api.getAppState().map(e => ({
				name: e.key,
				value: e.value
			})), null, 2);
			fileName = "cookies.json";
		}
		else if (["خيط", "str", "s"].includes(args[0])) {
			fbstate = api.getAppState().map(e => `${e.key}=${e.value}`).join("; ");
			fileName = "cookiesString.txt";
		}
		else {
			fbstate = JSON.stringify(api.getAppState(), null, 2);
			fileName = "appState.json";
		}

		const pathSave = `${__dirname}/tmp/${fileName}`;
		fs.writeFileSync(pathSave, fbstate);

		if (event.senderID != event.threadID)
			message.reply(getLang("success"));

		api.sendMessage({
			body: fbstate,
			attachment: fs.createReadStream(pathSave)
		}, event.senderID, () => fs.unlinkSync(pathSave));
	}
};