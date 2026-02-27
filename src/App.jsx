import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const artScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);
  const artY = useTransform(scrollYProgress, [0, 0.25], [0, -18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.65]);

  const bgOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.25]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.35], [0, 22]);

  // ✅ bikin filter string dari bgBlur (tanpa .to())
  const blurFilter = useTransform(bgBlur, (v) => `blur(${v}px)`);

  return (
    <div ref={ref} className="page">
      <motion.div
        className="bg"
        style={{
          opacity: bgOpacity,
          filter: blurFilter,
        }}
      />

      <section className="hero">
        <motion.div className="heroInner" style={{ opacity: heroOpacity, y: artY }}>
          <motion.img
            className="art"
            style={{ scale: artScale }}
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80"
            alt="artwork"
          />
          <div className="meta">
            <div className="title">Song Title</div>
            <div className="artist">Artist</div>
          </div>
        </motion.div>
      </section>

      <section className="sheet">
        <div className="sheetHandle" />
        <div className="block">
          <div className="h2">Lyrics</div>
          <p className="p">This is a Spotify-like scroll experience.</p>
        </div>
        <div style={{ height: 600 }} />
      </section>
    </div>
  );
}
