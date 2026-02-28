import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const pageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Background transitions
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.0]);
  const bgDim = useTransform(scrollYProgress, [0, 0.35], [0.10, 0.65]);
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 22]);
  const bgBlur = useTransform(bgBlurPx, (v) => `blur(${v}px)`);
  const bgSat = useTransform(scrollYProgress, [0, 0.35], [1.25, 0.85]);
  const bgCont = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.0]);
  const bgFilter = useTransform([bgSat, bgCont], ([s, c]) => `saturate(${s}) contrast(${c})`);

  // Hero transitions
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.65]);

  // Sheet rise
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [220, 0]);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

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

      {/* Blur & dim overlays */}
      <motion.div className="spBgBlur" style={{ filter: bgBlur }} aria-hidden="true" />
      <motion.div className="spBgDim" style={{ opacity: bgDim }} aria-hidden="true" />

      {/* Hero content (no controls, no top bar) */}
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

      {/* Lyrics sheet */}
      <motion.section className="spSheet" style={{ y: sheetY }}>
        <div className="spHandle" />

        <div className="spSheetHeader">
          <div className="spSheetTitle">Lyrics</div>
          <div className="spSheetHeaderBtns">
            <button className="spRoundBtn" aria-label="Share lyrics">⤴</button>
            <button className="spRoundBtn" aria-label="Expand">⤢</button>
          </div>
        </div>

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
      </motion.section>
    </div>
  );
}
