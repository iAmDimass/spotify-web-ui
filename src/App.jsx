import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const pageRef = useRef(null);

  // Scroll progress over the whole page container
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // --- Background (artwork) transitions ---
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.0]);
  const bgDim = useTransform(scrollYProgress, [0, 0.35], [0.10, 0.65]); // overlay darkness
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 22]);
  const bgBlur = useTransform(bgBlurPx, (v) => `blur(${v}px)`);
  const bgSat = useTransform(scrollYProgress, [0, 0.35], [1.25, 0.85]);
  const bgCont = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.0]);
  const bgFilter = useTransform([bgSat, bgCont], ([s, c]) => `saturate(${s}) contrast(${c})`);

  // --- Hero (controls/meta) transitions ---
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.65]);

  // --- Sheet: starts lower, then rises into place ---
  // You can tweak these values to match your exact feel.
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [220, 0]);

  // --- Compact header reveal (like Spotify top bar) ---
  const compactHeaderOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={pageRef} className="spPage">
      {/* Fixed background artwork (covers viewport) */}
      <motion.div
        className="spBg"
        style={{
          backgroundImage: `url(${artworkUrl})`,
          scale: bgScale,
          filter: bgFilter,
        }}
        aria-hidden="true"
      />

      {/* Dim/blur overlay layers */}
      <motion.div className="spBgBlur" style={{ filter: bgBlur }} aria-hidden="true" />
      <motion.div className="spBgDim" style={{ opacity: bgDim }} aria-hidden="true" />

      {/* Compact sticky header that appears after scrolling */}
      <motion.div className="spTopBar" style={{ opacity: compactHeaderOpacity }}>
        <button className="spIconBtn" aria-label="Back">⌄</button>
        <div className="spTopBarText">
          <div className="spTopBarKicker">PLAYING FROM SEARCH</div>
          <div className="spTopBarTitle">Recent Searches</div>
        </div>
        <button className="spIconBtn" aria-label="Menu">⋮</button>
      </motion.div>

      {/* Hero content (overlayed on background) */}
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

          <div className="spProgressRow">
            <div className="spProgressTrack">
              <div className="spProgressDot" />
            </div>
            <div className="spTimes">
              <span>0:08</span>
              <span>2:50</span>
            </div>
          </div>

          <div className="spControls">
            <button className="spIconBtn" aria-label="Shuffle">⟲</button>
            <button className="spIconBtn" aria-label="Prev">⟨⟨</button>
            <button className="spPlayBtn" aria-label="Pause">▌▌</button>
            <button className="spIconBtn" aria-label="Next">⟩⟩</button>
            <button className="spIconBtn" aria-label="Repeat">↻</button>
          </div>

          <div className="spBottomActions">
            <button className="spIconBtn" aria-label="Devices">⌁</button>
            <button className="spIconBtn" aria-label="Share">⤴</button>
            <button className="spIconBtn" aria-label="Queue">≡</button>
          </div>
        </motion.div>
      </section>

      {/* Lyrics sheet that rises over the hero */}
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

        {/* Extra space so scrolling feels like Spotify */}
        <div style={{ height: 700 }} />
      </motion.section>
    </div>
  );
}
