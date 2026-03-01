import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const heroRef = useRef(null);

  // Scroll progress ONLY for the hero section
  // 0 = hero top at top of screen
  // 1 = hero bottom hits top of screen (hero is leaving)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Artwork fades OUT as hero leaves
  const artOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.55, 0]);

  // Dark overlay increases so it transitions to dark page
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  // Optional blur (Spotify-ish)
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div className="page">
      {/* SECTION 1: HERO (artwork + player UI) — scrolls away together */}
      <section ref={heroRef} className="hero">
        {/* Artwork background INSIDE hero (not fixed) */}
        <motion.div
          className="heroArtwork"
          style={{
            opacity: artOpacity,
            filter: blurFilter,
            backgroundImage: `url(${artworkUrl})`,
          }}
          aria-hidden="true"
        />

        {/* Dark overlay inside hero */}
        <motion.div
          className="heroOverlay"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Player UI content (part of the hero section) */}
        <div className="heroContent">
          <div className="heroTopMeta">
            <div className="kicker">PLAYING FROM SEARCH</div>
            <div className="subKicker">"titik" in Search</div>
          </div>

          <div className="trackRow">
            <img className="thumb" src={artworkUrl} alt="" />
            <div className="trackMeta">
              <div className="trackTitle">titik di ujung doa</div>
              <div className="trackArtist">Sal Priadi</div>
            </div>
            <div className="plusBtn">+</div>
          </div>

          <div className="progressRow">
            <div className="progressTrack">
              <div className="progressDot" />
            </div>
            <div className="times">
              <span>2:18</span>
              <span>5:05</span>
            </div>
          </div>

          <div className="controlsRow">
            <div className="ctl" />
            <div className="ctl" />
            <div className="playBtn" />
            <div className="ctl" />
            <div className="ctl" />
          </div>

          {/* Hint of next section like Spotify */}
          <div className="peekTitle">Related Track</div>
        </div>
      </section>

      {/* SECTION 2: normal dark page */}
      <main className="sections">
        <section className="sectionCard">
          <h3 className="sectionTitle">Related Track</h3>
          <div className="relatedCard">
            <div className="relatedThumb" />
            <div className="relatedInfo">
              <div className="relatedName">Ada Titik-Titik Di</div>
              <div className="relatedDesc">
                Song • Ada Titik-Titik Di Ujung Doa (Live Performance)
              </div>
            </div>
            <div className="relatedPlus">+</div>
          </div>
        </section>

        <section className="sectionCard">
          <div className="lyricsHeader">
            <h3 className="sectionTitle">Lyrics</h3>
            <div className="lyricsBtns">
              <button className="roundBtn" aria-label="Share">⤴</button>
              <button className="roundBtn" aria-label="Expand">⤢</button>
            </div>
          </div>

          <div className="lyricsCard">
            <p className="lyricBig">Kucoba memaafkanmu selalu</p>
            <p className="lyricBig">Kalau di situ ada salahku</p>
            <p className="lyricBig">Maafkan ku juga</p>
            <p className="lyricSmall">♪</p>
          </div>
        </section>

        <section className="sectionCard">
          <h3 className="sectionTitle">Related</h3>
          <div className="grid">
            <div className="tile" />
            <div className="tile" />
            <div className="tile" />
          </div>
        </section>

        <div style={{ height: 900 }} />
      </main>
    </div>
  );
}
