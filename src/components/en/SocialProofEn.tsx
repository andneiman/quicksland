/* eslint-disable @next/next/no-img-element */

const SCHOOLS = [
  { name: "British Council", src: "/schools/british-council.png" },
  { name: "EF Education", src: "/schools/ef.png" },
  { name: "Berlitz", src: "/schools/berlitz.png" },
  { name: "Wall Street English", src: "/schools/wall-street-english.png" },
  { name: "Kaplan", src: "/schools/kaplan.png" },
  { name: "International House", src: "/schools/international-house.png" },
  { name: "Inlingua", src: "/schools/inlingua.png" },
  { name: "Eurocentres", src: "/schools/eurocentres.png" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "ok this actually saves me so much time?? I used to stay up forever making homework after lessons. Now I just check what Quicks generated and tweak a couple things.",
    name: "Sarah M.",
    role: "IELTS tutor, London",
  },
  {
    quote:
      "My students finally do the practice I send them. The flashcards feel like they’re from OUR lesson, not some random textbook exercise.",
    name: "Diego A.",
    role: "Spanish tutor, Madrid",
  },
  {
    quote:
      "I’m not gonna lie I was skeptical about AI. But for summaries + quizzes it’s honestly solid. Still rewrite a bit, but like 20% of the work instead of 100%.",
    name: "Emma C.",
    role: "Business English, Singapore",
  },
  {
    quote:
      "Had a student ask me something weird about case endings at 10pm… answered with the AI chat in like 2 minutes. Felt a bit like cheating lol but it helped.",
    name: "Noah B.",
    role: "German tutor, Berlin",
  },
  {
    quote:
      "Our school is picky about privacy so I asked about recordings first. Once I got that they don’t keep session audio, I was good to go.",
    name: "Amina H.",
    role: "English & Arabic, Dubai",
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

      <div className="flex w-full max-w-[1120px] flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8">
        {SCHOOLS.map((school) => (
          <div
            key={school.name}
            className="flex h-10 items-center justify-center sm:h-11"
            title={school.name}
          >
            <img
              src={school.src}
              alt={school.name}
              className="max-h-9 w-auto max-w-[120px] object-contain opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0 sm:max-h-10 sm:max-w-[140px]"
            />
          </div>
        ))}
      </div>

      <div className="grid w-full max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={[
              "flex flex-col justify-between gap-6 rounded-3xl bg-[rgba(38,38,38,0.04)] p-6 sm:p-8",
              i < 3 ? "lg:col-span-2" : "sm:col-span-1 lg:col-span-3",
            ].join(" ")}
          >
            <blockquote className="text-base font-medium leading-6 text-[#262626] sm:text-[18px] sm:leading-7">
              {t.quote}
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
