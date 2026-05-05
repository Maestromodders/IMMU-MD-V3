const { registerCommand } = require('../../lib/pluginLoader');
const config = require('../../config');

registerCommand({
  name: 'antiviewonce',
  alias: ['antivv'],
  category: 'security',
  description: 'Toggle anti view-once',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const arg = ctx.q?.toLowerCase();
    if (arg === 'on') {
      config.antiViewOnce = true;
      await ctx.reply('✅ *Anti View-Once: ON*\n_Use ${ctx.botPrefix}vv to reveal._');
    } else if (arg === 'off') {
      config.antiViewOnce = false;
      await ctx.reply('🛑 *Anti View-Once: OFF*');
    } else {
      await ctx.reply(`*Anti View-Once:* ${config.antiViewOnce ? 'ON ✅' : 'OFF 🛑'}\n\nUsage: *${ctx.botPrefix}antiviewonce on/off*`);
    }
  },
});
