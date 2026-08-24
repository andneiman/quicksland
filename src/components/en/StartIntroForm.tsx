"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  detectDesktopOS,
  fetchDownloads,
  latestUrlForOs,
} from "@/lib/desktopDownloads";
import { reachGoal, setMetrikaUser } from "@/lib/metrika";

export default function StartIntroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("from") || "en_start";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    reachGoal("start_view", { button_location: source });
  }, [source]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail.includes("@")) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          source,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          locale: navigator.language,
          screen: `${window.screen.width}x${window.screen.height}`,
        }),
      });
      if (!res.ok) throw new Error();

      reachGoal("start_continue", { button_location: source });
      setMetrikaUser(trimmedEmail, trimmedName);

      const os = detectDesktopOS();
      try {
        const data = await fetchDownloads();
        const url = latestUrlForOs(data, os);
        const params = new URLSearchParams({
          url,
          platform: os,
          from: source,
        });
        router.push(`/en/download?${params.toString()}`);
      } catch {
        router.push(`/en/download?platform=${os}&from=${encodeURIComponent(source)}`);
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const canSubmit = name.trim().length > 0 && email.includes("@");

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-4"
    >
      <input
        id="start-name"
        type="text"
        name="name"
        autoComplete="name"
        autoFocus
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 w-full rounded-xl border-0 bg-[rgba(38,38,38,0.05)] px-4 py-2.5 text-base text-[#262626] caret-[#262626] outline-none placeholder:text-[rgba(38,38,38,0.4)] focus:ring-2 focus:ring-[#262626]"
      />

      <input
        id="start-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-10 w-full rounded-xl border-0 bg-[rgba(38,38,38,0.05)] px-4 py-2.5 text-base text-[#262626] caret-[#262626] outline-none placeholder:text-[rgba(38,38,38,0.4)] focus:ring-2 focus:ring-[#262626]"
      />

      {error ? (
        <p className="w-full text-sm font-medium text-[#c10007]">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || status === "loading"}
        data-ym-location="en_start_continue"
        className="flex min-h-10 w-full items-center justify-center rounded-xl bg-[#0095FF] px-4 py-2 text-base font-medium text-white transition-colors hover:bg-[#0088e8] disabled:pointer-events-none disabled:bg-[rgba(0,149,255,0.35)]"
      >
        {status === "loading" ? "Continue…" : "Continue"}
      </button>

      <p className="max-w-[270px] text-center text-xs font-medium leading-4 text-[rgba(38,38,38,0.6)]">
        By proceeding, you are agreeing to Quicks{" "}
        <a
          href="https://quicks.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://quicks.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Notice
        </a>
      </p>
    </form>
  );
}
