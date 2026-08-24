import { createHmac, timingSafeEqual } from "crypto";

export const LEADS_AUTH_COOKIE = "u_auth";

function dashboardPassword() {
  return process.env.LEADS_DASHBOARD_PASSWORD || "Hello2014";
}

export function leadsAuthToken() {
  return createHmac("sha256", dashboardPassword())
    .update("leads-dashboard")
    .digest("hex");
}

export function isLeadsPassword(input: string) {
  const a = createHmac("sha256", "u").update(input).digest();
  const b = createHmac("sha256", "u").update(dashboardPassword()).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isLeadsAuthCookie(value: string | undefined) {
  if (!value) return false;
  const expected = Buffer.from(leadsAuthToken());
  const got = Buffer.from(value);
  return got.length === expected.length && timingSafeEqual(got, expected);
}
