import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ---- COVER / BACKGROUND transforms (the "Spotify trick") ----
  // small zoom-out as you scroll
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.07, 1.0]);

  // blur increases
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 22]);
  const bgBlur = useTransform(bgBlurPx, (v) => `blur(${v}px)`);

  // saturation decreases (makes it feel less "loud")
  const bgSaturate = useTransform(scrollYProgress, [0, 0.35], [1.25, 0.85]);

  // optional slight contrast normalization
  const bgContrast = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.0]);

  // combine saturate + contrast into one filter string
  const bgFilter = useTransform([bgSaturate, bgContrast], ([s, c]) => {
    return `saturate(${s}) contrast(${c})`;
  });

  // dim overlay increases
  const dimOpacity = useTransform(scrollYProgress, [0, 0.35], [0.10, 0.65]);

  // (optional) hero fades a bit as sheet comes up
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.65]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -18]);

  // sheet rises up (the feeling that content "covers" the image)
  const sheetY = useTransform(scrollYProgress, [0, 0.25], [220, 0]);

  // Replace with your cover image
  const coverUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={ref} className="page">
      {/* 1) FIXED cover layer (never scrolls) */}
      <motion.div
        className="cover"
        style={{
          backgroundImage: `url(${coverUrl})`,
          scale: bgScale,
          filter: bgFilter,
        }}
        aria-hidden="true"
      />

      {/* 2) Blur layer (separate so it feels like wallpaper blur) */}
      <motion.div className="coverBlur" style={{ filter: bgBlur }} aria-hidden="true" />

      {/* 3) Gradient mask (always present) */}
      <div className="coverGradient" aria-hidden="true" />

      {/* 4) Dim overlay ramps up on scroll */}
      <motion.div className="coverDim" style={{ opacity: dimOpacity }} aria-hidden="true" />

      {/* Foreground hero content */}
      <section className="hero">
        <motion.div className="heroInner" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="lyricLine">Your face against the trees</div>

          <div className="trackRow">
            <img className="thumb" src={coverUrl} alt="" />
            <div className="trackMeta">
              <div className="trackTitle">Song Title</div>
              <div className="trackArtist">Artist</div>
            </div>
            <div className="check">✓</div>
          </div>
        </motion.div>
      </section>

      {/* Sheet that scrolls over the cover */}
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
