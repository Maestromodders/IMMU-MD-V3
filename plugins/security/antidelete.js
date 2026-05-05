const { registerCommand } = require('../../lib/pluginLoader');
const config = require('../../config');

registerCommand({
  name: 'antidelete',
  alias: ['antidel'],
  category: 'security',
  description: 'Toggle anti-delete',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const arg = ctx.q?.toLowerCase();
    if (arg === 'on') {
      config.antiDelete = true;
      await ctx.reply('✅ *Anti-Delete: ON*');
    } else if (arg === 'off') {
      config.antiDelete = false;
      await ctx.reply('🛑 *Anti-Delete: OFF*');
    } else {
      await ctx.reply(`*Anti-Delete:* ${config.antiDelete ? 'ON ✅' : 'OFF 🛑'}\n\nUsage: *${ctx.botPrefix}antidelete on/off*`);
    }
  },
});
