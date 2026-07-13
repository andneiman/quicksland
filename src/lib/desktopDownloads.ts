export const DESKTOP_DOWNLOADS = {
  mac: "https://hel1.your-objectstorage.com/quicks-recordings/updates/recorder/Quicks-Assistant-0.2.80-aarch64.dmg",
  windows:
    "https://hel1.your-objectstorage.com/quicks-recordings/updates/recorder/Quicks-Assistant-0.2.81-x86_64-setup.exe",
} as const;

export type DesktopOS = "mac" | "windows";

export function detectDesktopOS(
  userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""
): DesktopOS {
  if (/Windows/i.test(userAgent)) return "windows";
  return "mac";
}

export function triggerDesktopDownload(os: DesktopOS) {
  const url = DESKTOP_DOWNLOADS[os];
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
