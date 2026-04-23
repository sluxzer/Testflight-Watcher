# TestFlight Sniper

Monitor TestFlight betas and get instant Telegram alerts.

## Setup

1. Clone repo
2. Copy `.env.example` to `.env`
3. Fill in BOT_TOKEN and CHAT_ID
4. Install dependencies:

npm install

5. Run:

## npm start🚀 Deploy Steps
On your VPS:
git clone https://github.com/sluxzer/Testflight-Watcher.git
cd Testflight-Watcher
cp .env.example .env
nano .env
npm install
npm start


## 🔁 Run forever (PM2)
npm install -g pm2
pm2 start src/index.js --name tf-sniper
pm2 save
pm2 startup