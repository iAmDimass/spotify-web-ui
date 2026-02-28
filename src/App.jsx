import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  animate,
  useDragControls,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

export default function App() {
  const pageRef = useRef(null);
  const sheetRef = useRef(null);

  // --- Scroll-based background (same as before) ---
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.0]);
  const bgDim = useTransform(scrollYProgress, [0, 0.35], [0.1, 0.65]);
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 22]);
  const bgBlur = useTransform(bgBlurPx, (v) => `blur(${v}px)`);
  const bgSat = useTransform(scrollYProgress, [0, 0.35], [1.25, 0.85]);
  const bgCont = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.0]);
  const bgFilter = useTransform([bgSat, bgCont], ([s, c]) => `saturate(${s}) contrast(${c})`);

  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.65]);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  // --- Bottom sheet snap + drag ---
  const controls = useDragControls();
  const y = useMotionValue(0);

  // Snap points (computed from viewport height)
  const [snap, setSnap] = useState({ top: 0, mid: 0, bottom: 0 });

  useLayoutEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;

      // Tune these to taste:
      // top: fully open (sheet almost at top)
      // mid: half open (like Spotify lyrics peek)
      // bottom: mostly closed (just handle visible)
      const top = 72;            // px from top
      const mid = Math.round(vh * 0.45);
      const bottom = Math.round(vh * 0.78);

      setSnap({ top, mid, bottom });

      // Start at "mid" like Spotify
      y.set(mid);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Constrain sheet to snap range
  const dragConstraints = useMemo(() => {
    return { top: snap.top, bottom: snap.bottom };
  }, [snap.top, snap.bottom]);

  function nearestSnap(currentY) {
    const points = [snap.top, snap.mid, snap.bottom];
    return points.reduce((best, p) =>
      Math.abs(p - currentY) < Math.abs(best - currentY) ? p : best
    , points[0]);
  }

  function snapTo(targetY) {
    animate(y, targetY, {
      type: "spring",
      stiffness: 520,
      damping: 46,
      mass: 0.9,
    });
  }

  // Optional: tap handle to toggle between mid/top
  function toggleOpen() {
    const current = y.get();
    const target = Math.abs(current - snap.top) < Math.abs(current - snap.mid)
      ? snap.mid
      : snap.top;
    snapTo(target);
  }

  return (
    <div ref={pageRef} className="spPage">
      {/* Fixed background artwork */}
      <motion.div
        className="spBg"
        style={{
          backgroundImage: `url(${artworkUrl})`,
          scale: bgScale,
          filter: bgFilter,
        }}
        aria-hidden="true"
      />
      <motion.div className="spBgBlur" style={{ filter: bgBlur }} aria-hidden="true" />
      <motion.div className="spBgDim" style={{ opacity: bgDim }} aria-hidden="true" />

      {/* Hero content (stays behind the sheet) */}
      <section className="spHero">
        <motion.div className="spHeroInner" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="spLyricLine">Your face against the trees</div>

          <div className="spTrackRow">
            <img className="spThumb" src={artworkUrl} alt="" />
            <div className="spTrackMeta">
              <div className="spTrackTitle">Saw Your Face Today</div>
              <div className="spTrackArtist">She &amp; Him</div>
            </div>
            <div className="spCheck">✓</div>
          </div>
        </motion.div>
      </section>

      {/* Draggable sheet */}
      <motion.section
        ref={sheetRef}
        className="spSheet spSheetFixed"
        style={{ y }}
        drag="y"
        dragControls={controls}
        dragListener={false}                 // only drag from handle area
        dragConstraints={dragConstraints}
        dragElastic={0.08}                   // small rubber band
        dragMomentum={false}                 // Spotify-like snap (not fling)
        onDragEnd={(_, info) => {
          // Snap based on where the user ended + some velocity bias
          const projected = y.get() + info.velocity.y * 0.12;
          snapTo(nearestSnap(projected));
        }}
      >
        {/* Handle (drag area) */}
        <div
          className="spHandleArea"
          onPointerDown={(e) => controls.start(e)}
          onDoubleClick={toggleOpen}
          role="button"
          aria-label="Drag lyrics sheet"
          tabIndex={0}
        >
          <div className="spHandle" />
        </div>

        <div className="spSheetHeader">
          <div className="spSheetTitle">Lyrics</div>
          <div className="spSheetHeaderBtns">
            <button className="spRoundBtn" aria-label="Share lyrics">⤴</button>
            <button className="spRoundBtn" aria-label="Expand" onClick={() => snapTo(snap.top)}>
              ⤢
            </button>
          </div>
        </div>

        {/* Scrollable sheet content */}
        <div className="spSheetScroll">
          <div className="spLyrics">
            <p className="spLyricBig">As they come, as they come</p>
            <p className="spLyricBig">And I couldn't help but fall in love again</p>
            <p className="spLyricBig spLyricMuted">No, I couldn't help but fall in love again</p>
            <p className="spLyricBig spLyricMuted">I saw it glitter as I grew</p>
          </div>

          <div className="spDivider" />

          <div className="spRelated">
            <div className="spRelatedTitle">Related music videos</div>
            <div className="spRelatedGrid">
              <div className="spCard" />
              <div className="spCard" />
              <div className="spCard" />
            </div>
          </div>

          <div style={{ height: 700 }} />
        </div>
      </motion.section>

      {/* Page spacer so you can still scroll behind (optional but helps) */}
      <div style={{ height: "120vh" }} />
    </div>
  );
}
