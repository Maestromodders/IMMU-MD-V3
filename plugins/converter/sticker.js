const { registerCommand } = require('../../lib/pluginLoader');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

ffmpeg.setFfmpegPath(ffmpegPath);

async function imgToWebp(inputBuf) {
  const tmp = path.join(os.tmpdir(), `s_${Date.now()}.webp`);
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(`data:image/png;base64,${inputBuf.toString('base64')}`)
      .outputOptions([
        '-vcodec', 'libwebp',
        '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000',
        '-loop', '0', '-preset', 'default', '-an', '-vsync', '0',
      ])
      .toFormat('webp')
      .on('end', () => {
        const buf = fs.readFileSync(tmp);
        fs.unlinkSync(tmp);
        resolve(buf);
      })
      .on('error', reject)
      .save(tmp);
  });
}

async function vidToWebp(inputBuf) {
  const inTmp = path.join(os.tmpdir(), `i_${Date.now()}.mp4`);
  const outTmp = path.join(os.tmpdir(), `o_${Date.now()}.webp`);
  fs.writeFileSync(inTmp, inputBuf);
  return new Promise((resolve, reject) => {
    ffmpeg(inTmp)
      .outputOptions([
        '-vcodec', 'libwebp',
        '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000',
        '-loop', '0', '-preset', 'default', '-an', '-vsync', '0',
        '-t', '6',
      ])
      .toFormat('webp')
      .on('end', () => {
        const buf = fs.readFileSync(outTmp);
        try { fs.unlinkSync(inTmp); } catch (_) {}
        try { fs.unlinkSync(outTmp); } catch (_) {}
        resolve(buf);
      })
      .on('error', reject)
      .save(outTmp);
  });
}

registerCommand({
  name: 'sticker',
  alias: ['s', 'stiker'],
  category: 'converter',
  description: 'Convert image/video to sticker',
  execute: async (sock, msg, ctx) => {
    const target = ctx.quoted || msg.message;
    const isImg = target.imageMessage;
    const isVid = target.videoMessage;
    if (!isImg && !isVid) {
      return ctx.reply(`Reply to image/video with: *${ctx.botPrefix}sticker*`);
    }
    await ctx.react('🎨');
    try {
      const buffer = await ctx.downloadMedia(ctx.quoted ? { message: ctx.quoted } : msg);
      if (!buffer) return ctx.reply('💀 _Download failed._');
      const webp = isImg ? await imgToWebp(buffer) : await vidToWebp(buffer);
      await ctx.send({ sticker: webp });
    } catch (err) {
      await ctx.reply(`💀 ${err.message}`);
    }
  },
});
