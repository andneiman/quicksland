"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  YANDEX_METRIKA_ID,
  fileNameFromUrl,
  isDemoBookingUrl,
  isEnTrackPath,
  isExternalUrl,
  isFileDownloadUrl,
  isMetrikaHost,
  isRuTrackPath,
  localeFromPath,
  trackBookCallClick,
  trackFileDownload,
  trackHit,
  trackOutboundClick,
} from "@/lib/metrika";

function resolveLocation(el: Element): string {
  const withAttr = el.closest("[data-ym-location]");
  if (withAttr instanceof HTMLElement && withAttr.dataset.ymLocation) {
    return withAttr.dataset.ymLocation;
  }
  return "unknown";
}

function YandexMetrikaInner() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);
  const skipNextHit = useRef(true);

  useEffect(() => {
    setEnabled(isMetrikaHost(window.location.hostname));
  }, []);

  // SPA pageviews — skip first (covered by ym init)
  useEffect(() => {
    if (!enabled) return;
    if (skipNextHit.current) {
      skipNextHit.current = false;
      return;
    }
    const locale = localeFromPath(pathname);
    trackHit(window.location.href, {
      title: document.title,
      referer: document.referrer,
      params: { locale },
    });
  }, [enabled, pathname, searchParams]);

  // Goal tracking via capture-phase click listener (does not block navigation)
  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      try {
        if (event.defaultPrevented) return;
        if (event.button !== 0 && event.button !== 1) return;

        const target = event.target;
        if (!(target instanceof Element)) return;

        const anchor = target.closest("a");
        if (!(anchor instanceof HTMLAnchorElement)) return;

        const hrefAttr = anchor.getAttribute("href");
        if (!hrefAttr || hrefAttr.startsWith("#")) return;

        const url = anchor.href;
        const location = resolveLocation(anchor);
        const path = window.location.pathname;
        const host = window.location.hostname;

        if (isRuTrackPath(path) && isDemoBookingUrl(url)) {
          trackBookCallClick({ url, location });
          return;
        }

        if (
          isEnTrackPath(path) &&
          (anchor.hasAttribute("download") || isFileDownloadUrl(url))
        ) {
          trackFileDownload({
            url,
            fileName: fileNameFromUrl(url),
            location,
          });
          return;
        }

        if (isExternalUrl(url, host) && !isDemoBookingUrl(url)) {
          trackOutboundClick({ url, location });
        }
      } catch {
        // never interfere with navigation
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) { return; }
  }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

ym(${YANDEX_METRIKA_ID}, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: 'dataLayer',
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true
});`}
    </Script>
  );
}

export default function YandexMetrika() {
  return (
    <>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <YandexMetrikaInner />
      </Suspense>
    </>
  );
}
