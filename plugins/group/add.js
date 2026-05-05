const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'add',
  alias: ['invite'],
  category: 'group',
  description: 'Add member',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}add 923001234567*`);
    const num = ctx.q.replace(/[^0-9]/g, '');
    if (num.length < 10) return ctx.reply('Invalid number.');
    try {
      await sock.groupParticipantsUpdate(ctx.from, [num + '@s.whatsapp.net'], 'add');
      await ctx.reply(`✅ *Added:* +${num}`);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
