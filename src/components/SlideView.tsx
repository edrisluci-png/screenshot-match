import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/slides";

/** Renders a 1920x1080 slide scaled to fit its container. */
export function SlideView({ slide, blank = "none", className = "" }: { slide?: Slide; blank?: "none" | "black" | "white"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div className="slide-stage" style={{ transform: `scale(${scale})` }} data-blank={blank}>
        {blank === "none" && slide && (
          <>
            <p className="slide-lyrics">{slide.text}</p>
            <span className="slide-source">{slide.source}</span>
          </>
        )}
      </div>
    </div>
  );
}
