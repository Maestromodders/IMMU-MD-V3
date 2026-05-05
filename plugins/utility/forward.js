const { registerCommand } = require('../../lib/pluginLoader');
const { jidNormalizedUser } = require('@whiskeysockets/baileys');

registerCommand({
  name: 'forward',
  alias: ['fw'],
  category: 'utility',
  description: 'Forward replied msg to a number',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    if (!ctx.quoted) return ctx.reply(`Reply to a message + number\nUsage: *${ctx.botPrefix}forward 923001234567*`);
    if (!ctx.q) return ctx.reply('Please provide target number.');
    const num = ctx.q.replace(/[^0-9]/g, '');
    if (num.length < 10) return ctx.reply('Invalid number.');
    await ctx.react('📤');
    try {
      const target = jidNormalizedUser(num + '@s.whatsapp.net');
      const m = ctx.quoted;
      const type = m.imageMessage ? 'image' : m.videoMessage ? 'video' : m.audioMessage ? 'audio' : m.stickerMessage ? 'sticker' : m.documentMessage ? 'document' : null;
      if (type) {
        const buffer = await ctx.downloadMedia({ message: ctx.quoted });
        if (type === 'audio') await sock.sendMessage(target, { audio: buffer, mimetype: 'audio/mp4' });
        else if (type === 'sticker') await sock.sendMessage(target, { sticker: buffer });
        else if (type === 'document') await sock.sendMessage(target, { document: buffer, mimetype: m.documentMessage.mimetype, fileName: m.documentMessage.fileName });
        else await sock.sendMessage(target, { [type]: buffer, caption: m[type + 'Message']?.caption || '' });
      } else if (m.conversation || m.extendedTextMessage?.text) {
        await sock.sendMessage(target, { text: m.conversation || m.extendedTextMessage.text });
      }
      await ctx.reply(`✅ *Forwarded to:* +${num}`);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
