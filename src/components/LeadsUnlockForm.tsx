"use client";

import { useState, type FormEvent } from "react";

export default function LeadsUnlockForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unlock: true, password }),
      });
      if (!res.ok) {
        setError("Wrong password");
        setLoading(false);
        return;
      }
      window.location.assign("/u");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[360px] flex-col gap-4"
    >
      <input
        type="password"
        name="password"
        autoFocus
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-10 w-full rounded-xl border-0 bg-white px-4 text-base outline-none ring-1 ring-[rgba(38,38,38,0.08)] focus:ring-2 focus:ring-[#262626]"
      />
      {error ? (
        <p className="text-center text-sm font-medium text-[#c10007]">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={loading || !password}
        className="flex min-h-10 w-full items-center justify-center rounded-xl bg-[#262626] px-4 text-base font-medium text-white hover:bg-[#3d3d3d] disabled:opacity-60"
      >
        {loading ? "Continue…" : "Continue"}
      </button>
    </form>
  );
}
