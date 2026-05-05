// ╔══════════════════════════════════════════╗
// ║     IMMU MD V3 — Royal Edition           ║
// ╚══════════════════════════════════════════╝

require('dotenv').config();

module.exports = {
  botName: process.env.BOT_NAME || "IMMU MD V3",
  botVersion: "3.0.0",

  botPic: process.env.BOT_PIC || "https://i.ibb.co/p6frQZNZ/Picsart-26-04-27-12-36-40-582.jpg",
  botFooter: "Powered by IMMU MD V3",

  newsletterJid: "120363341506278064@newsletter",
  newsletterName: "𝐈ᴍᴍυ 𝐌ᴅ",
  newsletterUrl: "https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42",

  autoFollowChannels: ["120363341506278064@newsletter"],
  autoJoinGroups: ["JQTH0GwURpjIJEzhpcFosO"],

  prefix: process.env.PREFIX || ".",
  mode: process.env.MODE || "public",
  timezone: process.env.TIME_ZONE || "Asia/Karachi",
  port: parseInt(process.env.PORT) || 8000,

  sessionId: process.env.SESSION_ID || "",
  usePairCode: process.env.USE_PAIR_CODE !== "false",
  pairNumber: process.env.PAIR_NUMBER || "",

  mongoUri: process.env.MONGO_URI || "",
  mongoDbName: "immu_md_v3",

  alwaysOnline: true,
  autoReadStatus: process.env.AUTO_READ_STATUS !== "false",
  autoLikeStatus: process.env.AUTO_LIKE_STATUS !== "false",

  statusReacts: ['🚩', '❤️', '✅', '⚠️'],

  antiDelete: process.env.ANTIDELETE !== "false",
  antiViewOnce: process.env.ANTIVIEWONCE !== "false",
  antiCall: process.env.ANTICALL === "true",

  ownerName: process.env.OWNER_NAME || "Imad",
};
