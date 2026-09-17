"use client";

/**
 * Fits a whole photograph inside its box. The subject is never cropped, and a
 * blurred copy fills the leftover space so tall portraits still feel full-bleed
 * on a wide screen.
 *
 * The root is opaque on purpose: these frames get stacked over each other, and
 * a translucent frame would let the layer underneath show through the
 * letterboxed edges.
 */
export function PhotoFrame({
  src,
  alt,
  drift,
  eager,
}: {
  src: string;
  alt: string;
  drift?: boolean;
  eager?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-25 blur-2xl"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`relative h-full w-full object-contain ${
          drift ? "animate-[drift_20s_ease-in-out_infinite_alternate]" : ""
        }`}
      />
    </div>
  );
}
