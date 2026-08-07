/* eslint-disable @next/next/no-img-element */

const BLOCKS = [
  {
    id: "private",
    title: (
      <>
        Private from the start,
        <br />
        share when you&apos;re ready.
      </>
    ),
    description:
      "Your lessons are just for you. Find, refine, and review them—then share them whenever and however you choose.",
    image: "/en2/private.png",
    imageAlt: "Invite to collaborate — share notes when you're ready",
  },
  {
    id: "compatible",
    title: <>Compatible with every way you meet</>,
    description:
      "Whether it’s Zoom, Google Meet, Teams, Huddles, in-person, on-the-go: capture conversations wherever it happens.",
    image: "/en2/compatible.png",
    imageAlt: "Works with Zoom, Google Meet, and Microsoft Teams",
  },
  {
    id: "listens",
    title: (
      <>
        Listens to lessons.
        <br />
        Helps with what&apos;s next.
      </>
    ),
    description:
      "Quicks AI assistant listens in the background, and helps with next steps, creates homework, and summarizes student progress.",
    image: "/en2/listens.png",
    imageAlt: "Quicks listening during a lesson and helping with next steps",
  },
] as const;

export default function FeatureStoryBlocks() {
  return (
    <>
      {BLOCKS.map((block) => (
        <section
          key={block.id}
          className="flex w-full shrink-0 flex-col items-center gap-8 bg-white px-4 py-10 sm:gap-12 sm:px-20 sm:py-16"
        >
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:gap-12">
            <h2
              className="flex-1 text-[24px] font-semibold leading-[28px] text-[#262626] sm:text-[32px] sm:leading-[40px]"
              style={{ fontFeatureSettings: "'ss01' 1" }}
            >
              {block.title}
            </h2>
            <p
              className="flex-1 text-base font-medium leading-6 text-[rgba(38,38,38,0.4)] sm:text-[24px] sm:leading-8"
              style={{ fontFeatureSettings: "'ss01' 1" }}
            >
              {block.description}
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-3xl">
            <img
              src={block.image}
              alt={block.imageAlt}
              width={2048}
              height={864}
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
      ))}
    </>
  );
}
