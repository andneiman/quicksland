"use client";

import { useEffect, useState } from "react";

const TABS = [
  { id: "homework", label: "Homework", src: "/previews/en-homework.jpg" },
  { id: "flashcards", label: "Flashcards", src: "/previews/en-flashcards.jpg" },
  { id: "chat", label: "AI chat", src: "/previews/en-chat.jpg" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function HeroPreviewEn() {
  const [active, setActive] = useState<TabId>("homework");

  useEffect(() => {
    TABS.forEach((tab) => {
      const img = new window.Image();
      img.src = tab.src;
      void img.decode?.().catch(() => {});
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="relative -mx-2 w-[calc(100%+1rem)] overflow-clip sm:mx-0 sm:w-full">
        <div className="relative aspect-[2200/1330] w-full">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={tab.src}
                src={tab.src}
                alt={isActive ? `Preview — ${tab.label}` : ""}
                width={2200}
                height={1330}
                decoding="async"
                fetchPriority="high"
                className={[
                  "absolute inset-0 size-full object-contain",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
                aria-hidden={!isActive}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={[
              "inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-[10px] text-base font-medium leading-6 text-[rgba(38,38,38,0.6)] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.08)] transition-colors",
              tab.id === active
                ? "bg-white"
                : "bg-[rgba(255,255,255,0.6)] hover:bg-white",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
