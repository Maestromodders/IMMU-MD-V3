const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'calc',
  alias: ['calculate', 'math'],
  category: 'utility',
  description: 'Calculator',
  execute: async (sock, msg, ctx) => {
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}calc 5+3*7*`);
    await ctx.react('🧮');
    try {
      const expr = ctx.q.replace(/[^0-9+\-*/().\s]/g, '');
      if (!expr) return ctx.reply('Invalid expression.');
      const result = Function(`"use strict"; return (${expr})`)();
      await ctx.reply(`╭━━〔 *🧮 CALC* 〕━━╮
┃
┃ Expr   : *${expr}*
┃ Result : *${result}*
┃
╰━━━━━━━━━━━━━━━━╯`);
    } catch (err) {
      await ctx.reply(`💀 Invalid expression`);
    }
  },
});
