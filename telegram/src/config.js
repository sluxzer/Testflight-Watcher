import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHAT_ID: process.env.CHAT_ID,
  INTERVAL: parseInt(process.env.INTERVAL || "10000"),
  COOLDOWN: parseInt(process.env.COOLDOWN || "15000"),
  APPS: process.env.APPS.split(",").map(item => {
    const [id, name] = item.split(":");
    return { id, name };
  })
};