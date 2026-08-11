function TutorIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="size-7"
    >
      <path
        d="M14 14.5c2.485 0 4.5-2.015 4.5-4.5S16.485 5.5 14 5.5 9.5 7.515 9.5 10s2.015 4.5 4.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6.5 22.5c1.6-2.8 4.2-4.2 7.5-4.2s5.9 1.4 7.5 4.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M19.5 8.5h3.25a1.25 1.25 0 0 1 1.25 1.25V12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M21.25 7.5v3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="size-7"
    >
      <path
        d="M4.5 12.5 14 6.5l9.5 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.5v8.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 21v-5.5h4V21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.5h1.5M16.5 14.5H18M10 17h1.5M16.5 17H18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const POINTS = [
  {
    id: "tutors",
    title: "Better for tutors",
    body: "Help your tutors save time on admin work and stand out with engaging, interactive, personalized learning materials.",
    Icon: TutorIcon,
  },
  {
    id: "school",
    title: "Better for your school",
    body: "Get visibility into every tutor session with centralized analytics and insights across your entire school.",
    Icon: SchoolIcon,
  },
] as const;

export default function SchoolPitchBlock() {
  return (
    <section className="flex w-full shrink-0 flex-col items-center bg-[#141414] px-4 py-12 text-white sm:px-20 sm:py-16">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-10 sm:gap-12">
        <h2 className="max-w-[720px] text-center text-[28px] font-semibold leading-[32px] sm:text-[40px] sm:leading-[44px]">
          Running a language school?
        </h2>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          {POINTS.map(({ id, title, body, Icon }) => (
            <div key={id} className="flex flex-col gap-4 sm:gap-5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#FF7733]">
                <Icon />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-[20px] font-semibold leading-7 sm:text-[24px] sm:leading-8">
                  {title}
                </h3>
                <p className="text-base font-medium leading-6 text-white/55 sm:text-[18px] sm:leading-7">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="mailto:school@quicks.com"
          data-ym-location="en_school_pitch"
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#FF7733] px-6 py-4 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#ff8c4d]"
        >
          Talk to our team
        </a>
      </div>
    </section>
  );
}
