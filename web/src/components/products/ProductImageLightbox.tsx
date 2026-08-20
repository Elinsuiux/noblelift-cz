"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

type ProductImageLightboxProps = {
  images: string[];
  alt: string;
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

export function ProductImageLightbox({
  images,
  alt,
  initialIndex = 0,
  open,
  onClose,
  onIndexChange,
}: ProductImageLightboxProps) {
  const t = useTranslations("productsCatalog.lightbox");
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    setIndex(initialIndex);
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (images.length === 0) {
        return;
      }

      const wrapped = (nextIndex + images.length) % images.length;
      setIndex(wrapped);
      setZoom(MIN_ZOOM);
      setOffset({ x: 0, y: 0 });
      onIndexChange?.(wrapped);
    },
    [images.length, onIndexChange],
  );

  const adjustZoom = useCallback((delta: number) => {
    setZoom((current) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((current + delta).toFixed(2))));
      if (next === MIN_ZOOM) {
        setOffset({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
        return;
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        adjustZoom(ZOOM_STEP);
        return;
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        adjustZoom(-ZOOM_STEP);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goTo, index, adjustZoom]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      adjustZoom(event.deltaY < 0 ? ZOOM_STEP / 2 : -ZOOM_STEP / 2);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, adjustZoom]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= MIN_ZOOM) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    setOffset({
      x: drag.originX + (event.clientX - drag.startX),
      y: drag.originY + (event.clientY - drag.startY),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  };

  if (!mounted || !open || images.length === 0) {
    return null;
  }

  const activeImage = images[index] ?? images[0]!;
  const canNavigate = images.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/85"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="truncate text-sm font-medium text-white/80">
          {alt}
          {canNavigate ? ` · ${index + 1} / ${images.length}` : null}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => adjustZoom(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15 disabled:opacity-40"
            aria-label={t("zoomOut")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M8 11h6M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(MIN_ZOOM);
              setOffset({ x: 0, y: 0 });
            }}
            className="min-w-14 rounded-full px-2 py-2 text-sm font-semibold tabular-nums text-white/90 transition hover:bg-white/15"
            aria-label={t("resetZoom")}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={() => adjustZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15 disabled:opacity-40"
            aria-label={t("zoomIn")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M11 8v6M8 11h6M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            aria-label={t("close")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-10">
        {canNavigate ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 sm:left-4"
            aria-label={t("prev")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}

        <div
          ref={stageRef}
          className={`relative h-full w-full max-w-6xl touch-none select-none ${
            zoom > MIN_ZOOM ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
          }`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={() => {
            if (zoom > MIN_ZOOM) {
              setZoom(MIN_ZOOM);
              setOffset({ x: 0, y: 0 });
            } else {
              setZoom(2);
            }
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <div className="relative h-[min(75vh,900px)] w-[min(92vw,1100px)]">
              <Image
                key={activeImage}
                src={activeImage}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>

        {canNavigate ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 sm:right-4"
            aria-label={t("next")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
