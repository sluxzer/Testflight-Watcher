// TestFlight Sniper (Node.js + Telegram)

const APPS = [
  { id: "C1a3MRG4", name: "Example Full App" },
  { id: "PMfu4nmW", name: "Example Open App" }
];

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

const INTERVAL = 10000; // 10 seconds
const COOLDOWN = 15000; // 15 seconds anti-spam

const lastNotify = {};

// ---------- Helpers ----------

function buildURL(id) {
  return `https://testflight.apple.com/join/${id}`;
}

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      "Accept-Language": "en-us"
    }
  });

  return await res.text();
}

function parseStatus(html) {
  const lower = html.toLowerCase();

  if (lower.includes("this beta is full")) return "full";
  if (lower.includes("isn't accepting") || lower.includes("not accepting")) return "closed";

  return "open";
}

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });
}

function shouldNotify(app) {
  const now = Date.now();
  const last = lastNotify[app.id] || 0;

  if (now - last > COOLDOWN) {
    lastNotify[app.id] = now;
    return true;
  }

  return false;
}

// ---------- Main Loop ----------

async function checkApp(app) {
  try {
    const html = await fetchHTML(buildURL(app.id));
    const status = parseStatus(html);

    console.log(`[${new Date().toISOString()}] ${app.name}: ${status}`);

    if (status === "open" && shouldNotify(app)) {
      await sendTelegram(`🚨 ${app.name} beta is OPEN\n${buildURL(app.id)}`);
    }

  } catch (e) {
    console.error(`Error checking ${app.name}`, e.message);
  }
}

async function run() {
  while (true) {
    await Promise.all(APPS.map(checkApp));
    await new Promise(r => setTimeout(r, INTERVAL));
  }
}

run();
