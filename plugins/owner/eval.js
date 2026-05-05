// ⚡ EVAL (debug only)

const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'eval',
  alias: ['ev', '$'],
  category: 'owner',
  description: 'Execute JavaScript (debug)',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;

    if (!ctx.q) return ctx.reply('💀 _Provide code to evaluate._');

    await ctx.react('⚡');

    try {
      let result = eval(`(async () => { ${ctx.q} })()`);
      result = await Promise.resolve(result);

      const output = typeof result === 'object'
        ? JSON.stringify(result, null, 2)
        : String(result);

      await ctx.reply(`╭━━〔 *⚡ EVAL* 〕━━╮\n\n${output.slice(0, 3000)}\n\n╰━━━━━━━━━━━━━━╯`);
    } catch (err) {
      await ctx.reply(`💀 *Error:* ${err.message}`);
    }
  },
});
