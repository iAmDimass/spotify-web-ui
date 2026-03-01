// App.jsx
import React from "react";
import "./styles.css";

export default function App() {
  const artworkUrl =
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop";

  return (
    <div className="page">
      {/* HERO (artwork ONLY exists in this section) */}
      <section className="hero" style={{ backgroundImage: `url(${artworkUrl})` }}>
        {/* dark overlay so text is readable on light artwork */}
        <div className="heroOverlay" />

        {/* top bar (optional, simple) */}
        <div className="topBar">
          <button className="iconBtn" aria-label="Back">
            ⌄
          </button>
          <div className="topBarText">
            <div className="topKicker">PLAYING FROM SEARCH</div>
            <div className="topTitle">"titik" in Search</div>
          </div>
          <button className="iconBtn" aria-label="Menu">
            ⋮
          </button>
        </div>

        {/* hero content */}
        <div className="heroContent">
          <div className="lyricLine">—titik di ujung doa</div>

          <div className="trackRow">
            <img className="thumb" src={artworkUrl} alt="" />
            <div className="trackMeta">
              <div className="trackTitle">Ada titik-titik di ujung doa</div>
              <div className="trackArtist">Sal Priadi</div>
            </div>
            <button className="plusBtn" aria-label="Add">
              +
            </button>
          </div>

          <div className="progress">
            <div className="progressTrack">
              <div className="progressDot" />
            </div>
            <div className="times">
              <span>2:18</span>
              <span>5:05</span>
            </div>
          </div>

          {/* Minimal controls (optional). Remove if you want. */}
          <div className="controls">
            <button className="iconBtn" aria-label="Prev">
              ⟨⟨
            </button>
            <button className="playBtn" aria-label="Pause">
              ▌▌
            </button>
            <button className="iconBtn" aria-label="Next">
              ⟩⟩
            </button>
          </div>
        </div>

        {/* fade-to-dark at bottom so transition feels like Spotify */}
        <div className="heroFadeToDark" />
      </section>

      {/* CONTENT (normal scroll on dark background) */}
      <main className="content">
        <h2 className="sectionTitle">Related Track</h2>

        <div className="relatedCard">
          <div className="relatedThumb" />
          <div className="relatedText">
            <div className="relatedTitle">Ada Titik-Titik Di</div>
            <div className="relatedSub">Song • Live performance</div>
          </div>
          <button className="plusBtn small" aria-label="Add">
            +
          </button>
        </div>

        <div className="lyricsCard">
          <div className="lyricsHeader">
            <div className="lyricsTitle">Lyrics</div>
            <div className="lyricsBtns">
              <button className="roundBtn" aria-label="Share">
                ⤴
              </button>
              <button className="roundBtn" aria-label="Expand">
                ⤢
              </button>
            </div>
          </div>

          <p className="lyricsText">Kucoba memaafkanmu selalu</p>
          <p className="lyricsText">Kalau di situ ada salahku</p>
          <p className="lyricsText">Maafkan ku juga</p>
        </div>

        <div className="spacer" />
      </main>
    </div>
  );
}
