const { registerCommand } = require('../../lib/pluginLoader');
const axios = require('axios');

registerCommand({
  name: 'wiki',
  alias: ['wikipedia'],
  category: 'search',
  description: 'Wikipedia search',
  execute: async (sock, msg, ctx) => {
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}wiki <topic>*`);
    await ctx.react('📚');
    try {
      const { data } = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.q)}`,
        { timeout: 10000 }
      );
      const text = `╭━━〔 *📚 ${data.title}* 〕━━╮

${data.extract}

🔗 ${data.content_urls?.desktop?.page || ''}

> *${ctx.botFooter}*`;

      if (data.thumbnail?.source) {
        await ctx.send({ image: { url: data.thumbnail.source }, caption: text });
      } else {
        await ctx.reply(text);
      }
    } catch (err) {
      await ctx.reply('💀 _Article not found._');
    }
  },
});
