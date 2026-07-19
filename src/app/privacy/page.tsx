import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { markdownToHtml, readLegalMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Privacy Policy — Quicks",
  description:
    "How Purple Studio HQ LTD collects, uses, and protects personal data when you use Quicks.",
};

export default function PrivacyPolicyPage() {
  const html = markdownToHtml(readLegalMarkdown("privacy-policy.md"));
  return <LegalPage html={html} />;
}
