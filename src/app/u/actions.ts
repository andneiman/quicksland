"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  LEADS_AUTH_COOKIE,
  isLeadsPassword,
  leadsAuthToken,
} from "@/lib/leadsAuth";

export async function loginLeadsDashboard(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!isLeadsPassword(password)) {
    redirect("/u?e=1");
  }

  const jar = await cookies();
  jar.set(LEADS_AUTH_COOKIE, leadsAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/u",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/u");
}
