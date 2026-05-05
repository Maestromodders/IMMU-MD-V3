const { registerCommand } = require('../../lib/pluginLoader');
const axios = require('axios');

registerCommand({
  name: 'weather',
  alias: ['climate'],
  category: 'search',
  description: 'Weather of a city',
  execute: async (sock, msg, ctx) => {
    if (!ctx.q) return ctx.reply(`Usage: *${ctx.botPrefix}weather Karachi*`);
    await ctx.react('☁️');
    try {
      const { data } = await axios.get(`https://wttr.in/${encodeURIComponent(ctx.q)}?format=j1`, { timeout: 10000 });
      const c = data.current_condition[0];
      const area = data.nearest_area[0];

      const text = `╭━━〔 *🌤️ ${area.areaName[0].value}* 〕━━╮
┃
┃ 🌡️ Temp     ➤ ${c.temp_C}°C / ${c.temp_F}°F
┃ 💧 Humidity ➤ ${c.humidity}%
┃ 💨 Wind     ➤ ${c.windspeedKmph} km/h
┃ 👁️ Vision   ➤ ${c.visibility} km
┃ ☁️ Sky      ➤ ${c.weatherDesc[0].value}
┃ 📍 Region   ➤ ${area.region[0].value}
┃
╰━━━━━━━━━━━━━━━━╯

> *${ctx.botFooter}*`;
      await ctx.reply(text);
    } catch (err) {
      await ctx.reply('💀 _City not found._');
    }
  },
});
