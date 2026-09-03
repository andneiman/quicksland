import { reachGoal, trackFileDownload, trackOutboundClick } from "@/lib/metrika";

export const DOWNLOADS_API = "https://api-3.quicks.ai/downloads";

export const WINDOWS_STORE_URL =
  "https://apps.microsoft.com/detail/xp9ckw1mtb07tv";

/** Fallback if API is unreachable — keep in sync with api-3 latest */
export const DESKTOP_DOWNLOADS = {
  mac: "https://hel1.your-objectstorage.com/quicks-recordings/updates/recorder/Quicks-Assistant-0.3.0-aarch64.dmg",
  windows:
    "https://hel1.your-objectstorage.com/quicks-recordings/updates/recorder/Quicks-Assistant-0.3.0-x86_64-setup.exe",
} as const;

export type DesktopOS = "mac" | "windows";

export type DownloadItem = {
  platform: string;
  arch: string;
  version: string;
  format: string;
  date: string;
  url: string;
};

export type DownloadsResponse = {
  latest: DownloadItem[];
  previous: DownloadItem[];
};

export function detectDesktopOS(
  userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""
): DesktopOS {
  if (/Win/i.test(userAgent)) return "windows";
  return "mac";
}

export function platformToOs(platform: string): DesktopOS {
  return /windows/i.test(platform) ? "windows" : "mac";
}

export function formatVersion(version: string) {
  return /^\d/.test(version) ? `v${version}` : version;
}

export function formatDownloadDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function sortLatestForOs(items: DownloadItem[], osLabel: "macOS" | "Windows") {
  return [...items].sort((a, b) => {
    if (a.platform === osLabel && b.platform !== osLabel) return -1;
    if (a.platform !== osLabel && b.platform === osLabel) return 1;
    return 0;
  });
}

export async function fetchDownloads(): Promise<DownloadsResponse> {
  const res = await fetch(DOWNLOADS_API, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch downloads");
  return res.json();
}

export function latestUrlForOs(
  data: DownloadsResponse | null | undefined,
  os: DesktopOS
): string {
  const platform = os === "windows" ? "Windows" : "macOS";
  const match = data?.latest.find(
    (item) => item.platform.toLowerCase() === platform.toLowerCase()
  );
  return match?.url ?? DESKTOP_DOWNLOADS[os];
}

export function latestItemForOs(
  data: DownloadsResponse | null | undefined,
  os: DesktopOS
): DownloadItem | undefined {
  const platform = os === "windows" ? "Windows" : "macOS";
  return data?.latest.find(
    (item) => item.platform.toLowerCase() === platform.toLowerCase()
  );
}

export function openWindowsStore(opts?: { location?: string }) {
  const location = opts?.location || "unknown";
  reachGoal("windows_store", {
    url: WINDOWS_STORE_URL,
    button_location: location,
  });
  trackOutboundClick({
    url: WINDOWS_STORE_URL,
    location,
  });
  window.location.assign(WINDOWS_STORE_URL);
}

export function triggerDesktopDownload(
  url: string,
  opts?: { location?: string; track?: boolean }
) {
  if (!url) return;
  if (opts?.track !== false) {
    trackFileDownload({
      url,
      location: opts?.location || "auto_download",
    });
  }
  // Cross-origin: hidden iframe keeps the instructions page open
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
  window.setTimeout(() => iframe.remove(), 60_000);
}

export function installPathForDownload(
  item: DownloadItem,
  opts?: { autoStart?: boolean; from?: string; direct?: boolean }
) {
  const platform = platformToOs(item.platform);
  const params = new URLSearchParams({
    url: item.url,
    platform,
  });
  if (opts?.autoStart === false) params.set("autostart", "0");
  if (opts?.from) params.set("from", opts.from);
  if (opts?.direct) params.set("direct", "1");
  return `/en/download?${params.toString()}`;
}
