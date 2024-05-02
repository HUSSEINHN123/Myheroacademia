module.exports = {
	config: {
		name: "checkwarn",
		version: "1.3",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			warn: "Thành viên %1 đã bị cảnh cáo đủ 3 lần trước đó và bị ban khỏi box chat\n- Name: %1\n- Uid: %2\n- Để gỡ ban vui lòng sử dụng lệnh \"%3warn unban <uid>\" (với uid là uid của người muốn gỡ ban)",
			needPermission: "Bot cần quyền quản trị viên để kick thành viên bị ban"
		},
		en: {
			warn: " ⚠️ |عضو %1 لقد تم تحذيره 3 مرات من قبل وتم حظره من المجموعة\n- الإسم: %1\n- آيدي: %2\n- لإلغاء الحظر، يرجى إستخدم \"%3حظر إلغاء_الحظر <آيدي>\" الشخص (مع الآسدي هو صاحب الآيدي الذي تريد أن تلغي الحظر عنه)",
			needPermission: " ⚠️ |يحتاج البوت إلى إذن المسؤول قم بدعوة البوت كمسؤول في المجموعة لطرد الأعضاء المحظورين"
		}
	},

	onStart: async ({ threadsData, message, event, api, client, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const { threadID } = event;
				const { data } = await threadsData.get(event.threadID);
				const { warn: warnList } = data;
				if (!warnList)
					return;
				const { addedParticipants } = event.logMessageData;
				for (const user of addedParticipants) {
					const findUser = warnList.find(user => user.userID == user.userID);
					if (findUser && findUser.list >= 3) {
						const userName = user.fullName;
						const uid = user.userFbId;
						message.send({
							body: getLang("warn", userName, uid, client.getPrefix(threadID)),
							mentions: [{
								tag: userName,
								id: uid
							}]
						}, function () {
							api.removeUserFromGroup(uid, threadID, (err) => {
								if (err)
									return message.send(getLang("needPermission"));
							});
						});
					}
				}
			};
	}
};