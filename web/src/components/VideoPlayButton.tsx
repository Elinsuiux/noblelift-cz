"use client";

import { useEffect, useState } from "react";

const NOBLELIFT_ABOUT_VIDEO =
  "https://www.noblelift.com/uploadfiles/2024/07/20240711145838686.mp4";

type VideoPlayButtonProps = {
  videoUrl?: string;
  ariaLabel: string;
  closeLabel: string;
};

export function VideoPlayButton({
  videoUrl = NOBLELIFT_ABOUT_VIDEO,
  ariaLabel,
  closeLabel,
}: VideoPlayButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="video-play-button"
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
      >
        <span className="video-play-button__ring video-play-button__ring--outer" aria-hidden />
        <span className="video-play-button__ring video-play-button__ring--inner" aria-hidden />
        <span className="video-play-button__core" aria-hidden>
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] w-full max-w-5xl rounded-xl bg-black"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
