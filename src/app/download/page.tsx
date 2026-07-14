import type { Metadata } from "next";
import DownloadCatalog from "@/components/download/DownloadCatalog";

export const metadata: Metadata = {
  title: "Download Quicks App",
  description:
    "It records your lessons and automatically creates homework, quizzes, flashcards, and much more",
};

export default function DownloadPage() {
  return <DownloadCatalog />;
}
