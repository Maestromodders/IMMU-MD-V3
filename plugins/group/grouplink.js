const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'grouplink',
  alias: ['glink', 'invite'],
  category: 'group',
  description: 'Get group invite link',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    await ctx.react('🔗');
    try {
      const code = await sock.groupInviteCode(ctx.from);
      await ctx.reply(`🔗 *Group Link:*\n\nhttps://chat.whatsapp.com/${code}`);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
