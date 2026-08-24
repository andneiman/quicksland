import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LEADS_AUTH_COOKIE, isLeadsAuthCookie } from "@/lib/leadsAuth";
import { getPrisma } from "@/lib/prisma";
import { loginLeadsDashboard } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

function fmtDate(d: Date) {
  return d.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function cell(value: string | null | undefined) {
  const text = value?.trim();
  return text ? text : "—";
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string | string[] }>;
}) {
  const jar = await cookies();
  const authed = isLeadsAuthCookie(jar.get(LEADS_AUTH_COOKIE)?.value);

  if (!authed) {
    const params = await searchParams;
    const failed = Array.isArray(params.e) ? params.e[0] : params.e;

    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-[#F0F0F0] px-6 text-[#262626]">
        <form
          action={loginLeadsDashboard}
          className="flex w-full max-w-[360px] flex-col gap-4"
        >
          <h1 className="text-center text-2xl font-semibold">Leads</h1>
          <input
            type="password"
            name="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            className="h-10 w-full rounded-xl border-0 bg-white px-4 text-base outline-none ring-1 ring-[rgba(38,38,38,0.08)] focus:ring-2 focus:ring-[#262626]"
          />
          {failed ? (
            <p className="text-center text-sm font-medium text-[#c10007]">
              Wrong password
            </p>
          ) : null}
          <button
            type="submit"
            className="flex min-h-10 w-full items-center justify-center rounded-xl bg-[#262626] px-4 text-base font-medium text-white hover:bg-[#3d3d3d]"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  const leads = await getPrisma().lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return (
    <div className="min-h-dvh bg-[#F0F0F0] px-4 py-8 text-[#262626] sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-[rgba(38,38,38,0.5)]">
            {leads.length} {leads.length === 1 ? "row" : "rows"}
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_5px_30px_rgba(0,0,0,0.05)]">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(38,38,38,0.08)] text-xs font-medium uppercase tracking-wide text-[rgba(38,38,38,0.45)]">
                <th className="whitespace-nowrap px-4 py-3">Added</th>
                <th className="whitespace-nowrap px-4 py-3">Name</th>
                <th className="whitespace-nowrap px-4 py-3">Email</th>
                <th className="whitespace-nowrap px-4 py-3">Source</th>
                <th className="whitespace-nowrap px-4 py-3">Platform</th>
                <th className="whitespace-nowrap px-4 py-3">Country</th>
                <th className="whitespace-nowrap px-4 py-3">City</th>
                <th className="whitespace-nowrap px-4 py-3">IP</th>
                <th className="whitespace-nowrap px-4 py-3">Timezone</th>
                <th className="whitespace-nowrap px-4 py-3">Language</th>
                <th className="whitespace-nowrap px-4 py-3">Referer</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-10 text-center text-[rgba(38,38,38,0.45)]"
                  >
                    No leads yet
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-[rgba(38,38,38,0.06)] last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[rgba(38,38,38,0.7)]">
                      {fmtDate(lead.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">
                      {lead.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{lead.email}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {cell(lead.source)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {cell(lead.platform)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {cell(lead.country)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {cell(lead.city)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                      {cell(lead.ip)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {cell(lead.timezone)}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3">
                      {cell(lead.language)}
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-[rgba(38,38,38,0.6)]">
                      {cell(lead.referer)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
