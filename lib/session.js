// 🔐 Session — MongoDB-based (Heroku 24/7 proof)

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const { getDB } = require('./database');

const SESSION_DIR = path.join(__dirname, '..', 'data', 'session');
const COLLECTION = 'sessions';
const KEY = 'main';

let saveTimeout = null;

async function saveSessionToDB() {
  // Debounce to avoid hammering DB
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    const db = getDB();
    if (!db) return;

    try {
      if (!fs.existsSync(SESSION_DIR)) return;

      const files = {};
      for (const item of fs.readdirSync(SESSION_DIR)) {
        const full = path.join(SESSION_DIR, item);
        if (fs.statSync(full).isFile()) {
          files[item] = fs.readFileSync(full, 'utf-8');
        }
      }

      await db.collection(COLLECTION).updateOne(
        { _id: KEY },
        { $set: { files, updatedAt: new Date() } },
        { upsert: true }
      );
    } catch (err) {
      console.log(`  ⚠️  Session save: ${err.message}`);
    }
  }, 2000);
}

async function loadSessionFromDB() {
  const db = getDB();
  if (!db) return false;

  try {
    const doc = await db.collection(COLLECTION).findOne({ _id: KEY });
    if (!doc?.files) return false;

    await fs.ensureDir(SESSION_DIR);
    for (const f of fs.readdirSync(SESSION_DIR)) {
      fs.unlinkSync(path.join(SESSION_DIR, f));
    }

    for (const [filename, content] of Object.entries(doc.files)) {
      fs.writeFileSync(path.join(SESSION_DIR, filename), content);
    }

    console.log('  ✅ Session restored from MongoDB');
    return true;
  } catch (err) {
    console.log(`  ⚠️  Session load: ${err.message}`);
    return false;
  }
}

async function loadSessionFromEnv() {
  if (!config.sessionId) return false;
  if (!config.sessionId.startsWith('IMMU-MD~')) return false;

  try {
    const base64 = config.sessionId.slice(8);
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    const creds = JSON.parse(json);

    await fs.ensureDir(SESSION_DIR);
    fs.writeFileSync(
      path.join(SESSION_DIR, 'creds.json'),
      JSON.stringify(creds, null, 2)
    );
    console.log('  ✅ Session loaded from env');
    return true;
  } catch (err) {
    console.log(`  ⚠️  Env session: ${err.message}`);
    return false;
  }
}

async function loadSession() {
  await fs.ensureDir(SESSION_DIR);

  const fromDB = await loadSessionFromDB();
  if (fromDB) return SESSION_DIR;

  const fromEnv = await loadSessionFromEnv();
  if (fromEnv) return SESSION_DIR;

  console.log('  ⚠️  No session — pair code will be requested');
  return null;
}

async function clearSession() {
  try {
    if (fs.existsSync(SESSION_DIR)) await fs.emptyDir(SESSION_DIR);
    const db = getDB();
    if (db) await db.collection(COLLECTION).deleteOne({ _id: KEY });
  } catch (err) {
    console.log(`  ⚠️  Clear session: ${err.message}`);
  }
}

module.exports = {
  loadSession,
  saveSessionToDB,
  clearSession,
  getSessionDir: () => SESSION_DIR,
};
