import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/**
 * Locks hero height ONCE on first visit.
 * Reused across routes: all pages under this layout share the same locked hero behavior.
 */
export default function HeroLayout({ hero }) {
  const [heroHeight, setHeroHeight] = useState(null);

  useEffect(() => {
    // Measure ONCE and never update (your requirement).
    const height =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setHeroHeight(height);
  }, []);

  const heroStyle = useMemo(() => {
    return heroHeight ? { height: `${heroHeight}px` } : undefined;
  }, [heroHeight]);

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero" style={heroStyle}>
        <img
          src={hero.artwork}
          alt=""
          className="heroImage"
          draggable={false}
        />
        <div className="heroOverlay" aria-hidden="true" />

        <div className="heroContent">
          <h1 className="heroTitle">{hero.title}</h1>
          {hero.desc ? <p className="heroDesc">{hero.desc}</p> : null}
        </div>
      </section>

      {/* Surface that peeks into hero (Spotify-like) */}
      <main className="surface">
        <Outlet />
      </main>
    </div>
  );
}
