import type { Metadata } from "next";
import DownloadInstructionsEn from "@/components/en/DownloadInstructionsEn";

export const metadata: Metadata = {
  title: "Download Quicks Assistant",
  description: "Thanks for downloading Quicks — here’s how to finish installing",
};

export default function DownloadEnPage() {
  return <DownloadInstructionsEn />;
}
