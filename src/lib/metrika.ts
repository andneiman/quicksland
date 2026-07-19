export const YANDEX_METRIKA_ID = 110820533;

export type MetrikaParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

export function isMetrikaHost(hostname: string) {
  return (
    hostname === "quicks.school" ||
    hostname.endsWith(".quicks.school") ||
    hostname === "localhost" ||
    hostname.endsWith(".vercel.app")
  );
}

export function localeFromPath(pathname: string): "en" | "ru" | "other" {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/download" || pathname.startsWith("/download/")) return "en";
  return "other";
}

export function isEnTrackPath(pathname: string) {
  return localeFromPath(pathname) === "en";
}

export function isRuTrackPath(pathname: string) {
  return localeFromPath(pathname) === "ru";
}

export function fileNameFromUrl(url: string) {
  try {
    const path = new URL(url, "https://quicks.school").pathname;
    const name = path.split("/").filter(Boolean).pop();
    return name ? decodeURIComponent(name) : url;
  } catch {
    return url;
  }
}

export function isFileDownloadUrl(url: string) {
  try {
    const parsed = new URL(url, "https://quicks.school");
    return /\.(dmg|exe|msi|pkg|zip|appimage|deb|rpm)(?:$|[?#])/i.test(
      parsed.pathname
    );
  } catch {
    return false;
  }
}

export function isDemoBookingUrl(url: string) {
  try {
    const host = new URL(url, "https://quicks.school").hostname;
    return host === "planerka.app" || host.endsWith(".planerka.app");
  } catch {
    return false;
  }
}

export function isExternalUrl(url: string, currentHost: string) {
  try {
    const parsed = new URL(url, `https://${currentHost}`);
    if (
      parsed.protocol === "mailto:" ||
      parsed.protocol === "tel:" ||
      parsed.protocol === "javascript:"
    ) {
      return false;
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    return parsed.hostname !== currentHost;
  } catch {
    return false;
  }
}

/** Safe wrapper — never throws if Metrika is blocked or missing. */
export function reachGoal(target: string, params?: MetrikaParams) {
  try {
    if (typeof window === "undefined" || typeof window.ym !== "function") {
      return;
    }
    if (params) {
      window.ym(YANDEX_METRIKA_ID, "reachGoal", target, params);
    } else {
      window.ym(YANDEX_METRIKA_ID, "reachGoal", target);
    }
  } catch {
    // ignore
  }
}

export function trackHit(
  url: string,
  options?: {
    title?: string;
    referer?: string;
    params?: MetrikaParams;
  }
) {
  try {
    if (typeof window === "undefined" || typeof window.ym !== "function") {
      return;
    }
    window.ym(YANDEX_METRIKA_ID, "hit", url, {
      title: options?.title ?? document.title,
      referer: options?.referer ?? document.referrer,
      params: options?.params,
    });
  } catch {
    // ignore
  }
}

export function trackFileDownload(opts: {
  url: string;
  fileName?: string;
  location: string;
}) {
  reachGoal("file_download", {
    file_url: opts.url,
    file_name: opts.fileName || fileNameFromUrl(opts.url),
    button_location: opts.location,
  });
}

export function trackBookCallClick(opts: { url: string; location: string }) {
  reachGoal("book_call_click", {
    url: opts.url,
    button_location: opts.location,
  });
}

export function trackOutboundClick(opts: { url: string; location?: string }) {
  reachGoal("outbound_click", {
    url: opts.url,
    button_location: opts.location || "unknown",
  });
}
