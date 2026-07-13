const YOUTUBE_ID = "PkAuGsxnVsU";

export default function LiveDemoEn() {
  return (
    <section className="flex w-full shrink-0 flex-col items-center gap-8 px-4 py-12 sm:gap-10 sm:px-20 sm:py-16">
      <div className="max-w-[960px] text-center">
        <h2 className="text-[24px] font-semibold leading-[28px] sm:text-[40px] sm:leading-[44px]">
          <span className="text-[rgba(38,38,38,0.4)]">Live demo</span>
          <br />
          What happens after a lesson
        </h2>
        <p className="mt-4 text-base font-medium leading-6 text-[rgba(38,38,38,0.4)] sm:text-[20px] sm:leading-7">
          A real post-lesson case — homework, quizzes, flashcards, and more,
          generated from the session.
        </p>
      </div>

      <div className="w-full max-w-[960px] overflow-hidden rounded-3xl bg-[rgba(38,38,38,0.05)]">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`}
            title="Quicks live demo — post-lesson case"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
