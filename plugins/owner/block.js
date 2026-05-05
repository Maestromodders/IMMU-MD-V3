const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'block',
  category: 'owner',
  description: 'Block user',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const target = ctx.isGroup
      ? (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || ctx.quotedKey?.participant)
      : ctx.from;
    if (!target) return ctx.reply('Tag or reply to a user.');
    try {
      await sock.updateBlockStatus(target, 'block');
      await ctx.reply(`✅ *Blocked:* @${target.split('@')[0]}`, { mentions: [target] });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});

registerCommand({
  name: 'unblock',
  category: 'owner',
  description: 'Unblock user',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;
    const target = ctx.isGroup
      ? (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || ctx.quotedKey?.participant)
      : ctx.from;
    if (!target) return ctx.reply('Tag or reply to a user.');
    try {
      await sock.updateBlockStatus(target, 'unblock');
      await ctx.reply(`✅ *Unblocked:* @${target.split('@')[0]}`, { mentions: [target] });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
