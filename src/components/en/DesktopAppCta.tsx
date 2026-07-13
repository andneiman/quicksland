"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 20h8M12 16v4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect
        x="14"
        y="6"
        width="20"
        height="36"
        rx="4"
        stroke="#39c"
        strokeWidth="2"
      />
      <path
        d="M21 10h6"
        stroke="#39c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="36" r="1.5" fill="#39c" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 9.5L7 13L14.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Variant = "hero" | "feature" | "bottom" | "nav";

const VARIANT_CLASS: Record<Variant, string> = {
  hero: "inline-flex items-center justify-center gap-2 rounded-full bg-[#262626] px-6 py-4 text-base font-medium leading-6 text-white sm:font-semibold",
  feature:
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#262626] px-6 py-4 text-base font-medium leading-6 text-white",
  bottom:
    "mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#262626] px-6 py-4 text-base font-semibold leading-6 text-white",
  nav: "flex shrink-0 items-center gap-1.5 rounded-full bg-[#262626] px-4 py-[10px] text-sm font-semibold leading-5 text-white",
};

type VvFrame = {
  /** keyboard / chrome offset from layout bottom */
  sheetBottom: number;
  /** full layout height — overlay covers behind keyboard too */
  layoutHeight: number;
};

export default function DesktopAppCta({
  variant = "hero",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [allowDismiss, setAllowDismiss] = useState(false);
  const [email, setEmail] = useState("");
  const [sendStatus, setSendStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const [frame, setFrame] = useState<VvFrame>({
    sheetBottom: 0,
    layoutHeight: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const sync = () => {
      const layoutHeight = window.innerHeight;
      const vv = window.visualViewport;
      if (!vv) {
        setFrame({ sheetBottom: 0, layoutHeight });
        return;
      }
      // Distance from visual viewport bottom to layout viewport bottom
      const sheetBottom = Math.max(
        0,
        Math.round(layoutHeight - vv.height - vv.offsetTop)
      );
      setFrame({ sheetBottom, layoutHeight });
    };

    sync();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);

    return () => {
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    setAllowDismiss(false);
    const dismissId = window.setTimeout(() => setAllowDismiss(true), 480);

    return () => {
      window.clearTimeout(dismissId);
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open, animKey]);

  useEffect(() => {
    if (!open || sendStatus !== "success") return;
    setAllowDismiss(false);
    const t = window.setTimeout(() => setAllowDismiss(true), 450);
    return () => window.clearTimeout(t);
  }, [open, sendStatus]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && allowDismiss) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, allowDismiss]);

  function handleClick() {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) {
      setAnimKey((k) => k + 1); // force remount so enter animation always runs
      setOpen(true);
      return;
    }
    // Desktop click behavior — TBD
  }

  async function handleSend(e?: FormEvent | MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    if (!email.includes("@") || sendStatus === "loading") return;

    setSendStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setSendStatus("success");
    } catch {
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 2500);
    }
  }

  async function handleCopy(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  }

  function close() {
    setAllowDismiss(false);
    setOpen(false);
    setSendStatus("idle");
    setCopied(false);
    setEmail("");
  }

  function requestClose() {
    if (!allowDismiss) return;
    close();
  }

  const sheet =
    open && mounted
      ? createPortal(
          <div
            key={animKey}
            className="fixed inset-x-0 top-0 z-[200]"
            style={{
              height: frame.layoutHeight || "100dvh",
            }}
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
          >
            <div
              className="sheet-backdrop-in absolute inset-0 bg-black/40"
              aria-hidden
              onClick={requestClose}
            />

            {/* White fill behind keyboard / below sheet — kills Safari gap */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-white"
              style={{
                height: Math.max(frame.sheetBottom + 24, 24),
              }}
            />

            <div
              className="sheet-panel-in absolute inset-x-0"
              style={{ bottom: frame.sheetBottom }}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-t-[28px] bg-white px-6 pb-8 pt-8 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
                {/* Extra insurance: white continues under the panel */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-[40%] -bottom-[100vh] bg-white"
                />

                <div className="relative mx-auto mb-5 flex justify-center">
                  <PhoneIcon />
                </div>

                <h2
                  id={titleId}
                  className="relative text-center text-[28px] font-semibold leading-[32px] text-[#262626]"
                >
                  On your phone?
                </h2>
                <p className="relative mx-auto mt-3 max-w-[280px] text-center text-base font-medium leading-6 text-[rgba(38,38,38,0.5)]">
                  We&apos;ll email you a link to open later on your computer
                </p>

                <div className="relative mt-8">
                  {sendStatus === "success" ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e8f5e9] px-5 py-4 text-[#2e7d32]">
                      <CheckIcon />
                      <span className="text-base font-medium leading-6">
                        Sent to your email
                      </span>
                    </div>
                  ) : (
                    <form
                      className="flex w-full items-center gap-2 rounded-full border border-[rgba(38,38,38,0.12)] bg-[rgba(38,38,38,0.03)] p-1.5 pl-5"
                      onSubmit={handleSend}
                    >
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        enterKeyHint="send"
                        placeholder="Your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-base font-medium leading-6 text-[#262626] outline-none placeholder:text-[rgba(38,38,38,0.35)]"
                      />
                      <button
                        type="submit"
                        disabled={sendStatus === "loading"}
                        className="shrink-0 rounded-full bg-[#262626] px-4 py-2.5 text-sm font-semibold leading-5 text-white disabled:opacity-60"
                      >
                        {sendStatus === "loading"
                          ? "Sending…"
                          : sendStatus === "error"
                            ? "Try again"
                            : "Send link"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="relative mt-8 flex justify-center pb-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-sm font-medium leading-5 text-[#262626]"
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="size-4 text-[#2e7d32]" />
                        <span className="text-[#2e7d32]">Link copied</span>
                      </>
                    ) : (
                      "Copy link"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={[VARIANT_CLASS[variant], className].filter(Boolean).join(" ")}
      >
        <DesktopIcon className={variant === "nav" ? "size-4" : "size-5"} />
        {variant === "nav" ? "Get the app" : "Get the Desktop app"}
      </button>
      {sheet}
    </>
  );
}
