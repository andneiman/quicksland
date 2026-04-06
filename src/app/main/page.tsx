/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quicks — AI-native workspace for learning and work",
  description:
    "We now live in a time when AI can do your work for you. So it's time to reimagine what a workspace should be.",
};

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white text-[#2c2826]">
      {/* ===== HERO ===== */}
      <section className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16 sm:px-20">
        {/* logo */}
        <img
          alt="Quicks"
          src="/logo-main.png"
          width={92}
          height={92}
          className="size-[60px] sm:size-[92px]"
        />

        {/* content */}
        <div className="flex flex-col items-center gap-0 sm:p-8">
          {/* headline */}
          <h1
            className="text-center font-[family-name:var(--font-instrument-serif)] text-[44px] leading-[44px] tracking-[-0.8px] text-[#2c2826] sm:text-[80px] sm:leading-[75px] sm:tracking-[-1.6px]"
          >
            AI-native workspace
            <br />
            for learning and work
          </h1>

          {/* subtitle */}
          <p
            className="mt-6 text-center text-base leading-7 text-[#262626] sm:mt-4 sm:text-[20px] sm:leading-[28px]"
            style={{ fontFeatureSettings: "'ss01' 1" }}
          >
            We now live in a world when AI can do your work for you. Well, most of it.
            <br />
            So it&apos;s time to reimagine what a workspace should be.
          </p>

          {/* email form (visual only, no functionality) */}
          <div className="mt-10 flex w-full max-w-[330px] flex-col gap-2">
            <div className="flex items-center justify-center rounded-2xl border border-[rgba(100,100,100,0.33)] bg-white px-6 py-[17px]">
              <span className="text-center text-lg font-medium leading-[26px] text-black/40">
                Enter your email
              </span>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[#2c2826] px-6 py-[17px]">
              <span className="text-center text-lg font-medium leading-[26px] text-white">
                Join early access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="flex w-full shrink-0 items-center px-6 sm:px-20">
        <div className="flex w-full flex-col gap-1 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-6">
          <a
            href="mailto:hello@quicks.com"
            className="text-sm leading-5 text-[rgba(37,37,37,0.5)]"
          >
            hello@quicks.com
          </a>
          <p className="text-sm leading-5 text-[#252525] sm:text-right">
            Quicks.com | All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
