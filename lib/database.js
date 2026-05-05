// 💾 MongoDB Connection

const { MongoClient } = require('mongodb');
const config = require('../config');

let client = null;
let db = null;

async function connectDB() {
  if (db) return db;
  if (!config.mongoUri) {
    console.log('  ⚠️  MONGO_URI not set');
    return null;
  }

  try {
    client = new MongoClient(config.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    await client.connect();
    db = client.db(config.mongoDbName);
    console.log('  ✅ MongoDB connected');
    return db;
  } catch (err) {
    console.log(`  ❌ MongoDB: ${err.message}`);
    return null;
  }
}

function getDB() { return db; }

module.exports = { connectDB, getDB };
