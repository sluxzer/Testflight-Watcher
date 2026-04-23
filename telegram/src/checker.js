import { buildURL, parseStatus } from "./utils.js";

export async function checkApp(app) {
  const res = await fetch(buildURL(app.id), {
    headers: { "Accept-Language": "en-us" }
  });

  const html = await res.text();
  const status = parseStatus(html);

  return { ...app, status };
}