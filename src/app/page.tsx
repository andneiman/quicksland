import Image from "next/image";

const imgScaledRasterImage =
  "https://www.figma.com/api/mcp/asset/82eee940-abd8-4db4-9015-e8672486769d";
const imgLogo =
  "https://www.figma.com/api/mcp/asset/02e70d3d-ce48-4d4d-be19-ae5ac41c60e2";
const imgShadow =
  "https://www.figma.com/api/mcp/asset/fd95953a-a863-4e98-b497-802b6bd059d7";
const imgIconMic =
  "https://www.figma.com/api/mcp/asset/a4ded39f-b71b-46c5-a89d-6ec117b5c2a0";
const imgIconSubtitles =
  "https://www.figma.com/api/mcp/asset/5300f97c-f107-485d-b139-38fa78c0908a";
const imgIconCards =
  "https://www.figma.com/api/mcp/asset/143950c8-c1d8-40e6-9bc3-4f5a256533fc";
const imgIconChecklist =
  "https://www.figma.com/api/mcp/asset/04d4c20e-3327-4620-b989-900c4273e0b8";
const imgIconWave =
  "https://www.figma.com/api/mcp/asset/24ece0e2-60c8-470f-ad96-be65bbe132cf";
const imgIconParagraph =
  "https://www.figma.com/api/mcp/asset/cde9939e-cc6a-4e11-a005-863cf65f05ca";
const imgIconPencil =
  "https://www.figma.com/api/mcp/asset/13564240-5193-4d41-8773-470558945689";
const imgIconChevronUp =
  "https://www.figma.com/api/mcp/asset/56372041-f285-41c5-95ee-09230c834478";
const imgDivider =
  "https://www.figma.com/api/mcp/asset/c4800c3b-af67-49c0-a977-daed4218a62e";
const imgIconChevronDown =
  "https://www.figma.com/api/mcp/asset/34c2805b-a824-4f64-9ae6-156272e94716";
const imgIconChevronDownSmall =
  "https://www.figma.com/api/mcp/asset/4a6ecec0-eb70-4fb9-8731-9eae2b1c0072";
const imgUnion =
  "https://www.figma.com/api/mcp/asset/4583f0ec-cffa-4d90-947b-f14eb9d084bd";

function Pill({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-base font-medium shadow-[0px_0px_6px_rgba(0,0,0,0.02),0px_2px_4px_rgba(0,0,0,0.08)]",
        active ? "bg-[#39c] text-white" : "bg-white text-[rgba(38,38,38,0.6)]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function FeatureTag({
  bg,
  iconSrc,
  children,
}: {
  bg: string;
  iconSrc: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-base font-bold text-white"
      style={{ backgroundColor: bg }}
    >
      <Image src={iconSrc} alt="" width={24} height={24} unoptimized />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-white text-[#262626]">
      {/* top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-gradient-to-b from-[#eee] to-white" />

      {/* top bar */}
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-[18px] rounded-full border border-[rgba(38,38,38,0.05)] bg-[rgba(255,255,255,0.8)] p-3 backdrop-blur-[15px]">
        <div className="flex items-center gap-2 self-stretch px-3 py-[2px]">
          <div className="relative size-7 overflow-hidden">
            <Image
              src={imgLogo}
              alt="quicks.ai"
              width={28}
              height={28}
              className="h-full w-full object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="relative h-[22.896px] w-[101.33px]">
            <Image src={imgUnion} alt="" fill className="object-contain" unoptimized />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-10 w-8 rounded-full" aria-hidden />
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[rgba(38,38,38,0.05)] px-4 py-2 text-sm font-semibold text-[#262626]"
          >
            Войти
          </a>
        </div>

        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-[#39c] px-4 py-2 text-sm font-semibold text-white"
        >
          Попробовать
        </a>
      </div>

      <main className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 pb-20 pt-24 sm:px-6">
        {/* hero card */}
        <section className="relative w-full px-4 py-10 sm:px-8 sm:py-16">
          <div className="pointer-events-none absolute inset-x-0 -bottom-44 mx-auto hidden h-[921px] max-w-[1100px] sm:block">
            <Image src={imgShadow} alt="" fill className="object-contain" unoptimized />
          </div>

          <div className="relative mx-auto flex w-full flex-col items-center gap-10 rounded-[24px] p-4 sm:p-8">
            <div className="flex w-full max-w-[960px] flex-col items-center gap-4 text-center">
              <h1 className="text-balance text-[44px] font-medium leading-[1.05] tracking-[0px] sm:text-[64px] sm:leading-[68px]">
                ИИ ассистент
                <br />
                для преподавателей
              </h1>

              <p className="text-balance text-[18px] font-medium leading-7 text-[#262626] sm:text-[20px]">
                Записывает ваши уроки и автоматические создает <br />
                <span className="text-[#ef4444]">домашние задания</span>,{" "}
                <span className="text-[#38bdf8]">квизы</span>,{" "}
                <span className="text-[#e879f9]">флэшкарты</span> и многое другое
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-[#39c] px-6 py-4 text-base font-semibold text-white"
              >
                Попробовать бесплатно
              </a>
              <p className="text-center text-sm text-[#262626]">
                запишитесь на 15-минутный демо и получите бесплатный доступ
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Pill>Домашка</Pill>
                <Pill>Флешкарты</Pill>
                <Pill active>Чат</Pill>
              </div>

              <div className="relative w-full max-w-[1024px] overflow-hidden rounded-3xl border border-[#262626]">
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={imgScaledRasterImage}
                    alt="Превью продукта"
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* stats + features */}
        <section className="w-full px-4 py-10 sm:px-8 sm:py-16">
          <h2 className="mx-auto max-w-[960px] text-center text-[32px] font-semibold leading-[1.1] text-[#262626] sm:text-[40px] sm:leading-[44px]">
            <span className="text-[rgba(38,38,38,0.4)]">Освободите время на себя</span>
            <br />
            и сделайте занятия эффективнее и интереснее
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-[#fdf5e2] p-8 sm:col-span-2">
              <div className="text-[56px] font-semibold leading-[60px]">85%</div>
              <div className="text-[20px] font-medium leading-7">
                Экономия времени на создании материалов
              </div>
            </div>

            <div className="flex h-full flex-col justify-between rounded-3xl bg-[#f3f9fe] p-8">
              <div className="text-[56px] font-semibold leading-[60px]">138%</div>
              <div className="text-[20px] font-medium leading-7">Усвоение материала</div>
            </div>

            <div className="flex h-full flex-col justify-between rounded-3xl bg-[#fcf3f1] p-8">
              <div className="text-[56px] font-semibold leading-[60px]">190%</div>
              <div className="text-[20px] font-medium leading-7">Рост вовлеченности</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-10 rounded-3xl bg-[rgba(38,38,38,0.05)] p-8 lg:grid-cols-2 lg:gap-10">
            {/* left: tags mock */}
            <div className="flex items-center justify-center">
              <div className="flex max-w-[420px] flex-wrap items-center justify-center gap-2">
                <span className="h-11 w-[156px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <span className="h-11 w-[156px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <span className="h-11 w-[95px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <FeatureTag bg="#ff6467" iconSrc={imgIconMic}>
                  Запись лекций
                </FeatureTag>

                <span className="h-11 w-[94px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <span className="h-11 w-[84px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <FeatureTag bg="#2b7fff" iconSrc={imgIconSubtitles}>
                  Квизы
                </FeatureTag>
                <FeatureTag bg="#00c950" iconSrc={imgIconCards}>
                  Флэшкарты
                </FeatureTag>
                <span className="h-11 w-[84px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <span className="h-11 w-[65px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <FeatureTag bg="#fdc700" iconSrc={imgIconChecklist}>
                  Проверка домашки
                </FeatureTag>
                <FeatureTag bg="#ad46ff" iconSrc={imgIconWave}>
                  Чат
                </FeatureTag>
                <span className="h-11 w-[65px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <span className="h-11 w-[80px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <FeatureTag bg="#ee78d0" iconSrc={imgIconParagraph}>
                  Саммери
                </FeatureTag>
                <FeatureTag bg="#2b7fff" iconSrc={imgIconPencil}>
                  Заметки
                </FeatureTag>
                <span className="h-11 w-[80px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <span className="h-11 w-[112px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <FeatureTag bg="#00d5be" iconSrc={imgIconMic}>
                  Голосовые задания
                </FeatureTag>
                <span className="h-11 w-[112px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />

                <span className="h-11 w-[120px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
                <span className="h-11 w-[120px] rounded-[14px] bg-[rgba(38,38,38,0.05)]" />
              </div>
            </div>

            {/* right: copy + button */}
            <div className="flex flex-col items-start justify-center gap-6">
              <div>
                <h3 className="text-balance text-[32px] font-semibold leading-[1.1] sm:text-[40px] sm:leading-[44px]">
                  Единственный ИИ, <br />
                  который вам нужен
                </h3>
                <p className="mt-4 text-[18px] font-medium leading-7 text-[rgba(38,38,38,0.4)] sm:text-[20px]">
                  Набор инструментов необходимый <br />
                  для современного преподавания
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-2xl bg-[#39c] px-6 py-4 text-base font-medium text-white"
              >
                Попробовать бесплатно
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full px-4 py-10 sm:px-8 sm:py-10">
          <h2 className="mx-auto max-w-[960px] text-center text-[32px] font-semibold leading-[1.1] sm:text-[40px] sm:leading-[44px]">
            <span className="text-[rgba(38,38,38,0.4)]">
              Есть вопросы?
              <br />
            </span>
            <span className="text-[#262626]">С радостью отвечаем</span>
          </h2>

          <div className="mx-auto mt-10 w-full max-w-[720px] rounded-3xl bg-[rgba(37,37,37,0.05)] px-8 pb-8 pt-8">
            <div className="flex items-start gap-4">
              <Image src={imgIconChevronUp} alt="" width={28} height={28} unoptimized />
              <div className="flex-1">
                <div className="text-[20px] font-medium leading-7">
                  Для чего мне ИИ ассистент?
                </div>
                <div className="mt-2 text-[20px] font-medium leading-7 text-[rgba(38,38,38,0.4)]">
                  ИИ ассистент помогает экономить время, создавая учебные материалы,
                  проверяя домашку и много другое
                </div>
              </div>
            </div>

            <div className="my-4">
              <Image src={imgDivider} alt="" width={656} height={16} className="h-4 w-full" unoptimized />
            </div>

            {[
              "Сколько это стоит?",
              "А что с конфиденциальностью?",
              "У меня другой вопрос, куда писать?",
            ].map((q) => (
              <div key={q}>
                <div className="flex items-start gap-4 py-0">
                  <Image
                    src={imgIconChevronDown}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                  />
                  <div className="flex-1 text-[20px] font-medium leading-7">{q}</div>
                </div>
                <div className="my-4">
                  <Image
                    src={imgDivider}
                    alt=""
                    width={656}
                    height={16}
                    className="h-4 w-full"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* final CTA */}
        <section className="w-full px-4 pb-10 pt-10 sm:px-8">
          <div className="flex flex-col items-center justify-center pb-20">
            <h2 className="text-center text-[32px] font-semibold leading-[1.1] sm:text-[40px] sm:leading-[44px]">
              Готовы начать?
            </h2>
            <a
              href="#"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#39c] px-6 py-4 text-base font-semibold text-white"
            >
              Попробовать бесплатно
            </a>
          </div>
        </section>

        {/* footer */}
        <footer className="w-full px-4 sm:px-8">
          <div className="rounded-3xl p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-[rgba(38,38,38,0.05)] px-4 py-2 text-sm font-medium text-[#262626]"
                >
                  Условия использования
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-[rgba(38,38,38,0.6)]"
                >
                  Политика конфиденциальности
                </a>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[rgba(38,38,38,0.05)] py-2 pl-4 pr-2 text-sm font-medium text-[#262626]"
              >
                Russian
                <Image
                  src={imgIconChevronDownSmall}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-2 px-4 py-2 text-sm text-[#252525] sm:flex-row sm:items-end sm:justify-between">
              <p className="leading-5">
                Связь с нами в Tg:
                <br />
                <span className="text-[rgba(37,37,37,0.5)]">@quicks_team</span>
              </p>
              <p className="text-right leading-5">Все права защищены</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
