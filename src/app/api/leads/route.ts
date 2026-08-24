import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getRequestMeta } from "@/lib/requestMeta";
import {
  LEADS_AUTH_COOKIE,
  isLeadsPassword,
  leadsAuthToken,
} from "@/lib/leadsAuth";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

async function unlockDashboard(req: Request) {
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

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    return unlockDashboard(req);
  }

  try {
    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      source?: unknown;
      timezone?: unknown;
      locale?: unknown;
      screen?: unknown;
    };

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.slice(0, 120) : null;
    const timezone =
      typeof body.timezone === "string" ? body.timezone.slice(0, 80) : null;
    const locale = typeof body.locale === "string" ? body.locale.slice(0, 40) : null;
    const screen = typeof body.screen === "string" ? body.screen.slice(0, 40) : null;

    if (name.length < 1 || name.length > 120) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const meta = await getRequestMeta();
    const ua = meta.userAgent || "";
    const platform = /Win/i.test(ua)
      ? "windows"
      : /Mac/i.test(ua)
        ? "mac"
        : /Android/i.test(ua)
          ? "android"
          : /iPhone|iPad|iPod/i.test(ua)
            ? "ios"
            : null;

    const extra = {
      locale,
      screen,
      vercel: {
        country: meta.country,
        region: meta.region,
        city: meta.city,
      },
    };

    const lead = await getPrisma().lead.create({
      data: {
        name,
        email,
        ip: meta.ip,
        userAgent: meta.userAgent,
        language: meta.language,
        country: meta.country,
        region: meta.region,
        city: meta.city,
        timezone,
        referer: meta.referer,
        source,
        platform,
        extra,
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
