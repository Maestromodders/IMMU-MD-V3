// ╔══════════════════════════════════════════╗
// ║     IMMU MD V3 — Royal Edition           ║
// ╚══════════════════════════════════════════╝

require('dotenv').config();

module.exports = {
  botName: process.env.BOT_NAME || "CYBERPUNKBULLY",
  botVersion: "1.0.0",

  botPic: process.env.BOT_PIC || "https://files.catbox.moe/pvc7d6.jpg",
  botFooter: "Powered by CYBERPUNKBULLY",

  newsletterJid: "120363404552894723@newsletter",
  newsletterName: "CYBERPUNKBULLY",
  newsletterUrl: "https://whatsapp.com/channel/0029Vb6jxRD7IUYbQfokIu2s",

  autoFollowChannels: ["120363404552894723@newsletter"],
  autoJoinGroups: ["EjvJRIKwQsAGm3WcZzrKIk"],

  prefix: process.env.PREFIX || ".",
  mode: process.env.MODE || "public",
  timezone: process.env.TIME_ZONE || "Africa/Nairobi",
  port: parseInt(process.env.PORT) || 8000,

  sessionId: process.env.SESSION_ID || "",
  usePairCode: process.env.USE_PAIR_CODE !== "true",
  pairNumber: process.env.PAIR_NUMBER || "254788409105",

  mongoUri: process.env.MONGO_URI || "mongodb+srv://Smzm:<db_password>@cluster0.4f2o3if.mongodb.net/?appName=Cluster0",
  mongoDbName: "immu_md_v3",

  alwaysOnline: true,
  autoReadStatus: process.env.AUTO_READ_STATUS !== "true",
  autoLikeStatus: process.env.AUTO_LIKE_STATUS !== "truee",

  statusReacts: ['🚩', '❤️', '✅', '⚠️'],

  antiDelete: process.env.ANTIDELETE !== "false",
  antiViewOnce: process.env.ANTIVIEWONCE !== "false",
  antiCall: process.env.ANTICALL === "true",

  ownerName: process.env.OWNER_NAME || "Imad",
};
