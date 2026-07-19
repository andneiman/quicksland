import { NextResponse } from "next/server";
import {
  DOWNLOAD_EMAIL_SUBJECT,
  DOWNLOAD_EMAIL_TEXT,
  getDownloadEmailHtml,
} from "@/lib/downloadEmailHtml";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_EMAIL_API_TOKEN;
    const fromAddress =
      process.env.CLOUDFLARE_EMAIL_FROM_ADDRESS ??
      process.env.CLOUDFLARE_EMAIL_FROM ??
      "welcome@mail.quicks.ai";
    const fromName = process.env.CLOUDFLARE_EMAIL_FROM_NAME ?? "Quicks";

    // Cloudflare REST API accepts a plain address string or { address, name }.
    // RFC5322 strings like "Quicks <welcome@...>" are rejected.
    const fromEmail =
      /<([^>]+)>/.exec(fromAddress)?.[1]?.trim() || fromAddress.trim();
    const from =
      fromName.trim().length > 0
        ? { address: fromEmail, name: fromName.trim() }
        : fromEmail;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: "Email sending is not configured" },
        { status: 500 }
      );
    }

    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email.trim(),
          from,
          subject: DOWNLOAD_EMAIL_SUBJECT,
          html: getDownloadEmailHtml(),
          text: DOWNLOAD_EMAIL_TEXT,
        }),
      }
    );

    const cfJson = (await cfRes.json().catch(() => null)) as {
      success?: boolean;
      errors?: { message?: string }[];
      result?: unknown;
    } | null;

    if (!cfRes.ok || cfJson?.success === false) {
      const message =
        cfJson?.errors?.[0]?.message ||
        `Cloudflare email failed (${cfRes.status})`;
      return NextResponse.json({ error: message }, { status: 502 });
    }

    // Optional lead capture — don't fail the request if Airtable is down
    const airtableBase = process.env.AIRTABLE_BASE_ID;
    const airtableTable = process.env.AIRTABLE_TABLE_NAME;
    const airtableToken = process.env.AIRTABLE_TOKEN;
    if (airtableBase && airtableTable && airtableToken) {
      void fetch(
        `https://api.airtable.com/v0/${airtableBase}/${airtableTable}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${airtableToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Email: email.trim(),
                  Date: new Date().toISOString(),
                },
              },
            ],
          }),
        }
      ).catch(() => {});
    }

    return NextResponse.json({ success: true, result: cfJson?.result ?? null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
