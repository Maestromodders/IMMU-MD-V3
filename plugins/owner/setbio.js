const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'setbio',
  alias: ['setstatus'],
  category: 'owner',
  description: 'Set bot bio',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}setbio <text>*`);
    await ctx.react('📝');
    try {
      await sock.updateProfileStatus(ctx.q);
      await ctx.reply(`✅ *Bio updated:*\n\n${ctx.q}`);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
