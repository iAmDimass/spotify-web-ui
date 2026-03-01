import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  const pageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Background transitions (subtle, like Spotify)
  const bgDim = useTransform(scrollYProgress, [0, 0.35], [0.10, 0.70]);
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.35], [0, 18]);
  const bgBlur = useTransform(bgBlurPx, (v) => `blur(${v}px)`);

  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div ref={pageRef} className="spPage">
      {/* Fixed artwork background */}
      <div className="spBg" style={{ backgroundImage: `url(${artworkUrl})` }} />

      {/* Blur & dim overlays */}
      <motion.div className="spBgBlur" style={{ filter: bgBlur }} aria-hidden="true" />
      <motion.div className="spBgDim" style={{ opacity: bgDim }} aria-hidden="true" />

      {/* HERO (top area) */}
      <section className="spHero">
        <div className="spHeroInner">
          <div className="spTopMeta">
            <div className="spKicker">PLAYING FROM SEARCH</div>
            <div className="spSubKicker">"titik" in Search</div>
          </div>

          <div className="spTrackRow">
            <img className="spThumb" src={artworkUrl} alt="" />
            <div className="spTrackMeta">
              <div className="spTrackTitle">titik di ujung doa</div>
              <div className="spTrackArtist">Sal Priadi</div>
            </div>
            <div className="spPlus">+</div>
          </div>

          <div className="spProgressRow">
            <div className="spProgressTrack">
              <div className="spProgressDot" />
            </div>
            <div className="spTimes">
              <span>2:18</span>
              <span>5:05</span>
            </div>
          </div>
        </div>
      </section>

      {/* NORMAL SCROLL SECTIONS */}
      <main className="spSections">
        {/* Related Track section */}
        <section className="spSection spSectionRelated">
          <h3 className="spSectionTitle">Related Track</h3>

          <div className="spRelatedCard">
            <div className="spRelatedThumb" />
            <div className="spRelatedInfo">
              <div className="spRelatedName">Ada Titik-Titik Di</div>
              <div className="spRelatedDesc">
                Song • Ada Titik-Titik Di Ujung Doa (Live Performance)
              </div>
            </div>
            <div className="spRelatedPlus">+</div>
          </div>
        </section>

        {/* Lyrics section */}
        <section className="spSection spSectionLyrics">
          <div className="spLyricsHeader">
            <h3 className="spSectionTitle">Lyrics</h3>
            <div className="spLyricsBtns">
              <button className="spRoundBtn" aria-label="Share">⤴</button>
              <button className="spRoundBtn" aria-label="Expand">⤢</button>
            </div>
          </div>

          <div className="spLyricsCard">
            <p className="spLyricBig">Kucoba memaafkanmu selalu</p>
            <p className="spLyricBig">Kalau di situ ada salahku</p>
            <p className="spLyricBig">Maafkan ku juga</p>
            <p className="spLyricSmall">♪</p>
          </div>
        </section>

        {/* More filler sections to demonstrate normal scroll */}
        <section className="spSection spSectionGeneric">
          <h3 className="spSectionTitle">Related</h3>
          <div className="spGrid">
            <div className="spTile" />
            <div className="spTile" />
            <div className="spTile" />
          </div>
        </section>

        <div className="spBottomSpace" />
      </main>
    </div>
  );
}
