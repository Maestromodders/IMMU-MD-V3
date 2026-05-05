const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'owner',
  alias: ['creator', 'dev'],
  category: 'general',
  description: 'Owner contact',
  execute: async (sock, msg, ctx) => {
    await ctx.react('👑');

    const ownerNumber = ctx.ownerNumber || '923493114170';
    const ownerName = ctx.ownerName || 'Mafia Imad';

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
ORG:IMMU MD V3;
TEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}
END:VCARD`;

    await ctx.send({
      contacts: {
        displayName: ownerName,
        contacts: [{ vcard }],
      },
    });

    await ctx.reply(`╭━━〔 *👑 OWNER* 〕━━╮
┃
┃ 👤 Name   : ${ownerName}
┃ 📞 Number : +${ownerNumber}
┃
╰━━━━━━━━━━━━━━━━╯

> *${ctx.botFooter}*`);
  },
});
