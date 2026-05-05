const { registerCommand } = require('../../lib/pluginLoader');
const config = require('../../config');

registerCommand({
  name: 'autoreact',
  alias: ['statusreact'],
  category: 'automation',
  description: 'Auto react on status',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const arg = ctx.q?.toLowerCase();
    if (arg === 'on') {
      config.autoLikeStatus = true;
      await ctx.reply('✅ *Auto React: ON*');
    } else if (arg === 'off') {
      config.autoLikeStatus = false;
      await ctx.reply('🛑 *Auto React: OFF*');
    } else {
      await ctx.reply(`*Auto React:* ${config.autoLikeStatus ? 'ON ✅' : 'OFF 🛑'}\n\nUsage: *${ctx.botPrefix}autoreact on/off*`);
    }
  },
});
