"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = [
  { id: "homework", label: "Домашка", src: "/previews/homework.png" },
  { id: "flashcards", label: "Флешкарты", src: "/previews/flashcards.png" },
  { id: "chat", label: "Чат", src: "/previews/chat.png" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function HeroPreview() {
  const [active, setActive] = useState<TabId>("homework");
  const current = TABS.find((t) => t.id === active)!;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={[
              "inline-flex items-center justify-center rounded-full px-4 py-[10px] text-base font-medium leading-6 text-[rgba(38,38,38,0.6)] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.08)] transition-colors",
              tab.id === active
                ? "bg-white"
                : "bg-[rgba(255,255,255,0.6)]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full overflow-clip rounded-3xl">
        <div className="relative aspect-[2/1] w-full">
          <Image
            src={current.src}
            alt={`Превью — ${current.label}`}
            fill
            className="object-contain transition-opacity duration-300"
            priority
          />
        </div>
      </div>
    </div>
  );
}
