import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const heroRef = useRef(null);

  // Progress only while hero is leaving the screen
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Artwork fades out as hero scrolls away
  const artOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.55, 0]);

  // Dark overlay increases so background becomes fully dark
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div className="page">
      {/* SECTION 1: HERO (scrolls away together) */}
      <section ref={heroRef} className="hero">
        {/* Artwork inside hero (not fixed, no blur) */}
        <motion.div
          className="heroArtwork"
          style={{
            opacity: artOpacity,
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

        <div className="heroContent">
          <div className="heroTopMeta">
            <div className="kicker">PLAYING FROM SEARCH</div>
            <div className="subKicker">Recent Searches</div>
          </div>

          <div className="lyricLine">Your face against the trees</div>

          <div className="trackRow">
            <img className="thumb" src={artworkUrl} alt="" />
            <div className="trackMeta">
              <div className="trackTitle">Saw Your Face Today</div>
              <div className="trackArtist">She &amp; Him</div>
            </div>
            <div className="checkBadge">✓</div>
          </div>

          <div className="progressRow">
            <div className="progressTrack">
              <div className="progressDot" />
            </div>
            <div className="times">
              <span>0:08</span>
              <span>2:50</span>
            </div>
          </div>

          {/* Controls (visual only, like Spotify layout) */}
          <div className="controlsRow">
            <div className="ctl" />
            <div className="ctl" />
            <div className="playBtn" />
            <div className="ctl" />
            <div className="ctl" />
          </div>
        </div>
      </section>

      {/* SECTION 2+: Dark page sections (normal scroll) */}
      <main className="sections">
        {/* Lyrics peek bar (always visible initially) */}
        <section className="peekBar">
          <div className="peekTitle">Lyrics</div>
          <div className="peekBtns">
            <button className="peekBtn" aria-label="Share">⤴</button>
            <button className="peekBtn" aria-label="Expand">⤢</button>
          </div>
        </section>

        {/* Example sections */}
        <section className="sectionCard">
          <h3 className="sectionTitle">Lyrics</h3>
          <div className="lyricsCard">
            <p className="lyricBig">As they come, as they come</p>
            <p className="lyricBig">And I couldn't help but fall in love again</p>
            <p className="lyricBig lyricMuted">No, I couldn't help but fall in love again</p>
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
