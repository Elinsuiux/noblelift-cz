import Image from "next/image";

type WordmarkProps = {
  variant: "header" | "hero" | "footer";
  className?: string;
  priority?: boolean;
};

const WHITE_SRC = "/logo/noblelift-wordmark-white-trim.png";
const FOOTER_SRC = "/logo/noblelift-wordmark-orange-footer.png";
const HERO_HEIGHT = 30;

function HeroWordmark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const baseClass =
    "block h-auto w-[300px] object-contain object-left contrast-[1.06] drop-shadow-[0_0_20px_rgba(255,57,3,0.45)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] sm:w-[345px] md:w-[400px]";

  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet="/logo/noblelift-wordmark-orange-hero-400.png"
      />
      <source
        media="(min-width: 640px)"
        srcSet="/logo/noblelift-wordmark-orange-hero-345.png"
      />
      <img
        src="/logo/noblelift-wordmark-orange-hero-300.png"
        alt="Noblelift"
        width={300}
        height={HERO_HEIGHT}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`${baseClass} ${className}`.trim()}
      />
    </picture>
  );
}

export function Wordmark({ variant, className = "", priority = false }: WordmarkProps) {
  if (variant === "hero") {
    return <HeroWordmark className={className} priority={priority} />;
  }

  const src = variant === "footer" ? FOOTER_SRC : WHITE_SRC;
  const sizeClass =
    variant === "header" ? "h-4 w-auto sm:h-5" : "h-9 w-auto contrast-[1.04]";

  return (
    <Image
      src={src}
      alt="Noblelift"
      width={940}
      height={94}
      priority={priority}
      unoptimized
      sizes={variant === "header" ? "120px" : "180px"}
      className={`block object-contain object-left ${className || sizeClass}`}
    />
  );
}
