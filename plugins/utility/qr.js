const { registerCommand } = require('../../lib/pluginLoader');
const QRCode = require('qrcode');

registerCommand({
  name: 'qr',
  alias: ['qrcode'],
  category: 'utility',
  description: 'Generate QR from text',
  execute: async (sock, msg, ctx) => {
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}qr <text>*`);
    await ctx.react('📱');
    try {
      const buffer = await QRCode.toBuffer(ctx.q, { width: 512, margin: 2 });
      await ctx.send({ image: buffer, caption: `📱 *QR Generated*\n\n_${ctx.q}_` });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
