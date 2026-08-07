"use client";

import { useEffect } from "react";
import { preloadHeroPreviews } from "@/components/en2/HeroPreviewEn";

/** Mount near the top of /en2 so hero images start loading immediately. */
export default function PreloadHeroImages() {
  useEffect(() => {
    preloadHeroPreviews();
  }, []);

  return null;
}
