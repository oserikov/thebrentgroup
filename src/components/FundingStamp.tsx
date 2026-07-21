import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

interface Props {
  // The two text blocks this stamp overlays the seam between — measured at
  // runtime so the stamp can shrink itself out of any real overlap instead
  // of guessing a size that happens to fit one viewport.
  aboveRef: RefObject<HTMLElement | null>;
  belowRef: RefObject<HTMLElement | null>;
}

function overlaps(a: DOMRect, b: DOMRect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

// getBoundingClientRect includes padding, but the mission block's own
// pb-16/lg:pb-24 is empty space, not text — without stripping it, the stamp
// (deliberately sitting in that seam) reads as "overlapping" nothing visible
// and shrinks itself for no reason.
function contentRect(el: HTMLElement): DOMRect {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const pt = parseFloat(cs.paddingTop) || 0;
  const pb = parseFloat(cs.paddingBottom) || 0;
  const pl = parseFloat(cs.paddingLeft) || 0;
  const pr = parseFloat(cs.paddingRight) || 0;
  return new DOMRect(rect.left + pl, rect.top + pt, rect.width - pl - pr, rect.height - pt - pb);
}

export default function FundingStamp({ aboveRef, belowRef }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [scale, setScale] = useState(1);
  const stampRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Wide screens: sit lower (more into the section below than centered on
  // the seam) and further left — an intentionally off-center placement, not
  // a strict 50/50 split. Narrow screens keep the seam-centered look, which
  // already reads fine — only its *size* needs to adapt there.
  const ty = wide ? "85%" : "50%";
  const tx = wide ? "-150%" : "-100%";

  useLayoutEffect(() => {
    const stamp = stampRef.current;
    const above = aboveRef.current;
    const below = belowRef.current;
    if (!stamp || !above || !below) return;

    function fit() {
      if (!stamp || !above || !below) return;
      let s = 1;
      const apply = (v: number) => {
        stamp!.style.transform = `translate(${tx}, ${ty}) rotate(-20deg) scale(${v})`;
      };
      apply(s);
      for (let i = 0; i < 10 && s > 0.5; i++) {
        const stampRect = stamp!.getBoundingClientRect();
        if (!overlaps(stampRect, contentRect(above!)) && !overlaps(stampRect, contentRect(below!))) {
          break;
        }
        s -= 0.05;
        apply(s);
      }
      setScale(s);
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [wide, tx, ty, aboveRef, belowRef]);

  // No persistence by design — dismissing is per-visit, it comes back on refresh.
  if (dismissed) return null;

  return (
    <div
      ref={stampRef}
      className="absolute left-1/2 bottom-0 z-10 w-fit flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-black/30 px-8 py-6 shadow-sm"
      style={{
        backgroundColor: "#fff9f5",
        transform: `translate(${tx}, ${ty}) rotate(-20deg) scale(${scale})`,
      }}
    >
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        className="absolute top-1.5 right-1.5 flex h-10 w-10 items-center justify-center rounded-full text-[32px] font-thin text-black/50 hover:text-black hover:bg-black/10 leading-none"
      >
        ×
      </button>
      <img
        src={`${import.meta.env.BASE_URL}coins-three.png`}
        alt="Three gold coins"
        width={32}
        height={32}
        className="w-12 h-12"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="font-space font-normal text-[16px] text-black text-center">
        Right now we work for free,
        <br />
        consider funding us (email us){" "}
        <span
          className="relative cursor-pointer underline decoration-dotted"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={() => setShowTip((v) => !v)}
        >
          *
          {showTip && (
            // Counter-rotate: the stamp itself is rotated, but this popup
            // shouldn't inherit that tilt.
            <span
              className="absolute left-1/2 bottom-full mb-2 w-44 rounded-lg bg-black px-3 py-2 text-center text-[12px] leading-snug text-white"
              style={{ transform: "translateX(-50%) rotate(20deg)" }}
            >
              Palisade Research will serve as a receiving charity.
            </span>
          )}
        </span>
      </p>
    </div>
  );
}
