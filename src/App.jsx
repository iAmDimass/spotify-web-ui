import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ----- Background treatment (Spotify-like "white")
  // Slight zoom at top to hide edges (feels infinite)
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.0]);

  // Make artwork feel "white": brighten + desaturate + soften contrast
  const sat = useTransform(scrollYProgress, [0, 0.35], [0.55, 0.35]);
  const con = useTransform(scrollYProgress, [0, 0.35], [0.95, 0.88]);
  const bri = useTransform(scrollYProgress, [0, 0.35], [1.15, 1.05]);
  const bgFilter = useTransform([sat, con, bri], ([s, c, b]) => {
    return `saturate(${s}) contrast(${c}) brightness(${b})`;
  });

  // White wash overlay increases as you scroll (this is the key)
  const washOpacity = useTransform(scrollYProgress, [0, 0.30], [0.18, 0.55]);

  // Blur increases a bit as sheet takes over
  const blurPx = useTransform(scrollYProgress, [0, 0.35], [0, 18]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  // Bottom dim gradient intensifies on scroll (helps readability)
  const dimOpacity = useTransform(scrollYProgress, [0, 0.35], [0.10, 0.65]);

  // Hero fades slightly as sheet comes up
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.70]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -14]);

  // Sheet rises from below into place
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [260, 0]);

  const artworkUrl =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={ref} className="spWhitePage">
      {/* 1) Fixed artwork surface */}
      <motion.div
        className="spArtwork"
        style={{
          backgroundImage: `url(${artworkUrl})`,
          scale: bgScale,
          filter: bgFilter,
        }}
        aria-hidden="true"
      />

      {/* 2) Blur layer (separate so it feels like wallpaper) */}
      <motion.div
        className="spBlurLayer"
        style={{ filter: blurFilter }}
        aria-hidden="true"
      />

      {/* 3) White wash layer (this makes it look like "white background") */}
      <motion.div
        className="spWash"
        style={{ opacity: washOpacity }}
        aria-hidden="true"
      />

      {/* 4) Bottom dim gradient for readability */}
      <motion.div
        className="spDim"
        style={{ opacity: dimOpacity }}
        aria-hidden="true"
      />

      {/* HERO UI (simplified) */}
      <section className="spHero">
        <motion.div className="spHeroInner" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="spTitle">Ada titik-titik di ujung</div>
          <div className="spArtist">Sal Priadi</div>

          <div className="spProgress">
            <div className="spProgressTrack">
              <div className="spProgressDot" />
            </div>
            <div className="spTimeRow">
              <span>2:18</span>
              <span>5:05</span>
            </div>
          </div>

          {/* Optional: your “related track” preview card */}
          <div className="spRelatedMini">
            <div className="spRelatedLabel">Related Track</div>
            <div className="spRelatedCard">
              <div className="spRelatedThumb" />
              <div className="spRelatedText">
                <div className="spRelatedTitle">Ada Titik-Titik Di</div>
                <div className="spRelatedSub">Live Performance</div>
              </div>
              <div className="spPlus">+</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SHEET */}
      <motion.section className="spSheet" style={{ y: sheetY }}>
        <div className="spHandle" />

        <div className="spSheetHeader">
          <div className="spSheetTitle">Lyrics</div>
          <div className="spSheetBtns">
            <button className="spRoundBtn" aria-label="Share">⤴</button>
            <button className="spRoundBtn" aria-label="Expand">⤢</button>
          </div>
        </div>

        <div className="spLyricsCard">
          <p className="spLyricBig">Kucoba memaafkanmu selalu</p>
          <p className="spLyricBig">Kalau di situ ada salahku</p>
          <p className="spLyricBig">Maafkan ku juga</p>
        </div>

        <div style={{ height: 900 }} />
      </motion.section>
    </div>
  );
}
