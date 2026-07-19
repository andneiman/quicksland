import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { markdownToHtml, readLegalMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Terms of Service — Quicks",
  description:
    "Terms governing access to and use of Quicks, provided by Purple Studio HQ LTD.",
};

export default function TermsOfServicePage() {
  const html = markdownToHtml(readLegalMarkdown("terms-of-service.md"));
  return <LegalPage html={html} />;
}
