import { headers } from "next/headers";

function firstHeader(h: Headers, name: string) {
  const value = h.get(name);
  if (!value) return null;
  return value.split(",")[0]?.trim() || null;
}

export async function getRequestMeta() {
  const h = await headers();
  const ip =
    firstHeader(h, "x-forwarded-for") ||
    firstHeader(h, "x-real-ip") ||
    firstHeader(h, "x-vercel-forwarded-for");

  return {
    ip,
    userAgent: h.get("user-agent"),
    language: firstHeader(h, "accept-language"),
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    city: h.get("x-vercel-ip-city"),
    referer: h.get("referer"),
  };
}
