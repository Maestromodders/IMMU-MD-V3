const { registerCommand } = require('../../lib/pluginLoader');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

ffmpeg.setFfmpegPath(ffmpegPath);

registerCommand({
  name: 'tomp3',
  alias: ['toaudio', 'mp3'],
  category: 'converter',
  description: 'Video to MP3',
  execute: async (sock, msg, ctx) => {
    if (!ctx.quoted?.videoMessage) {
      return ctx.reply(`Reply to a video with: *${ctx.botPrefix}tomp3*`);
    }
    await ctx.react('🎵');
    try {
      const buffer = await ctx.downloadMedia({ message: ctx.quoted });
      if (!buffer) return ctx.reply('💀 _Download failed._');

      const inTmp = path.join(os.tmpdir(), `v_${Date.now()}.mp4`);
      const outTmp = path.join(os.tmpdir(), `a_${Date.now()}.mp3`);
      fs.writeFileSync(inTmp, buffer);

      await new Promise((resolve, reject) => {
        ffmpeg(inTmp)
          .outputFormat('mp3')
          .audioCodec('libmp3lame')
          .audioBitrate('128k')
          .on('end', resolve)
          .on('error', reject)
          .save(outTmp);
      });

      const out = fs.readFileSync(outTmp);
      try { fs.unlinkSync(inTmp); } catch (_) {}
      try { fs.unlinkSync(outTmp); } catch (_) {}

      await ctx.send({ audio: out, mimetype: 'audio/mpeg' });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
