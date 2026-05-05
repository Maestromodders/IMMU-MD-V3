const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'groupinfo',
  alias: ['ginfo'],
  category: 'group',
  description: 'Group details',
  execute: async (sock, msg, ctx) => {
    if (!ctx.isGroup) return ctx.reply('⚠️ _Group only._');
    await ctx.react('ℹ️');
    try {
      const meta = await sock.groupMetadata(ctx.from);
      const admins = meta.participants.filter(p => p.admin).length;
      const text = `╭━━〔 *👥 GROUP INFO* 〕━━╮
┃
┃ 📛 Name      ➤ ${meta.subject}
┃ 👥 Members   ➤ ${meta.participants.length}
┃ 👑 Admins    ➤ ${admins}
┃ 🆔 ID        ➤ ${meta.id}
┃ 📅 Created   ➤ ${new Date(meta.creation * 1000).toLocaleDateString()}
┃ 📝 About     ➤ ${meta.desc || 'No description'}
┃
╰━━━━━━━━━━━━━━━━╯

> *${ctx.botFooter}*`;
      await ctx.reply(text);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
