# 🗿 IMMU MD V3 — Royal Edition

WhatsApp Multi-Device Bot built with Official Baileys.
**MongoDB-based session storage** — Heroku 24/7 proof.

---

## ✨ Features

### 🤖 Auto Features (always on)
- Always Online
- Auto Read Status
- Auto React Status (🚩 ❤️ ✅ ⚠️)
- Anti-Delete (deleted msgs → your DM)
- Anti View-Once via `.vv` command
- Auto-follow channel + auto-join group on first connect
- Welcome message with bot pic

### 📜 Commands (35+)

**🗿 General:** `.menu` `.ping` `.alive` `.owner`
**🔧 Utility:** `.save` `.vv` `.forward` `.qr` `.calc`
**🔍 Search:** `.google` `.wiki` `.weather`
**🎨 Converter:** `.sticker` `.toimg` `.tomp3`
**🛡️ Security:** `.antidelete` `.antiviewonce` `.anticall`
**⚙️ Automation:** `.autostatus` `.autoreact`
**👥 Group:** `.tagall` `.hidetag` `.groupinfo` `.grouplink` `.kick` `.promote` `.demote` `.add`
**👑 Owner:** `.broadcast` `.block` `.unblock` `.setpp` `.setbio` `.restart` `.eval`

---

## 🚀 Heroku Deploy

### Step 1: MongoDB
1. Sign up at https://cloud.mongodb.com
2. Create free cluster (M0)
3. Add Database User + Network Access (`0.0.0.0/0`)
4. Get connection string (Drivers → Node.js)

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "IMMU MD V3"
git remote add origin <YOUR_REPO>
git push -u origin main
```

### Step 3: Deploy to Heroku
1. Create Heroku app
2. Connect GitHub repo
3. Set env vars:
   - `MONGO_URI` — your MongoDB connection string
4. Deploy → Open logs
5. Bot prompts: enter your number → pair code → link WhatsApp
6. **Session auto-saves to MongoDB** ✅
7. Bot live 24/7

### Step 4: Fixed Behavior
- Heroku restarts → session loads from MongoDB → bot reconnects in seconds
- No need to pair again ever (unless you logout)

---

## 🔧 Local Development

```bash
npm install
cp .env.example .env
# Fill MONGO_URI in .env
node index.js
```

---

> Powered by IMMU MD V3
