const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'demote',
  alias: ['unadmin'],
  category: 'group',
  description: 'Remove admin',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const target = mentions[0] || (ctx.quotedKey?.participant || null);
    if (!target) return ctx.reply('Tag or reply to a user.');
    try {
      await sock.groupParticipantsUpdate(ctx.from, [target], 'demote');
      await ctx.reply(`✅ *Demoted:* @${target.split('@')[0]}`, { mentions: [target] });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
