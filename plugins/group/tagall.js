const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'tagall',
  alias: ['mentionall'],
  category: 'group',
  description: 'Mention all members',
  execute: async (sock, msg, ctx) => {
    const ok = await ctx.requireAdmin();
    if (!ok) return;
    await ctx.react('📢');
    const meta = ok.meta;
    const members = meta.participants.map(p => p.id);
    const text = ctx.q || 'Tag all';
    let msgText = `╭━━〔 *📢 ${text}* 〕━━╮\n\n`;
    for (const id of members) {
      msgText += `• @${id.split('@')[0]}\n`;
    }
    msgText += `\n> *${ctx.botFooter}*`;
    await ctx.send({ text: msgText, mentions: members });
  },
});
