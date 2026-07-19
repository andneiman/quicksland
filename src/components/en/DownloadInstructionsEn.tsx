/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DESKTOP_DOWNLOADS,
  detectDesktopOS,
  fetchDownloads,
  latestUrlForOs,
  triggerDesktopDownload,
  type DesktopOS,
} from "@/lib/desktopDownloads";

const MAC_STEPS = [
  {
    image: "/download/mac-step1.png",
    caption: (
      <>
        Open Quicks Assistant.dmg from
        <br />
        your Downloads folder
      </>
    ),
  },
  {
    image: "/download/mac-step2.png",
    caption: (
      <>
        Drag the Quicks Assistant icon
        <br />
        into your Applications folder
      </>
    ),
  },
  {
    image: "/download/mac-step3.png",
    caption: (
      <>
        Open the Quicks Assistant app
        <br />
        from your Applications folder
      </>
    ),
  },
] as const;

const WIN_STEPS = [
  {
    image: "/download/win-step1.png",
    caption: (
      <>
        Open Quicks Assistant from
        <br />
        your Downloads folder
      </>
    ),
  },
  {
    image: "/download/win-step2.png",
    caption: (
      <>
        Run the installer and
        <br />
        follow the instructions
      </>
    ),
  },
] as const;

function DownloadBadge() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[rgba(38,38,38,0.05)] py-2 pl-3 pr-4">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="9" fill="#0095ff" />
        <path
          d="M10 5.5v6.2M10 11.7l-2.4-2.4M10 11.7l2.4-2.4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 14.2h7.6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[13px] font-medium leading-5 text-[#262626]">
        Download started
      </span>
    </div>
  );
}

export default function DownloadInstructionsEn({
  autoStart = true,
  initialUrl,
  initialOs,
  buttonLocation = "en_download_page",
}: {
  autoStart?: boolean;
  initialUrl?: string;
  initialOs?: DesktopOS;
  buttonLocation?: string;
}) {
  const [os, setOs] = useState<DesktopOS>(initialOs ?? "mac");
  const [downloadUrl, setDownloadUrl] = useState(
    initialUrl || DESKTOP_DOWNLOADS[initialOs ?? "mac"]
  );

  useEffect(() => {
    const detected = initialOs ?? detectDesktopOS();
    setOs(detected);

    let cancelled = false;

    async function start() {
      let url = initialUrl;
      if (!url) {
        try {
          const data = await fetchDownloads();
          url = latestUrlForOs(data, detected);
        } catch {
          url = DESKTOP_DOWNLOADS[detected];
        }
      }
      if (cancelled || !url) return;
      setDownloadUrl(url);
      if (autoStart) {
        triggerDesktopDownload(url, { location: buttonLocation });
      }
    }

    // Always resolve latest from API when no explicit url was passed
    const t = window.setTimeout(() => {
      void start();
    }, 150);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [autoStart, buttonLocation, initialOs, initialUrl]);

  const steps = os === "windows" ? WIN_STEPS : MAC_STEPS;

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white text-[#262626]">
      <header className="flex w-full items-center justify-center px-4 py-4 sm:px-8 sm:py-5">
        <Link href="/en" className="flex items-center gap-2">
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
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-10 sm:gap-8 sm:px-8 sm:py-12">
        <div className="flex w-full max-w-[960px] flex-col items-center gap-4 text-center">
          <DownloadBadge />
          <h1 className="text-[28px] font-semibold leading-9 tracking-tight sm:text-[32px] sm:leading-9">
            Thanks for downloading the app!
            <br />
            Just a couple steps left.
          </h1>
          <p className="max-w-[520px] text-[13px] font-normal leading-5 text-[rgba(38,38,38,0.6)]">
            Your download will begin automatically. If it didn&apos;t start,{" "}
            <a
              href={downloadUrl}
              className="text-[#0095ff] hover:underline"
              download
              data-ym-location="en_download_manual"
            >
              download Quicks manually
            </a>
            .
          </p>
        </div>

        <div
          className={[
            "flex w-full max-w-[1120px] flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:gap-10",
            steps.length === 2 ? "sm:max-w-[640px]" : "",
          ].join(" ")}
        >
          {steps.map((step, i) => (
            <div
              key={step.image}
              className="flex w-full max-w-[280px] flex-col items-center gap-3"
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-[#0095ff] text-sm font-bold leading-5 text-white">
                {i + 1}
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-[rgba(38,38,38,0.1)] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <img
                  src={step.image}
                  alt=""
                  className="aspect-[280/180] w-full object-cover"
                />
              </div>
              <p className="text-center text-[13px] font-medium leading-5 text-[rgba(38,38,38,0.6)]">
                {step.caption}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-[11px] leading-4 text-[rgba(38,38,38,0.4)] sm:py-8">
        <p>Have any questions?</p>
        <p>
          Email{" "}
          <a
            href="mailto:school@quicks.com"
            className="text-[rgba(38,38,38,0.6)] hover:underline"
          >
            school@quicks.com
          </a>{" "}
          — we&apos;re here to assist you
        </p>
      </footer>
    </div>
  );
}
