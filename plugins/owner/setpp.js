const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'setpp',
  alias: ['setdp', 'setprofile'],
  category: 'owner',
  description: 'Set bot profile picture',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    if (!ctx.quoted?.imageMessage) return ctx.reply(`Reply to an image with: *${ctx.botPrefix}setpp*`);
    await ctx.react('🖼️');
    try {
      const buffer = await ctx.downloadMedia({ message: ctx.quoted });
      if (!buffer) return ctx.reply('💀 _Download failed._');
      await sock.updateProfilePicture(sock.user.id, buffer);
      await ctx.reply('✅ *Profile picture updated.*');
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
