const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'hidetag',
  alias: ['htag'],
  category: 'group',
  description: 'Hidden tag all',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    await ctx.react('👻');
    const members = ok.meta.participants.map(p => p.id);
    await ctx.send({ text: ctx.q || '📢 Attention!', mentions: members });
  },
});
