/* eslint-disable @next/next/no-img-element */

const SCHOOLS = [
  "British Council",
  "EF Education",
  "Berlitz",
  "Wall Street English",
  "Kaplan",
  "International House",
  "Inlingua",
  "Eurocentres",
  "LanguageLink",
  "Open English",
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Quicks cuts my prep time in half. I finish a lesson and homework is already ready for my students.",
    name: "Sarah Mitchell",
    role: "IELTS tutor · London",
  },
  {
    quote:
      "Flashcards and quizzes from real lesson recordings feel personal — my students actually use them.",
    name: "Diego Alvarez",
    role: "Spanish tutor · Madrid",
  },
  {
    quote:
      "I used to spend evenings rewriting notes. Now Quicks drafts everything while I focus on teaching.",
    name: "Emma Chen",
    role: "Business English · Singapore",
  },
  {
    quote:
      "The AI chat helps me explain tough grammar between sessions. It’s like having a co-teacher on call.",
    name: "Noah Berger",
    role: "German tutor · Berlin",
  },
  {
    quote:
      "Privacy mattered to my school. Knowing recordings aren’t stored made it easy to adopt Quicks.",
    name: "Amina Hassan",
    role: "Arabic & English · Dubai",
  },
] as const;

export default function SocialProofEn() {
  return (
    <section className="flex w-full shrink-0 flex-col items-center gap-10 px-4 py-12 sm:gap-12 sm:px-20 sm:py-16">
      <div className="max-w-[960px] text-center">
        <h2 className="text-[24px] font-semibold leading-[28px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">Loved by tutors</span>
          <br />
          at top language schools
        </h2>
      </div>

      {/* School logos — typographic wordmarks */}
      <div className="flex w-full max-w-[1120px] flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 sm:gap-y-6">
        {SCHOOLS.map((name) => (
          <span
            key={name}
            className="select-none whitespace-nowrap text-[13px] font-semibold tracking-[-0.02em] text-[rgba(38,38,38,0.28)] sm:text-[15px]"
            style={{ fontFeatureSettings: "'ss01' 1" }}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Tutor testimonials */}
      <div className="grid w-full max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={[
              "flex flex-col justify-between gap-6 rounded-3xl bg-[rgba(38,38,38,0.04)] p-6 sm:p-8",
              // 3 on first row (2 cols each of 6), 2 on second row centered-ish
              i < 3 ? "lg:col-span-2" : "sm:col-span-1 lg:col-span-3",
            ].join(" ")}
          >
            <blockquote className="text-base font-medium leading-6 text-[#262626] sm:text-[18px] sm:leading-7">
              “{t.quote}”
            </blockquote>
            <figcaption className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold leading-5 text-[#262626]">
                {t.name}
              </span>
              <span className="text-sm font-medium leading-5 text-[rgba(38,38,38,0.4)]">
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
