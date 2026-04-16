function normalizeSegment(segment) {
  return String(segment).replace(/^\/+|\/+$/g, "");
}

export function buildPath(...segments) {
  const path = segments
    .flat()
    .filter((segment) => segment !== undefined && segment !== null && segment !== "")
    .map(normalizeSegment)
    .filter(Boolean)
    .join("/");

  return path ? `/${path}` : "/";
}

export function buildAbsoluteUrl(baseUrl, ...segments) {
  const pathname = buildPath(...segments);

  if (!baseUrl) return pathname;

  try {
    return new URL(pathname, baseUrl).toString();
  } catch {
    return pathname;
  }
}
