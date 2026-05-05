// 🔄 TAKE STICKER (re-pack)

const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'take',
  alias: ['repack'],
  category: 'converter',
  description: 'Re-pack a sticker',
  execute: async (sock, msg, ctx) => {
    const quoted = ctx.quoted;
    if (!quoted?.stickerMessage) {
      return ctx.reply(`╭━━〔 *🔄 TAKE* 〕━━╮
┃
┃ Reply to a sticker:
┃ ⌁ ${ctx.botPrefix}take
┃
╰━━━━━━━━━━━━━━━━╯`);
    }

    await ctx.react('🔄');

    try {
      const buffer = await ctx.downloadMedia({ message: quoted });
      if (!buffer) return ctx.reply('💀 _Download failed._');

      await ctx.send({ sticker: buffer });
    } catch (err) {
      await ctx.reply(`💀 *Error:* ${err.message}`);
    }
  },
});
