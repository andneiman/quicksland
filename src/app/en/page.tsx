/* eslint-disable @next/next/no-img-element */

import HeroPreviewEn from "@/components/en/HeroPreviewEn";
import FAQEn from "@/components/en/FAQEn";
import FooterEn from "@/components/en/FooterEn";

const ASSETS = {
  shadow:
    "https://www.figma.com/api/mcp/asset/ba931cf3-1aec-4e15-a1d6-290245b64899",
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
};

const FEATURES: { bg: string; icon: string; label: string }[] = [
  { bg: "#ff6467", icon: ASSETS.iconMic, label: "Recordings" },
  { bg: "#2b7fff", icon: ASSETS.iconSubtitles, label: "Quizzes" },
  { bg: "#00c950", icon: ASSETS.iconCards, label: "Flashcards" },
  { bg: "#fdc700", icon: ASSETS.iconChecklist, label: "Homework" },
  { bg: "#ad46ff", icon: ASSETS.iconWave, label: "Chat" },
  { bg: "#ee78d0", icon: ASSETS.iconParagraph, label: "Summaries" },
  { bg: "#2b7fff", icon: ASSETS.iconPencil, label: "Canvas" },
  { bg: "#00d5be", icon: ASSETS.iconMic, label: "Audio tasks" },
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

export default function HomeEn() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center overflow-clip bg-white text-[#262626]">
      {/* ── gradient background ── */}
      <div className="pointer-events-none absolute left-0 top-0 h-[221px] w-full bg-gradient-to-b from-[#eee] to-white" />

      {/* ── spacer for fixed top-bar ── */}
      <div className="h-[72px] w-full shrink-0 sm:h-24" />

      {/* ===== HERO ===== */}
      <section className="relative flex w-full shrink-0 flex-col items-center gap-10 overflow-clip px-4 py-12 sm:px-20 sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-[296px] z-0 h-[513px] w-[529px] -translate-x-1/2 sm:bottom-[-167px] sm:left-[8.44%] sm:right-[10%] sm:top-auto sm:h-[921px] sm:w-auto sm:translate-x-0">
          <div className="absolute inset-[-38.99%_-37.81%] sm:inset-[-21.72%_-19.16%]">
            <img
              alt=""
              className="block size-full max-w-none"
              src={ASSETS.shadow}
            />
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col items-center gap-6 sm:gap-10 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-[32px] font-semibold leading-[36px] tracking-[0px] sm:text-[64px] sm:font-medium sm:leading-[68px]">
              AI&nbsp;assistant
              <br />
              for tutors
            </h1>
            <p className="text-base font-medium leading-6 sm:text-[20px] sm:leading-7">
              It records your lessons and automatically creates{" "}
              <br className="hidden sm:inline" />
              <span className="font-medium text-[#ef4444]">
                homework
              </span>
              ,{" "}
              <span className="font-medium text-[#38bdf8]">quizzes</span>,{" "}
              <span className="font-medium text-[#e879f9]">flashcards</span>,
              and much more
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 sm:w-auto">
            <a
              href="https://calendly.com/riaistesting/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#39c] px-6 py-4 text-base font-medium leading-6 text-white sm:w-auto sm:font-semibold"
            >
              Try for free
            </a>
            <p className="text-center text-sm font-normal leading-5 text-[#262626]">
              Book a 15-minute demo and get free access
            </p>
          </div>

          <HeroPreviewEn />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 flex w-full shrink-0 flex-col items-center gap-10 bg-white px-4 py-12 sm:px-20 sm:py-16">
        <div className="max-w-[960px] text-center text-[24px] font-semibold leading-[28px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">
            Free up more time for yourself
          </span>
          <br />
          and make your lessons more effective and engaging
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-1">
            <div className="flex h-[180px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#fdf5e2] p-6 sm:col-span-2 sm:h-[220px] sm:p-8">
              <p className="text-[40px] font-semibold leading-[44px] sm:text-[56px] sm:leading-[60px]">85%</p>
              <p className="text-base font-medium leading-6 sm:text-[20px] sm:leading-7">
                Saves time on lesson prep
              </p>
            </div>
            <div className="flex h-[180px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#f3f9fe] p-6 sm:h-[220px] sm:p-8">
              <p className="text-[40px] font-semibold leading-[44px] sm:text-[56px] sm:leading-[60px]">138%</p>
              <p className="text-base font-medium leading-6 sm:text-[20px] sm:leading-7">
                Deeper learning
              </p>
            </div>
            <div className="flex h-[180px] flex-col items-start justify-between overflow-clip rounded-3xl bg-[#fcf3f1] p-6 sm:h-[220px] sm:p-8">
              <p className="text-[40px] font-semibold leading-[44px] sm:text-[56px] sm:leading-[60px]">190%</p>
              <p className="text-base font-medium leading-6 sm:text-[20px] sm:leading-7">
                Higher engagement
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-10 overflow-clip rounded-3xl bg-[rgba(38,38,38,0.05)] p-6 sm:p-8 lg:h-[448px] lg:flex-row">
            <div className="flex w-full flex-1 items-center justify-center self-stretch overflow-hidden rounded-[20px] px-2 py-5 sm:px-6">
              <div className="flex w-full max-w-[358px] flex-wrap content-center items-center justify-center gap-[6px]">
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={156} />
                  <Placeholder w={156} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={95} />
                  <FeatureTag {...FEATURES[0]} />
                  <Placeholder w={94} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={84} />
                  <FeatureTag {...FEATURES[1]} />
                  <FeatureTag {...FEATURES[2]} />
                  <Placeholder w={84} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={65} />
                  <FeatureTag {...FEATURES[3]} />
                  <FeatureTag {...FEATURES[4]} />
                  <Placeholder w={65} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={80} />
                  <FeatureTag {...FEATURES[5]} />
                  <FeatureTag {...FEATURES[6]} />
                  <Placeholder w={80} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={112} />
                  <FeatureTag {...FEATURES[7]} />
                  <Placeholder w={112} />
                </div>
                <div className="flex shrink-0 gap-[6px]">
                  <Placeholder w={120} />
                  <Placeholder w={120} />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-start justify-center gap-6 self-stretch p-2 sm:p-6">
              <div className="flex w-full flex-col gap-4">
                <h3 className="text-[28px] font-semibold leading-[32px] sm:text-[40px] sm:leading-[44px]">
                  The only AI
                  <br />
                  you need
                </h3>
                <p className="text-base font-medium leading-6 text-[rgba(38,38,38,0.4)] sm:text-[20px] sm:leading-7">
                  The essential toolkit
                  <br />
                  for modern tutoring
                </p>
              </div>
              <a
                href="https://calendly.com/riaistesting/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#39c] px-6 py-4 text-base font-medium leading-6 text-white sm:w-auto"
              >
                Try for free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="flex w-full shrink-0 flex-col items-center gap-10 px-4 py-10 sm:px-20">
        <div className="max-w-[960px] text-center text-[24px] font-semibold leading-[28px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">Got questions?</span>
          <br />
          We&apos;d be happy to help
        </div>

        <FAQEn />
      </section>

      {/* ===== CTA ===== */}
      <section className="flex w-full shrink-0 flex-col items-center justify-center px-4 pb-16 pt-4 sm:px-20 sm:pb-20">
        <h2 className="text-center text-[28px] font-semibold leading-[32px] sm:text-[40px] sm:leading-[44px]">
          Ready to start?
        </h2>
        <a
          href="https://calendly.com/riaistesting/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#39c] px-6 py-4 text-base font-semibold leading-6 text-white sm:w-auto"
        >
          Try for free
        </a>
      </section>

      {/* ===== FOOTER ===== */}
      <FooterEn />

      {/* ===== TOP BAR ===== */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-[rgba(255,255,255,0.8)] px-4 py-3 backdrop-blur-[15px] sm:left-1/2 sm:top-4 sm:w-auto sm:-translate-x-1/2 sm:gap-[18px] sm:overflow-clip sm:rounded-full sm:border sm:border-[rgba(38,38,38,0.05)] sm:p-3">
        <div className="flex shrink-0 items-center gap-2 sm:px-3 sm:py-1">
          <img
            alt="quicks.ai"
            src="/logo.png"
            width={32}
            height={32}
            className="size-8 shrink-0"
          />
          <img
            alt="quicks"
            src="/wordmark.svg"
            width={80}
            height={26}
            className="h-[26px] w-[80px] shrink-0"
          />
        </div>

        <a
          href="https://calendly.com/riaistesting/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center rounded-full bg-[#39c] px-4 py-[10px] text-sm font-semibold leading-5 text-white"
        >
          Try now
        </a>
      </nav>
    </div>
  );
}
