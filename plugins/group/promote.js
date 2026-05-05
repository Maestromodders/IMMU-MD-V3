const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'promote',
  alias: ['admin'],
  category: 'group',
  description: 'Make admin',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const target = mentions[0] || (ctx.quotedKey?.participant || null);
    if (!target) return ctx.reply('Tag or reply to a user.');
    try {
      await sock.groupParticipantsUpdate(ctx.from, [target], 'promote');
      await ctx.reply(`✅ *Promoted:* @${target.split('@')[0]}`, { mentions: [target] });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
