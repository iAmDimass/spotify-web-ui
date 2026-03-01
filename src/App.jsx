import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const ref = useRef(null);

  // scroll progress across the whole page
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /**
   * Spotify behavior:
   * - cover window starts near full height
   * - collapses upward to a smaller height
   * - image itself doesn't scale; it's just clipped
   */
  const heroH_vh = useTransform(scrollYProgress, [0, 0.22], [100, 52]); // tweak end height
  const heroHeight = useTransform(heroH_vh, (v) => `${v}vh`);

  // optional: slight dim/blur increase (secondary effect)
  const dimOpacity = useTransform(scrollYProgress, [0, 0.22], [0.05, 0.35]);
  const blurPx = useTransform(scrollYProgress, [0, 0.22], [0, 10]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  const coverUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={ref} className="spPage">
      {/* Dark surface behind everything (Spotify bottom area) */}
      <div className="spSurface" />

      {/* Collapsing cover window (THIS is the Spotify trick) */}
      <motion.header className="spHero" style={{ height: heroHeight }}>
        {/* Image is INSIDE a clipped container. It doesn't resize; it gets cropped. */}
        <motion.div
          className="spHeroImg"
          style={{
            backgroundImage: `url(${coverUrl})`,
            filter: blurFilter, // optional
          }}
          aria-hidden="true"
        />

        {/* Soft fade at bottom of hero so the cut line isn’t harsh */}
        <div className="spHeroFade" aria-hidden="true" />

        {/* Optional dim overlay */}
        <motion.div className="spHeroDim" style={{ opacity: dimOpacity }} aria-hidden="true" />

        {/* Foreground content on top of the cover */}
        <div className="spHeroContent">
          <div className="spKicker">PLAYING FROM SEARCH</div>
          <div className="spTitle">Ada titik-titik di ujung doa</div>
          <div className="spArtist">Sal Priadi</div>
        </div>
      </motion.header>

      {/* Everything below sits on the dark surface */}
      <main className="spBody">
        <section className="spSection">
          <h3>Related Track</h3>
          <div className="spCard">Related item…</div>
        </section>

        <section className="spSection">
          <h3>Lyrics</h3>
          <div className="spLyricsCard">
            <p>Kucoba memaafkanmu selalu</p>
            <p>Kalau di situ ada salahku</p>
            <p>Maafkan ku juga</p>
          </div>
        </section>

        <div style={{ height: 900 }} />
      </main>
    </div>
  );
}
