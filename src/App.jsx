import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cover transforms (subtle)
  const coverScale = useTransform(scrollYProgress, [0, 0.35], [1.06, 1.0]);
  const coverBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 18]);
  const coverBlur = useTransform(coverBlurPx, (v) => `blur(${v}px)`);
  const coverSat = useTransform(scrollYProgress, [0, 0.35], [1.2, 0.9]);
  const coverFilter = useTransform([coverSat], ([s]) => `saturate(${s})`);

  // Dark surface (this is the "Spotify bottom area")
  // It becomes stronger as you scroll
  const surfaceOpacity = useTransform(scrollYProgress, [0, 0.25], [0.35, 0.9]);

  // Sheet rises
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [220, 0]);

  const coverUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={ref} className="page">
      {/* FIXED cover region (only top area, not full screen) */}
      <motion.div className="coverRegion" aria-hidden="true">
        <motion.div
          className="coverImg"
          style={{
            backgroundImage: `url(${coverUrl})`,
            scale: coverScale,
            filter: coverFilter,
          }}
        />
        {/* Optional blur overlay */}
        <motion.div className="coverBlur" style={{ filter: coverBlur }} />
        {/* Fade to dark at the bottom of the cover region */}
        <div className="coverFadeToDark" />
      </motion.div>

      {/* Dark surface behind sheet/sections (Spotify feel) */}
      <motion.div
        className="surface"
        style={{ opacity: surfaceOpacity }}
        aria-hidden="true"
      />

      {/* Foreground hero content */}
      <section className="hero">
        <div className="trackRow">
          <img className="thumb" src={coverUrl} alt="" />
          <div className="trackMeta">
            <div className="trackTitle">Ada Titik-Titik Di Ujung Doa</div>
            <div className="trackArtist">Sal Priadi</div>
          </div>
        </div>
      </section>

      {/* Sheet (lyrics / related) */}
      <motion.section className="sheet" style={{ y: sheetY }}>
        <div className="sheetHandle" />

        <div className="block">
          <div className="h2">Related Track</div>
          <div className="card">…</div>
        </div>

        <div className="block">
          <div className="h2">Lyrics</div>
          <div className="lyricsCard">
            <p className="lyricBig">Kucoba memaafkanmu selalu</p>
            <p className="lyricBig">Kalau di situ ada salahku</p>
            <p className="lyricBig">Maafkan ku juga</p>
          </div>
        </div>

        <div style={{ height: 700 }} />
      </motion.section>
    </div>
  );
}
