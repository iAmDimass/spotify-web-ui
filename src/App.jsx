// App.jsx
// Spotify-like "hero artwork only" + normal dark content scroll
// No music controls, no sticky header.

import { useMemo } from "react";

export default function App() {
  const artworkUrl = useMemo(
    () =>
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop",
    []
  );

  return (
    <div className="spPage">
      {/* HERO: artwork exists ONLY in this section height */}
      <section
        className="spHero"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      >
        {/* Dark overlay so white artwork stays readable */}
        <div className="spHeroOverlay" />

        {/* Hero content */}
        <div className="spHeroInner">
          <div className="spHeroKicker">PLAYING FROM SEARCH</div>
          <div className="spHeroSub">"titik" in Search</div>

          <div className="spTrackRow">
            <img className="spThumb" src={artworkUrl} alt="Album art" />
            <div className="spTrackMeta">
              <div className="spTrackTitle">titik di ujung doa</div>
              <div className="spTrackArtist">Sal Priadi</div>
            </div>
            <button className="spAddBtn" aria-label="Add">
              +
            </button>
          </div>

          <div className="spProgress">
            <div className="spProgressBar">
              <div className="spProgressFill" />
              <div className="spProgressDot" />
            </div>
            <div className="spTimes">
              <span>2:18</span>
              <span>5:05</span>
            </div>
          </div>
        </div>

        {/* Gradient fade to dark at bottom, hides the "cut" like Spotify */}
        <div className="spHeroFade" />
      </section>

      {/* CONTENT: normal scroll on dark background */}
      <main className="spContent">
        <h2 className="spSectionTitle">Related Track</h2>

        <div className="spRelatedCard">
          <div className="spRelatedThumb" />
          <div className="spRelatedText">
            <div className="spRelatedTitle">Ada Titik-Titik Di</div>
            <div className="spRelatedSub">
              Song • Ada Titik-Titik Di Ujung Doa (Live Performance)
            </div>
          </div>
          <button className="spAddSmall" aria-label="Add related">
            +
          </button>
        </div>

        {/* Lyrics card (like Spotify orange block) */}
        <section className="spLyricsCard">
          <div className="spLyricsHeader">
            <div className="spLyricsLabel">Lyrics</div>
            <div className="spLyricsBtns">
              <button className="spRoundBtn" aria-label="Share lyrics">
                ⤴
              </button>
              <button className="spRoundBtn" aria-label="Expand lyrics">
                ⤢
              </button>
            </div>
          </div>

          <p className="spLyricsLine">Kucoba memaafkanmu selalu</p>
          <p className="spLyricsLine">Kalau di situ ada salahku</p>
          <p className="spLyricsLine">Maafkan ku juga</p>
        </section>

        {/* Add more content so you can scroll like the app */}
        <div style={{ height: 900 }} />
      </main>
    </div>
  );
}
