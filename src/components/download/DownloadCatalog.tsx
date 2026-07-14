/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchDownloads,
  formatDownloadDate,
  formatVersion,
  installPathForDownload,
  sortLatestForOs,
  type DownloadItem,
  type DownloadsResponse,
} from "@/lib/desktopDownloads";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .08V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm7 .18l10 .08V21l-10-1.82V13.18z" />
    </svg>
  );
}

function PlatformIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  if (/windows/i.test(platform)) return <WindowsIcon className={className} />;
  return <AppleIcon className={className} />;
}

function detectOsLabel(): "macOS" | "Windows" {
  if (typeof navigator !== "undefined" && navigator.userAgent.includes("Win")) {
    return "Windows";
  }
  return "macOS";
}

function LatestCard({
  item,
  onDownload,
}: {
  item: DownloadItem;
  onDownload: (item: DownloadItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onDownload(item)}
      className="group flex w-full items-center gap-5 rounded-2xl bg-white p-5 text-left shadow-[0_5px_30px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,1)] transition-all hover:shadow-[0_5px_30px_0_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,1)]"
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#0095FF] text-white">
        <PlatformIcon platform={item.platform} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold text-[#262626]">
          {item.platform}
        </span>
        <span className="truncate text-sm text-[rgba(38,38,38,0.5)]">
          {item.arch} · {formatVersion(item.version)} · {item.format}
          {item.date ? (
            <span className="text-[rgba(38,38,38,0.3)]">
              {" "}
              · {formatDownloadDate(item.date)}
            </span>
          ) : null}
        </span>
      </div>
      <span className="flex h-10 shrink-0 items-center justify-center rounded-full bg-[#0095FF] px-6 text-sm font-medium text-white transition-colors group-hover:bg-[#0088e8]">
        Download
      </span>
    </button>
  );
}

function PreviousRow({
  item,
  onDownload,
}: {
  item: DownloadItem;
  onDownload: (item: DownloadItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onDownload(item)}
      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/60"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(38,38,38,0.05)] text-[rgba(38,38,38,0.4)]">
          <PlatformIcon platform={item.platform} className="size-4" />
        </div>
        <span className="text-sm font-medium text-[rgba(38,38,38,0.7)]">
          {item.platform}
        </span>
        <span className="truncate text-sm text-[rgba(38,38,38,0.4)]">
          {item.arch} · {formatVersion(item.version)}
        </span>
      </div>
      <span className="shrink-0 text-xs text-[rgba(38,38,38,0.3)]">
        {item.date ? formatDownloadDate(item.date) : null}
      </span>
    </button>
  );
}

export default function DownloadCatalog() {
  const router = useRouter();
  const [data, setData] = useState<DownloadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPrevious, setShowPrevious] = useState(false);
  const [osLabel] = useState<"macOS" | "Windows">(detectOsLabel);

  useEffect(() => {
    let cancelled = false;
    fetchDownloads()
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const latest = useMemo(
    () => (data ? sortLatestForOs(data.latest, osLabel) : []),
    [data, osLabel]
  );

  const previousGroups = useMemo(() => {
    if (!data) return [];
    const mac = data.previous.filter((i) => i.platform === "macOS").slice(0, 5);
    const win = data.previous
      .filter((i) => i.platform === "Windows")
      .slice(0, 5);
    return osLabel === "Windows"
      ? [
          { label: "Windows", items: win },
          { label: "macOS", items: mac },
        ]
      : [
          { label: "macOS", items: mac },
          { label: "Windows", items: win },
        ];
  }, [data, osLabel]);

  function handleDownload(item: DownloadItem) {
    router.push(installPathForDownload(item));
  }

  return (
    <div className="flex min-h-dvh w-full items-start justify-center overflow-auto bg-[#f2f2f2] text-[#262626]">
      <div className="flex w-full max-w-[540px] flex-col items-center gap-10 px-6 py-16">
        <header className="flex flex-col items-center gap-4">
          <img
            src="/logo.png"
            alt="Quicks"
            width={64}
            height={64}
            className="size-16 object-contain"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-3xl font-bold">Quicks App</h1>
            <p className="text-sm text-[rgba(38,38,38,0.5)]">
              It records your lessons and automatically creates
              <br />
              homework, quizzes, flashcards, and much more
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex w-full flex-col gap-3">
            <div className="h-[88px] animate-pulse rounded-2xl bg-white/60" />
            <div className="h-[88px] animate-pulse rounded-2xl bg-white/60" />
          </div>
        ) : latest.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {latest.map((item) => (
              <LatestCard
                key={`${item.platform}-${item.version}-${item.url}`}
                item={item}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[rgba(38,38,38,0.5)]">
            Couldn&apos;t load downloads. Please try again later.
          </p>
        )}

        {data && data.previous.length > 0 ? (
          <div className="flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowPrevious((v) => !v)}
              className="flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-wide text-[rgba(38,38,38,0.3)] transition-colors hover:text-[rgba(38,38,38,0.5)]"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={[
                  "transition-transform",
                  showPrevious ? "rotate-90" : "",
                ].join(" ")}
                aria-hidden
              >
                <path
                  d="M4.5 2.5L8 6L4.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous versions
            </button>

            {showPrevious ? (
              <div className="flex flex-col gap-4">
                {previousGroups.map(
                  (group) =>
                    group.items.length > 0 && (
                      <div
                        key={group.label}
                        className="flex flex-col gap-0.5 rounded-2xl bg-white/30 p-1"
                      >
                        <div className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-[rgba(38,38,38,0.3)]">
                          {group.label}
                        </div>
                        {group.items.map((item) => (
                          <PreviousRow
                            key={`${item.platform}-${item.version}-${item.url}`}
                            item={item}
                            onDownload={handleDownload}
                          />
                        ))}
                      </div>
                    )
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        <footer className="text-center text-xs text-[rgba(38,38,38,0.3)]">
          Have questions?{" "}
          <a
            href="mailto:school@quicks.com"
            className="underline hover:text-[rgba(38,38,38,0.5)]"
          >
            school@quicks.com
          </a>
        </footer>
      </div>
    </div>
  );
}
