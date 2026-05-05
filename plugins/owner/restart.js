const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'restart',
  alias: ['reboot'],
  category: 'owner',
  description: 'Restart bot',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    await ctx.react('🔄');
    await ctx.reply('🔄 *Restarting...*');
    setTimeout(() => process.exit(0), 1500);
  },
});
