/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function LegalPage({
  html,
  backHref = "/main",
}: {
  html: string;
  backHref?: string;
}) {
  return (
    <div className="min-h-dvh bg-white text-[#262626]">
      <header className="mx-auto flex w-full max-w-[800px] items-center justify-between px-6 py-5 sm:px-8">
        <Link href={backHref} className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Quicks"
            width={28}
            height={28}
            className="size-7"
          />
          <img
            src="/wordmark.svg"
            alt="quicks"
            width={80}
            height={26}
            className="h-[22px] w-auto"
          />
        </Link>
        <a
          href="mailto:support@quicks.com"
          className="text-sm font-medium text-[rgba(38,38,38,0.5)] hover:text-[#262626]"
        >
          support@quicks.com
        </a>
      </header>

      <main className="mx-auto w-full max-w-[800px] px-6 pb-16 pt-4 sm:px-8 sm:pb-24 sm:pt-8">
        <article
          className="legal-doc"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <footer className="mx-auto flex w-full max-w-[800px] flex-wrap items-center gap-x-4 gap-y-2 px-6 pb-10 text-sm text-[rgba(38,38,38,0.4)] sm:px-8">
        <Link href="/privacy" className="hover:text-[#262626]">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-[#262626]">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
