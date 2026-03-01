import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const pageRef = useRef(null);

  const { scrollY } = useScroll({ container: pageRef });

  // === Hero height limit (this defines the artwork "section") ===
  // We fade artwork out across the hero scroll range.
  // Tune these if needed:
  const HERO_FADE_START = 120; // px scrolled
  const HERO_FADE_END = 520;   // px scrolled

  // Artwork fades out
  const artOpacity = useTransform(
    scrollY,
    [0, HERO_FADE_START, HERO_FADE_END],
    [1, 1, 0]
  );

  // Dark overlay fades in (so background becomes fully dark)
  const darkOverlayOpacity = useTransform(
    scrollY,
    [0, HERO_FADE_START, HERO_FADE_END],
    [0.25, 0.35, 1]
  );

  // Optional: blur increases a bit during fade (Spotify-like)
  const blurPx = useTransform(scrollY, [0, HERO_FADE_END], [0, 18]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={pageRef} className="pageScroll">
      <div className="pageBase">
        {/* Base dark background (ALWAYS present) */}
        <div className="baseDark" />

        {/* Artwork only visually matters in hero zone (fades out on scroll) */}
        <motion.div
          className="artLayer"
          style={{
            opacity: artOpacity,
            filter: blurFilter,
            backgroundImage: `url(${artworkUrl})`,
          }}
          aria-hidden="true"
        />

        {/* Dark overlay that ramps up, making everything become dark */}
        <motion.div
          className="darkOverlay"
          style={{ opacity: darkOverlayOpacity }}
          aria-hidden="true"
        />

        {/* HERO content (top zone) */}
        <header className="hero">
          <div className="heroInner">
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

            <div className="fakeControlsRow">
              <div className="fakeIcon" />
              <div className="fakeIcon" />
              <div className="fakePlay" />
              <div className="fakeIcon" />
              <div className="fakeIcon" />
            </div>
          </div>
        </header>

        {/* Sections (normal scroll) */}
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
    </div>
  );
}
