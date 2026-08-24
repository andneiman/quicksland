import { NextResponse } from "next/server";
import {
  LEADS_AUTH_COOKIE,
  isLeadsPassword,
  leadsAuthToken,
} from "@/lib/leadsAuth";

export const runtime = "nodejs";

function publicOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const origin = publicOrigin(req);
  const url = new URL("/u", origin.endsWith("/") ? origin : `${origin}/`);

  if (!isLeadsPassword(password)) {
    url.searchParams.set("e", "1");
    return NextResponse.redirect(url, 303);
  }

  url.search = "";
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(LEADS_AUTH_COOKIE, leadsAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/u",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
