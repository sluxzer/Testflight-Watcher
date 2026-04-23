import { CONFIG } from "./config.js";
import { checkApp } from "./checker.js";
import { sendTelegram } from "./telegram.js";
import { buildURL } from "./utils.js";

const lastNotify = {};

function shouldNotify(app) {
  const now = Date.now();
  const last = lastNotify[app.id] || 0;

  if (now - last > CONFIG.COOLDOWN) {
    lastNotify[app.id] = now;
    return true;
  }

  return false;
}

async function run() {
  console.log("🚀 TestFlight Sniper Started");

  while (true) {
    try {
      const results = await Promise.all(CONFIG.APPS.map(checkApp));

      for (const app of results) {
        console.log(`[${new Date().toISOString()}] ${app.name}: ${app.status}`);

        if (app.status === "open" && shouldNotify(app)) {
          await sendTelegram(
            `🚨 ${app.name} beta is OPEN\n${buildURL(app.id)}`
          );
        }
      }

    } catch (e) {
      console.error("Error:", e.message);
    }

    await new Promise(r => setTimeout(r, CONFIG.INTERVAL));
  }
}

run();