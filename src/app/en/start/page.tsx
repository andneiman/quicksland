/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { Suspense } from "react";
import StartIntroForm from "@/components/en/StartIntroForm";

export const metadata: Metadata = {
  title: "Nice to meet you — Quicks",
  description: "A few details so we can get you set up with Quicks",
};

export default function StartEnPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#F0F0F0] text-[#262626]">
      <main className="flex w-full flex-1 flex-col items-center">
        <div className="my-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center gap-8 p-6">
          <header className="flex w-full flex-col items-center gap-4">
            <img
              src="/logo.png"
              alt="Quicks"
              width={64}
              height={64}
              className="size-16 object-contain"
            />
            <h1 className="whitespace-pre-wrap text-center text-4xl font-semibold leading-10">
              {"Nice to\nmeet you"}
            </h1>
          </header>

          <Suspense fallback={null}>
            <StartIntroForm />
          </Suspense>
        </div>

        <div className="w-full max-w-[480px] py-8">
          <footer className="text-center text-xs font-medium text-[rgba(38,38,38,0.6)]">
            Have any questions?
            <br />
            Our{" "}
            <a href="mailto:support@quicks.ai" className="underline">
              support team
            </a>{" "}
            is here to assist you
          </footer>
        </div>
      </main>
    </div>
  );
}
