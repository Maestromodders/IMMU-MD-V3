const { registerCommand } = require('../../lib/pluginLoader');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

ffmpeg.setFfmpegPath(ffmpegPath);

registerCommand({
  name: 'toimg',
  alias: ['toimage', 'topng'],
  category: 'converter',
  description: 'Sticker to image',
  execute: async (sock, msg, ctx) => {
    if (!ctx.quoted?.stickerMessage) {
      return ctx.reply(`Reply to a sticker with: *${ctx.botPrefix}toimg*`);
    }
    await ctx.react('🖼️');
    try {
      const buffer = await ctx.downloadMedia({ message: ctx.quoted });
      if (!buffer) return ctx.reply('💀 _Download failed._');

      const inTmp = path.join(os.tmpdir(), `s_${Date.now()}.webp`);
      const outTmp = path.join(os.tmpdir(), `i_${Date.now()}.png`);
      fs.writeFileSync(inTmp, buffer);

      await new Promise((resolve, reject) => {
        ffmpeg(inTmp)
          .outputFormat('png')
          .on('end', resolve)
          .on('error', reject)
          .save(outTmp);
      });

      const out = fs.readFileSync(outTmp);
      try { fs.unlinkSync(inTmp); } catch (_) {}
      try { fs.unlinkSync(outTmp); } catch (_) {}

      await ctx.send({ image: out });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
