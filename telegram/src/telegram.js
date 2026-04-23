import { CONFIG } from "./config.js";

export async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CONFIG.CHAT_ID,
      text: message
    })
  });
}