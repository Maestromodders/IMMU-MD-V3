// ╔══════════════════════════════════════════╗
// ║       IMMU MD V3 — Royal Edition         ║
// ║       Powered by IMMU MD V3              ║
// ╚══════════════════════════════════════════╝

require('dotenv').config();

const path = require('path');
const express = require('express');
const config = require('./config');
const { startBot } = require('./lib/connect');
const { connectDB } = require('./lib/database');
const { loadPlugins } = require('./lib/pluginLoader');

async function init() {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║       IMMU MD V3 — Royal Edition     ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log(`  Version : ${config.botVersion}`);
  console.log(`  Mode    : ${config.mode.toUpperCase()}`);
  console.log(`  Prefix  : ${config.prefix}`);
  console.log('');

  // MongoDB
  await connectDB();

  // Plugins
  loadPlugins(path.join(__dirname, 'plugins'));

  // Web server (Heroku requires for web dyno)
  const app = express();

  app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
  <title>IMMU MD V3</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0a0a;color:#fff;font-family:'Courier New',monospace;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .c{text-align:center;max-width:500px}
    h1{font-size:3em;background:linear-gradient(135deg,#FFD700,#FF6B6B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 10px}
    .v{color:#FFD700;letter-spacing:3px;font-size:.9em;margin-bottom:20px}
    .badge{display:inline-block;padding:10px 24px;background:#00ff88;color:#000;border-radius:20px;font-weight:bold;margin:20px 0;animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    p{color:#888;margin:8px 0}
    .footer{margin-top:30px;color:#666;font-size:.85em;font-style:italic}
  </style>
</head>
<body>
  <div class="c">
    <h1>🗿 IMMU MD V3</h1>
    <div class="v">ROYAL EDITION</div>
    <div class="badge">● LIVE</div>
    <p>Version ${config.botVersion}</p>
    <p>WhatsApp Multi-Device Bot</p>
    <div class="footer">${config.botFooter}</div>
  </div>
</body>
</html>`);
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      bot: config.botName,
      version: config.botVersion,
      uptime: process.uptime(),
    });
  });

  app.listen(config.port, () => {
    console.log(`  🌐 Web: http://localhost:${config.port}`);
  });

  console.log('');
  await startBot();
}

process.on('uncaughtException', (err) => {
  console.log(`  ❌ Uncaught: ${err.message}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`  ❌ Rejection: ${err?.message || err}`);
});

init().catch((err) => {
  console.log(`  💀 Fatal: ${err.message}`);
  process.exit(1);
});
