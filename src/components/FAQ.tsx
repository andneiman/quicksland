"use client";

import { useState } from "react";

const FAQ_DATA = [
  {
    q: "Для чего мне ИИ ассистент?",
    a: "ИИ ассистент помогает экономить время, создавая учебные материалы, проверяя домашку и много другое",
  },
  { q: "Сколько это стоит?", a: "" },
  { q: "А что с конфиденциальностью?", a: "" },
  { q: "У меня другой вопрос, куда писать?", a: "" },
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full max-w-[720px] flex-col overflow-clip rounded-3xl bg-[rgba(37,37,37,0.05)] px-8 pb-8 pt-8">
      {FAQ_DATA.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 py-1 text-left"
            >
              <Chevron open={isOpen} />
              <span className="flex-1 text-[20px] font-medium leading-7 text-[#262626]">
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
                  <p className="pb-1 pl-9 pt-2 text-[20px] font-medium leading-7 text-[rgba(38,38,38,0.4)]">
                    {item.a}
                  </p>
                )}
              </div>
            </div>

            {i < FAQ_DATA.length - 1 && (
              <div className="my-4 h-px w-full bg-[rgba(38,38,38,0.08)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
