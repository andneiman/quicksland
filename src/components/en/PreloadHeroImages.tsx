"use client";

import { useEffect } from "react";
import { preloadHeroPreviews } from "@/components/en/HeroPreviewEn";

/** Mount near the top of /en so hero images start loading immediately. */
export default function PreloadHeroImages() {
  useEffect(() => {
    preloadHeroPreviews();
  }, []);

  return null;
}
