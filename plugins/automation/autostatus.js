const { registerCommand } = require('../../lib/pluginLoader');
const config = require('../../config');

registerCommand({
  name: 'autostatus',
  alias: ['autoseen'],
  category: 'automation',
  description: 'Auto seen + react status',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const arg = ctx.q?.toLowerCase();
    if (arg === 'on') {
      config.autoReadStatus = true;
      config.autoLikeStatus = true;
      await ctx.reply('✅ *Auto-Status: ON*');
    } else if (arg === 'off') {
      config.autoReadStatus = false;
      config.autoLikeStatus = false;
      await ctx.reply('🛑 *Auto-Status: OFF*');
    } else {
      await ctx.reply(`*Auto Read:* ${config.autoReadStatus ? '✅' : '🛑'}\n*Auto React:* ${config.autoLikeStatus ? '✅' : '🛑'}\n\nUsage: *${ctx.botPrefix}autostatus on/off*`);
    }
  },
});
