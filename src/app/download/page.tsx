import type { Metadata } from "next";
import DownloadCatalog from "@/components/download/DownloadCatalog";

export const metadata: Metadata = {
  title: "Download Quicks Recorder",
  description: "Download Quicks Recorder for macOS and Windows",
};

export default function DownloadPage() {
  return <DownloadCatalog />;
}
