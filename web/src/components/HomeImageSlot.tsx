"use client";

import Image from "next/image";
import { useState } from "react";

type HomeImageSlotProps = {
  src: string;
  alt: string;
  hint: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export function HomeImageSlot({
  src,
  alt,
  hint,
  className = "",
  imageClassName = "object-cover",
  sizes = "100vw",
  priority = false,
  unoptimized = false,
}: HomeImageSlotProps) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 text-center ${className}`}
      >
        <span className="text-2xl text-zinc-300" aria-hidden>
          📷
        </span>
        <span className="text-xs font-medium text-zinc-500">{hint}</span>
        <code className="break-all text-[10px] text-zinc-400">{src}</code>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={unoptimized}
        className={imageClassName}
        onError={() => setMissing(true)}
      />
    </div>
  );
}
