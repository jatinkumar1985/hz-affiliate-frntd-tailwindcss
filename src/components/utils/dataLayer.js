export function ensureDataLayer() {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushToDataLayer(eventData) {
  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;

  dataLayer.push(eventData);
}

export function lowerText(value, fallback = "na") {
  if (value === null || value === undefined) return fallback;

  const text = String(value).trim();
  return text ? text.toLowerCase() : fallback;
}

export function formatName(firstName, lastName, fallback = "na") {
  const name = [firstName, lastName]
    .filter(Boolean)
    .map((value) => String(value).trim())
    .filter(Boolean)
    .join(" ");

  return name ? name.toLowerCase() : fallback;
}
