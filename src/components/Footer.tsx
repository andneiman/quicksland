"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { id: "ru", label: "Russian", href: "/" },
  { id: "en", label: "English", href: "https://quicks.ai" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const currentLang = LANGUAGES[0];

  return (
    <footer className="flex w-full shrink-0 flex-col items-center px-4 sm:px-20">
      <div className="flex w-full flex-col gap-5 overflow-clip p-4 sm:p-8">
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <a
              href="https://quicks.ai/terms"
              className="inline-flex items-center justify-center rounded-full px-4 py-[10px] text-sm font-medium leading-5 text-[#262626] transition-colors hover:bg-[rgba(38,38,38,0.05)]"
            >
              Условия использования
            </a>
            <a
              href="https://quicks.ai/privacy"
              className="inline-flex items-center justify-center rounded-full px-4 py-[10px] text-sm font-medium leading-5 text-[#262626] transition-colors hover:bg-[rgba(38,38,38,0.05)]"
            >
              Политика конфиденциальности
            </a>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-2 rounded-full bg-[rgba(38,38,38,0.05)] py-[10px] pl-4 pr-3 text-sm font-medium leading-5 text-[#262626] transition-colors"
            >
              {currentLang.label}
              <Chevron open={langOpen} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 overflow-clip rounded-2xl border border-[rgba(38,38,38,0.08)] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
                {LANGUAGES.map((lang) => (
                  <a
                    key={lang.id}
                    href={lang.href}
                    className="flex items-center whitespace-nowrap px-4 py-[10px] text-sm font-medium leading-5 text-[#262626] transition-colors hover:bg-[rgba(38,38,38,0.05)]"
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 px-4 py-2 text-sm font-normal leading-5 text-[#252525] sm:flex-row sm:items-start sm:justify-between">
          <p>
            Связь с нами в Tg:
            <br />
            <a
              href="https://t.me/quicks_team"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(37,37,37,0.5)]"
            >
              @quicks_team
            </a>
          </p>
          <p className="text-right">Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}
