// 📨 Message Handler

const config = require('../config');
const { getCommand } = require('./pluginLoader');
const {
  getMessageContent,
  getQuotedMessage,
  getQuotedKey,
  downloadMedia,
  forwardedContext,
} = require('./helpers');

async function handleMessage(sock, msg) {
  try {
    if (!msg.message) return;
    if (msg.key.remoteJid === 'status@broadcast') return;

    const text = getMessageContent(msg);
    if (!text || !text.startsWith(config.prefix)) return;

    const args = text.slice(config.prefix.length).trim().split(/\s+/);
    const cmdName = args.shift().toLowerCase();
    const q = args.join(' ');

    const command = getCommand(cmdName);
    if (!command) return;

    const sender = msg.key.participant || msg.key.remoteJid;
    const senderNumber = sender.split('@')[0].split(':')[0];
    const isGroup = msg.key.remoteJid.endsWith('@g.us');

    const myNumber = sock.user?.id?.split(':')[0]?.split('@')[0];
    const isOwner = senderNumber === myNumber || msg.key.fromMe;
    const pushName = msg.pushName || 'User';

    if (config.mode === 'private' && !isOwner) return;

    const ctx = {
      msg, sock,
      from: msg.key.remoteJid,
      sender, senderNumber, pushName,
      isGroup, isOwner,
      myNumber,
      q, args, text, cmdName,

      reply: async (content, options = {}) => {
        if (typeof content === 'string') {
          return await sock.sendMessage(msg.key.remoteJid, { text: content, ...options }, { quoted: msg });
        }
        return await sock.sendMessage(msg.key.remoteJid, content, { quoted: msg });
      },

      send: async (content) => {
        if (typeof content === 'string') return await sock.sendMessage(msg.key.remoteJid, { text: content });
        return await sock.sendMessage(msg.key.remoteJid, content);
      },

      react: async (emoji) => {
        try {
          await sock.sendMessage(msg.key.remoteJid, { react: { text: emoji, key: msg.key } });
        } catch (_) {}
      },

      quoted: getQuotedMessage(msg),
      quotedKey: getQuotedKey(msg),
      downloadMedia,
      newsletterContext: forwardedContext(config),

      botName: config.botName,
      botPic: config.botPic,
      botFooter: config.botFooter,
      botPrefix: config.prefix,
      ownerNumber: myNumber,
      ownerName: config.ownerName,
      newsletterJid: config.newsletterJid,
      newsletterName: config.newsletterName,
      newsletterUrl: config.newsletterUrl,

      requireOwner: () => {
        if (!isOwner) {
          ctx.reply('🚫 *Owner only.*');
          return false;
        }
        return true;
      },

      requireAdmin: async () => {
        if (!isGroup) {
          ctx.reply('⚠️ *Group only command.*');
          return false;
        }
        try {
          const meta = await sock.groupMetadata(msg.key.remoteJid);
          const me = meta.participants.find(p => p.id === sock.user.id);
          const sender_p = meta.participants.find(p => p.id === sender);
          const meAdmin = me?.admin === 'admin' || me?.admin === 'superadmin';
          const senderAdmin = sender_p?.admin === 'admin' || sender_p?.admin === 'superadmin';

          if (!meAdmin) {
            ctx.reply('⚠️ _I need to be admin._');
            return false;
          }
          if (!senderAdmin && !isOwner) {
            ctx.reply('⚠️ _Admins only._');
            return false;
          }
          return { meta, me, senderAdmin };
        } catch (err) {
          ctx.reply(`⚠️ ${err.message}`);
          return false;
        }
      },
    };

    try {
      await command.execute(sock, msg, ctx);
    } catch (err) {
      console.log(`  ❌ ${cmdName}: ${err.message}`);
      try { await ctx.reply(`⚠️ *Error:* ${err.message}`); } catch (_) {}
    }
  } catch (err) {
    console.log(`  ❌ Handler: ${err.message}`);
  }
}

module.exports = { handleMessage };
