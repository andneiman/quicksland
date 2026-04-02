"use client";

import { useState, type ReactNode } from "react";

const FAQ_DATA: { q: string; a: ReactNode }[] = [
  {
    q: "Why do I need an AI assistant?",
    a: "An AI assistant saves you time by creating learning materials, grading homework, and much more",
  },
  {
    q: "How much does it cost?",
    a: "The service is free for early users. Sign up now!",
  },
  {
    q: "What about privacy?",
    a: "Privacy is one of our top priorities. We don't store session recordings, and user data is anonymized and processed in accordance with modern security and privacy standards",
  },
  {
    q: "I have a different question. Where should I reach out?",
    a: (
      <>
        Write to us on Telegram{" "}
        <a
          href="https://t.me/quicks_team"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#39c] underline"
        >
          @quicks_team
        </a>
      </>
    ),
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="#262626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQEn() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full max-w-[720px] flex-col overflow-clip rounded-3xl bg-[rgba(37,37,37,0.05)] p-5 sm:px-8 sm:pb-8 sm:pt-8">
      {FAQ_DATA.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-3 py-1 text-left sm:gap-4"
            >
              <Chevron open={isOpen} />
              <span className="flex-1 text-base font-medium leading-6 text-[#262626] sm:text-[20px] sm:leading-7">
                {item.q}
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                {item.a && (
                  <div className="pb-1 pl-8 pt-2 text-base font-medium leading-6 text-[rgba(38,38,38,0.4)] sm:pl-9 sm:text-[20px] sm:leading-7">
                    {item.a}
                  </div>
                )}
              </div>
            </div>

            {i < FAQ_DATA.length - 1 && (
              <div className="my-3 h-px w-full bg-[rgba(38,38,38,0.08)] sm:my-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}
