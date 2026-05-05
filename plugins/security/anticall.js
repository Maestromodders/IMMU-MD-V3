const { registerCommand } = require('../../lib/pluginLoader');
const config = require('../../config');

registerCommand({
  name: 'anticall',
  alias: ['rejectcall'],
  category: 'security',
  description: 'Auto-reject calls',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const arg = ctx.q?.toLowerCase();
    if (arg === 'on') {
      config.antiCall = true;
      await ctx.reply('✅ *Anti-Call: ON* — calls will be rejected.');
    } else if (arg === 'off') {
      config.antiCall = false;
      await ctx.reply('🛑 *Anti-Call: OFF*');
    } else {
      await ctx.reply(`*Anti-Call:* ${config.antiCall ? 'ON ✅' : 'OFF 🛑'}\n\nUsage: *${ctx.botPrefix}anticall on/off*`);
    }
  },
});
