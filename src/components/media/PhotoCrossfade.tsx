"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PhotoFrame } from "@/components/media/PhotoFrame";
import type { PhotoItem } from "@/data/birthday";

/**
 * Swaps between photographs without ever dipping to empty. The outgoing frame
 * stays fully opaque underneath while the incoming one fades in on top, so
 * nothing behind the stack is revealed mid-transition.
 */
export function PhotoCrossfade({
  photo,
  drift,
  durationSec = 0.9,
}: {
  photo: PhotoItem;
  drift?: boolean;
  durationSec?: number;
}) {
  const [current, setCurrent] = useState(photo);
  const [outgoing, setOutgoing] = useState<PhotoItem | null>(null);

  useEffect(() => {
    if (photo.src === current.src) return;
    setOutgoing(current);
    setCurrent(photo);
  }, [current, photo]);

  return (
    <div className="relative h-full w-full">
      {outgoing ? (
        <div className="absolute inset-0" aria-hidden>
          <PhotoFrame src={outgoing.src} alt="" />
        </div>
      ) : null}
      <motion.div
        key={current.src}
        className="absolute inset-0"
        initial={{ opacity: outgoing ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: durationSec, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setOutgoing(null)}
      >
        <PhotoFrame src={current.src} alt={current.alt} drift={drift} eager />
      </motion.div>
    </div>
  );
}
