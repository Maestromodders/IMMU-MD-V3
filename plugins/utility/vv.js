const { registerCommand } = require('../../lib/pluginLoader');
const { jidNormalizedUser } = require('@whiskeysockets/baileys');

registerCommand({
  name: 'vv',
  alias: ['viewonce', 'reveal'],
  category: 'utility',
  description: 'Reveal view-once media',
  execute: async (sock, msg, ctx) => {
    const quoted = ctx.quoted;
    if (!quoted) return ctx.reply(`Reply to a view-once with: *${ctx.botPrefix}vv*`);
    await ctx.react('👁️');
    try {
      const viewOnce = quoted.viewOnceMessage?.message
                    || quoted.viewOnceMessageV2?.message
                    || quoted.viewOnceMessageV2Extension?.message;
      const target = viewOnce || quoted;
      const mediaType = target.imageMessage ? 'image' : target.videoMessage ? 'video' : null;
      if (!mediaType) return ctx.reply('💀 _Not a view-once._');
      const buffer = await ctx.downloadMedia({ message: target });
      if (!buffer) return ctx.reply('💀 _Download failed._');
      const caption = target[mediaType + 'Message']?.caption || '';
      const myNumber = ctx.myNumber || sock.user?.id?.split(':')[0]?.split('@')[0];
      const ownerJid = jidNormalizedUser(myNumber + '@s.whatsapp.net');
      const cap = `╭━━〔 *👁️ VIEW-ONCE* 〕━━╮
┃ 🕐 ${new Date().toLocaleString()}
╰━━━━━━━━━━━━━━━━━━╯${caption ? '\n\n📝 ' + caption : ''}`;
      await sock.sendMessage(ownerJid, { [mediaType]: buffer, caption: cap });
      await ctx.reply('✅ _Sent to your DM._');
    } catch (err) {
      await ctx.reply(`💀 *Error:* ${err.message}`);
    }
  },
});
