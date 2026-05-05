const { registerCommand } = require('../../lib/pluginLoader');
const axios = require('axios');

registerCommand({
  name: 'google',
  alias: ['g', 'gsearch'],
  category: 'search',
  description: 'Google search',
  execute: async (sock, msg, ctx) => {
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}google <query>*`);
    await ctx.react('🔍');
    try {
      const { data } = await axios.get('https://api.duckduckgo.com/', {
        params: { q: ctx.q, format: 'json', no_html: 1 },
        timeout: 10000,
      });
      let text = `╭━━〔 *🔍 ${ctx.q}* 〕━━╮\n\n`;
      if (data.AbstractText) text += `${data.AbstractText}\n\n`;
      if (data.RelatedTopics?.length) {
        text += `*Related:*\n`;
        for (let i = 0; i < Math.min(5, data.RelatedTopics.length); i++) {
          const t = data.RelatedTopics[i];
          if (t.Text) text += `• ${t.Text.substring(0, 100)}\n`;
        }
      }
      if (!data.AbstractText && !data.RelatedTopics?.length) {
        text += `_No results found._`;
      }
      text += `\n> *${ctx.botFooter}*`;
      await ctx.reply(text);
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
