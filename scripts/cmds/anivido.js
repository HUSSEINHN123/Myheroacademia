module.exports = {
  config: {
    name: "مقطع_أنمي",
    aliases: ["أنمي_فيديو", "animeedit"],
    version: "1.0",
    author: "KSHITIZ",
    countDown: 10,
    role: 0,
    shortDescription: "مجموعة من فيديوهات الأنمي",
    longDescription: "سوف يرسل لك مختلف الصور للأنمي",
    category: "أنمي",
    guide: "{pn} مقطع_أنمي",
  },

  onStart: async function ({ api, event }) {
    const sentMessage = await api.sendMessage("✅ يتم تحميل الآن مقطع من الأنمي\nإنتظر من فضلك...!", event.threadID);
    const link = [
      "https://drive.google.com/uc?export=download&id=1cyB6E3z4-_Dr4mlYFB87DlWkUlC_KvrR",
      "https://drive.google.com/uc?export=download&id=1Q5L8SGKYpNrXtJ6mffcwMA9bcUtegtga",
      "https://drive.google.com/uc?export=download&id=1u8JzKCTubRhnh0APo2mMob-mQM0CoNYj",
      "https://drive.google.com/uc?export=download&id=1JBIo966g0MmUT27S1yc0B06lASt4dD9V",
      "https://drive.google.com/uc?export=download&id=1w_HUyAFHnVfkUl8XLY01pxs8dnmQNEVn",
      "https://drive.google.com/uc?export=download&id=1EoeMITZrSNB1PpPjsh5cmsFzbjMZKH2c",
      "https://drive.google.com/uc?export=download&id=1Kh4qvle57FlMjcam-JNxTQtPZe2uxrJ8",
      "https://drive.google.com/uc?export=download&id=1KtyLzqbyJpq5_ke0Cb6gD89ZNf0NQm0t",
      "https://drive.google.com/uc?export=download&id=1vy0ZldnlTqXgwJ36HxOXC9hLObgNkTZ-",
      "https://drive.google.com/uc?export=download&id=1hPZhzKm_uj6HRsEdFAH1lPFFF8vC-lTB",
      "https://drive.google.com/uc?export=download&id=1AJCeDc-MvtvSspz7oX98ywzDB3Z29bSu",
      "https://drive.google.com/uc?export=download&id=1reVD_c5kK29iTdLAu_7sYFBB0hzrRkAx",
      "https://drive.google.com/uc?export=download&id=1vmnlCwp40mmjW6aFob_wD_U1PmOgRYst",
      "https://drive.google.com/uc?export=download&id=1R0n8HQgMEEAlaL6YJ3JiDs_6oBdsjN0e",
      "https://drive.google.com/uc?export=download&id=1tUJEum_tf79gj9420mHx-_q7f0QP27DC",
      "https://drive.google.com/uc?export=download&id=1hAKRt-oOSNnUNYjDQG-OF-tdzN_qJFoR",
      "https://drive.google.com/uc?export=download&id=1HrvT5jaPsPi66seHCLBkRbTziXJUkntn",
      "https://drive.google.com/uc?export=download&id=1v8k2YxBme5zEumlNiLIry5SDMryfkBts",
      "https://drive.google.com/uc?export=download&id=1x01XDJoJMbtUjWztomF25Ne1Up4cWQoC",
      "https://drive.google.com/uc?export=download&id=12j65dstfkMUHMSmQU8FnZi2RyHPHJipx",
      "https://drive.google.com/uc?export=download&id=13ImpZl3aLHpwlYhWvjKLfiRvFsK3kl5z",
      "https://drive.google.com/uc?export=download&id=1EdFmtprVtt652PDocRlgeXXxIQRYTSQw",
      "https://drive.google.com/uc?export=download&id=1EdFmtprVtt652PDocRlgeXXxIQRYTSQw",
      "https://drive.google.com/uc?export=download&id=1QdLGspkvM-Gf1SHh2fJf8zPbrZaURTJs",
      "https://drive.google.com/uc?export=download&id=1RyG2Lh1cp6lq9IEIr4vVaDyu21RW_pav",
      "https://drive.google.com/uc?export=download&id=1zlmaoBVrk9GKPZ_2XYZzzQkFMdiszSzL",
      "https://drive.google.com/uc?export=download&id=1rcxnb5U4gnwSiZhOcsbahqzE003LKYXc",
      "https://drive.google.com/uc?export=download&id=12cjBYkdDR4BMKj1H4aV6rfa7sVuoU3eU",
      "https://drive.google.com/uc?export=download&id=1aBHnJ7AgkQKC9RBIycVN-l6F4kdeX3hf",
      "https://drive.google.com/uc?export=download&id=13X4yhx9Nr8tIleXtxC7bV1Rfjt1FXeDv",
      "https://drive.google.com/uc?export=download&id=1uuajuhhLPlLXlSRBdzmwGfIMAV6WwW5u",
      "https://drive.google.com/uc?export=download&id=1wkoC5kbo4GuDEqoEXoz40DwZi6OMKiSI",
      // Add more video links here
    ];

    const randomIndex = Math.floor(Math.random() * link.length);
    const randomVideo = link[randomIndex];

    await api.sendMessage({
      body: 'إستمتع..!🤍',
      attachment: await global.utils.getStreamFromURL(randomVideo),
    }, event.threadID);

    
    setTimeout(() => {
      api.unsendMessage(sentMessage.messageID);
    }, 10000); 
  },
};