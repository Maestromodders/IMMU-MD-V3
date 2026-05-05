// 📢 BROADCAST

const { registerCommand } = require('../../lib/pluginLoader');

registerCommand({
  name: 'broadcast',
  alias: ['bc'],
  category: 'owner',
  description: 'Broadcast message to all groups',
  execute: async (sock, msg, ctx) => {
    if (!ctx.requireOwner()) return;

    if (!ctx.q) {
      return ctx.reply(`╭━━〔 *📢 BROADCAST* 〕━━╮
┃
┃ Usage:
┃ ⌁ ${ctx.botPrefix}bc <message>
┃
╰━━━━━━━━━━━━━━━━━━━╯`);
    }

    await ctx.react('📢');

    try {
      const chats = await sock.groupFetchAllParticipating();
      const groupJids = Object.keys(chats);

      const text = `╭━━〔 *📢 BROADCAST* 〕━━╮\n\n${ctx.q}\n\n╰━━━━━━━━━━━━━━━━╯\n\n> *${ctx.botFooter}*`;

      let sent = 0;
      for (const jid of groupJids) {
        try {
          await sock.sendMessage(jid, { text });
          sent++;
          await new Promise(r => setTimeout(r, 1500));
        } catch (_) {}
      }

      await ctx.reply(`✅ _Broadcast sent to ${sent} groups._`);
    } catch (err) {
      await ctx.reply(`💀 *Error:* ${err.message}`);
    }
  },
});
