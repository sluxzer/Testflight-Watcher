export function buildURL(id) {
  return `https://testflight.apple.com/join/${id}`;
}

export function parseStatus(html) {
  const lower = html.toLowerCase();

  if (lower.includes("this beta is full")) return "full";
  if (lower.includes("not accepting") || lower.includes("isn't accepting")) return "closed";

  return "open";
}