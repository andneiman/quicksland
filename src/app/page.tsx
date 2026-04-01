/* eslint-disable @next/next/no-img-element */

import HeroPreview from "@/components/HeroPreview";
import FAQ from "@/components/FAQ";

const ASSETS = {
  logo: "https://www.figma.com/api/mcp/asset/56438114-aaed-4c0f-9035-f40a1c8e2546",
  shadow:
    "https://www.figma.com/api/mcp/asset/ba931cf3-1aec-4e15-a1d6-290245b64899",
  wordmark:
    "https://www.figma.com/api/mcp/asset/d381ff00-749c-4a1f-849b-8de819c8a274",
  iconMic:
    "https://www.figma.com/api/mcp/asset/c929f881-2638-4dc5-9c11-d993dd016927",
  iconSubtitles:
    "https://www.figma.com/api/mcp/asset/e72bcecc-3fd4-40ec-b095-b8cf921a5f7a",
  iconCards:
    "https://www.figma.com/api/mcp/asset/5af56057-a11a-42d1-8a6a-08912b88b11c",
  iconChecklist:
    "https://www.figma.com/api/mcp/asset/3149fc55-d1cd-4f3d-abc7-61e9a3ccd705",
  iconWave:
    "https://www.figma.com/api/mcp/asset/1bd0961c-a367-4c68-ae4c-5864a94ec8de",
  iconParagraph:
    "https://www.figma.com/api/mcp/asset/6154b090-8f66-4701-945f-835ab8dbeeb3",
  iconPencil:
    "https://www.figma.com/api/mcp/asset/e4ab5bf7-6345-44c5-a1f2-f3c1892e604b",
  iconChevronDownSm:
    "https://www.figma.com/api/mcp/asset/5cbc157d-8d41-40cf-a17b-f12e7d84c79e",
};

const FEATURES: { bg: string; icon: string; label: string }[] = [
  { bg: "#ff6467", icon: ASSETS.iconMic, label: "Запись лекций" },
  { bg: "#2b7fff", icon: ASSETS.iconSubtitles, label: "Квизы" },
  { bg: "#00c950", icon: ASSETS.iconCards, label: "Флэшкарты" },
  { bg: "#fdc700", icon: ASSETS.iconChecklist, label: "Проверка домашки" },
  { bg: "#ad46ff", icon: ASSETS.iconWave, label: "Чат" },
  { bg: "#ee78d0", icon: ASSETS.iconParagraph, label: "Саммери" },
  { bg: "#2b7fff", icon: ASSETS.iconPencil, label: "Заметки" },
  { bg: "#00d5be", icon: ASSETS.iconMic, label: "Голосовые задания" },
];


function FeatureTag({
  bg,
  icon,
  label,
}: {
  bg: string;
  icon: string;
  label: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 rounded-[14px] px-4 py-[10px]"
      style={{ backgroundColor: bg }}
    >
      <div className="relative size-6">
        <img alt="" className="absolute inset-0 size-full" src={icon} />
      </div>
      <span className="whitespace-nowrap text-base font-bold leading-6 text-white">
        {label}
      </span>
    </div>
  );
}

function Placeholder({ w }: { w: number }) {
  return (
    <div
      className="h-[44px] shrink-0 rounded-[14px] bg-[rgba(38,38,38,0.05)]"
      style={{ width: w }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center overflow-clip bg-white text-[#262626]">
      {/* ── gradient background ── */}
      <div className="pointer-events-none absolute left-0 top-0 h-[221px] w-full bg-gradient-to-b from-[#eee] to-white" />

      {/* ── spacer for fixed top-bar ── */}
      <div className="h-24 w-full shrink-0" />

      {/* ===== HERO ===== */}
      <section className="relative flex w-full shrink-0 flex-col items-center gap-10 overflow-clip px-5 py-16 sm:px-20">
        {/* shadow behind the app preview — z-0 so it stays below content */}
        <div className="pointer-events-none absolute bottom-[-167px] left-[8.44%] right-[10%] z-0 h-[921px]">
          <div className="absolute inset-[-21.72%_-19.16%]">
            <img
              alt=""
              className="block size-full max-w-none"
              src={ASSETS.shadow}
            />
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-10 p-4 sm:p-8">
          {/* headline + subtitle */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-[40px] font-medium leading-[44px] tracking-[0px] sm:text-[64px] sm:leading-[68px]">
              ИИ&nbsp;ассистент
              <br />
              для преподавателей
            </h1>
            <p className="text-[18px] font-medium leading-7 sm:text-[20px] sm:leading-7">
              Записывает ваши уроки и автоматические создает{" "}
              <br className="hidden sm:inline" />
              <span className="font-medium text-[#ef4444]">
                домашние задания
              </span>
              ,{" "}
              <span className="font-medium text-[#38bdf8]">квизы</span>,{" "}
              <span className="font-medium text-[#e879f9]">флэшкарты</span> и
              многое другое
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-[#39c] px-6 py-4 text-base font-semibold leading-6 text-white"
            >
              Попробовать бесплатно
            </a>
            <p className="mt-4 text-center text-sm font-normal leading-5 text-[#262626]">
              запишитесь на 15-минутный демо и получите бесплатный доступ
            </p>
          </div>

          {/* interactive pills + full-width app preview */}
          <HeroPreview />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="flex w-full shrink-0 flex-col items-center gap-10 px-5 py-16 sm:px-20">
        <div className="max-w-[960px] text-center text-[28px] font-semibold leading-[32px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">
            Освободите время на себя
          </span>
          <br />
          и сделайте занятия эффективнее и интереснее
        </div>

        <div className="flex w-full flex-col gap-4">
          {/* stat cards */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-1">
            <div className="flex h-[220px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#fdf5e2] p-8 sm:col-span-2">
              <p className="text-[56px] font-semibold leading-[60px]">85%</p>
              <p className="text-[20px] font-medium leading-7">
                Экономия времени на создании материалов
              </p>
            </div>
            <div className="flex h-[220px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#f3f9fe] p-8">
              <p className="text-[56px] font-semibold leading-[60px]">138%</p>
              <p className="text-[20px] font-medium leading-7">
                Усвоение материала
              </p>
            </div>
            <div className="flex h-[220px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#fcf3f1] p-8">
              <p className="text-[56px] font-semibold leading-[60px]">190%</p>
              <p className="text-[20px] font-medium leading-7">
                Рост вовлеченности
              </p>
            </div>
          </div>

          {/* feature highlight */}
          <div className="flex w-full flex-col items-center gap-10 rounded-3xl bg-[rgba(38,38,38,0.05)] p-8 lg:h-[448px] lg:flex-row">
            {/* left: tag cloud */}
            <div className="flex flex-1 items-center justify-center self-stretch overflow-clip rounded-[20px] px-6 py-5">
              <div className="flex w-[358px] flex-wrap content-center items-center justify-center gap-[6px]">
                {/* row 1 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={156} />
                  <Placeholder w={156} />
                </div>
                {/* row 2 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={95} />
                  <FeatureTag {...FEATURES[0]} />
                  <Placeholder w={94} />
                </div>
                {/* row 3 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={84} />
                  <FeatureTag {...FEATURES[1]} />
                  <FeatureTag {...FEATURES[2]} />
                  <Placeholder w={84} />
                </div>
                {/* row 4 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={65} />
                  <FeatureTag {...FEATURES[3]} />
                  <FeatureTag {...FEATURES[4]} />
                  <Placeholder w={65} />
                </div>
                {/* row 5 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={80} />
                  <FeatureTag {...FEATURES[5]} />
                  <FeatureTag {...FEATURES[6]} />
                  <Placeholder w={80} />
                </div>
                {/* row 6 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={112} />
                  <FeatureTag {...FEATURES[7]} />
                  <Placeholder w={112} />
                </div>
                {/* row 7 */}
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={120} />
                  <Placeholder w={120} />
                </div>
              </div>
            </div>

            {/* right: copy */}
            <div className="flex flex-1 flex-col items-start justify-center gap-6 self-stretch p-6">
              <div className="flex w-full flex-col gap-4">
                <h3 className="text-[32px] font-semibold leading-[36px] sm:text-[40px] sm:leading-[44px]">
                  Единственный ИИ,
                  <br />
                  который вам нужен
                </h3>
                <p className="text-[20px] font-medium leading-7 text-[rgba(38,38,38,0.4)]">
                  Набор инструментов необходимый
                  <br />
                  для современного преподавания
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center rounded-2xl bg-[#39c] px-6 py-4 text-base font-medium leading-6 text-white"
              >
                Попробовать бесплатно
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="flex w-full shrink-0 flex-col items-center gap-10 px-5 py-10 sm:px-20">
        <div className="max-w-[960px] text-center text-[28px] font-semibold leading-[32px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">Есть вопросы?</span>
          <br />
          С радостью отвечаем
        </div>

        <FAQ />
      </section>

      {/* ===== CTA ===== */}
      <section className="flex w-full shrink-0 flex-col items-center justify-center px-5 pb-20 pt-4 sm:px-20">
        <h2 className="text-center text-[32px] font-semibold leading-[36px] sm:text-[40px] sm:leading-[44px]">
          Готовы начать?
        </h2>
        <a
          href="#"
          className="mt-8 inline-flex items-center rounded-full bg-[#39c] px-6 py-4 text-base font-semibold leading-6 text-white"
        >
          Попробовать бесплатно
        </a>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="flex w-full shrink-0 flex-col items-center px-5 sm:px-20">
        <div className="flex w-full flex-col gap-5 overflow-clip p-8">
          <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-[rgba(38,38,38,0.05)] px-4 py-[10px] text-sm font-medium leading-5 text-[#262626]"
              >
                Условия использования
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full px-4 py-[10px] text-sm font-medium leading-5 text-[rgba(38,38,38,0.6)]"
              >
                Политика конфиденциальности
              </a>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[rgba(38,38,38,0.05)] py-[10px] pl-4 pr-[10px] text-sm font-medium leading-5 text-[#262626]"
            >
              Russian
              <span className="relative size-5">
                <img
                  alt=""
                  className="absolute inset-0 size-full"
                  src={ASSETS.iconChevronDownSm}
                />
              </span>
            </button>
          </div>
          <div className="flex w-full flex-col gap-2 px-4 py-2 text-sm font-normal leading-5 text-[#252525] sm:flex-row sm:items-start sm:justify-between">
            <p>
              Связь с нами в Tg:
              <br />
              <span className="text-[rgba(37,37,37,0.5)]">@quicks_team</span>
            </p>
            <p className="text-right">Все права защищены</p>
          </div>
        </div>
      </footer>

      {/* ===== TOP BAR (fixed) ===== */}
      <nav className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-start gap-[18px] overflow-clip rounded-full border border-[rgba(38,38,38,0.05)] bg-[rgba(255,255,255,0.8)] p-3 backdrop-blur-[15px]">
        {/* logo */}
        <div className="flex shrink-0 items-center gap-2 self-stretch px-3 py-[2px]">
          <div className="relative size-7 shrink-0 overflow-hidden">
            <img
              alt="quicks.ai"
              className="absolute left-[-49.22%] top-[-0.32%] h-[100.48%] w-[198.45%] max-w-none"
              src={ASSETS.logo}
            />
          </div>
          <div className="relative h-[22.896px] w-[101.33px] shrink-0">
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src={ASSETS.wordmark}
            />
          </div>
        </div>

        {/* nav buttons */}
        <div className="flex shrink-0 items-center">
          <div className="h-10 w-8 shrink-0 rounded-full" />
          <a
            href="#"
            className="flex shrink-0 items-center rounded-full bg-[rgba(38,38,38,0.05)] px-4 py-[10px] text-sm font-semibold leading-5 text-[#262626]"
          >
            Войти
          </a>
        </div>
        <a
          href="#"
          className="flex shrink-0 items-center rounded-full bg-[#39c] px-4 py-[10px] text-sm font-semibold leading-5 text-white"
        >
          Попробовать
        </a>
      </nav>
    </div>
  );
}
