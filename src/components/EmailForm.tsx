"use client";

import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 flex w-full max-w-[330px] flex-col gap-2">
        <div className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[#2c2826] px-6 py-[17px]">
          <span className="text-center text-lg font-medium leading-[26px] text-white">
            Thank you!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex w-full max-w-[330px] flex-col gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="rounded-2xl border border-[rgba(100,100,100,0.33)] bg-white px-6 py-[17px] text-center text-lg font-medium leading-[26px] text-black outline-none placeholder:text-black/40 focus:border-[#2c2826]"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[#2c2826] px-6 py-[17px] transition-opacity disabled:opacity-60"
      >
        <span className="text-center text-lg font-medium leading-[26px] text-white">
          {status === "loading" ? "Sending..." : status === "error" ? "Error, try again" : "Join early access"}
        </span>
      </button>
    </div>
  );
}
