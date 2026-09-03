import type { Metadata } from "next";
import DownloadInstructionsEn from "@/components/en/DownloadInstructionsEn";
import type { DesktopOS } from "@/lib/desktopDownloads";

export const metadata: Metadata = {
  title: "Download Quicks Assistant",
  description: "Thanks for downloading Quicks — here’s how to finish installing",
};

type SearchParams = Promise<{
  url?: string | string[];
  platform?: string | string[];
  autostart?: string | string[];
  from?: string | string[];
  direct?: string | string[];
}>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DownloadEnPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const url = first(params.url);
  const platform = first(params.platform);
  const autostart = first(params.autostart);
  const from = first(params.from);
  const direct = first(params.direct);
  const initialOs: DesktopOS | undefined =
    platform === "windows" || platform === "mac" ? platform : undefined;

  return (
    <DownloadInstructionsEn
      initialUrl={url}
      initialOs={initialOs}
      autoStart={autostart !== "0"}
      buttonLocation={from || "en_download_page"}
      directInstaller={direct === "1"}
    />
  );
}
