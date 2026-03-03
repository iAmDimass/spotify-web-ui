import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  // ✅ Put your MP4 here (best: MP4 H.264). Keep it short + loopable.
  const videoSrc = "https://your-cdn.com/hero.mp4";

  // ✅ Poster shown instantly + used if autoplay fails
  const posterSrc =
    "https://image2url.com/r2/default/images/1772355798345-e4c9c96d-86bb-415f-85e0-7932a4873b8b.jpg";

  const [heroHeight, setHeroHeight] = useState(null);

  // Video state
  const [isMuted, setIsMuted] = useState(true); // must start muted for autoplay
  const [isPlaying, setIsPlaying] = useState(true); // desired state (autoplay)
  const [userPaused, setUserPaused] = useState(false); // user intent override

  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Measure viewport ONCE on first render
  useEffect(() => {
    const height =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setHeroHeight(height);
  }, []);

  // Helper: attempt play (handles browser blocking)
  const tryPlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch {
      // Autoplay can be blocked by browser settings / low power mode.
      // Poster will show, and user can hit Play.
      setIsPlaying(false);
    }
  };

  // Keep DOM video muted in sync with state
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.defaultMuted = isMuted;
    v.volume = isMuted ? 0 : 1;
  }, [isMuted]);

  // Keep DOM playing in sync with state (only if user didn’t manually pause)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying && !userPaused) {
      tryPlay();
    } else {
      v.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, userPaused]);

  // Option B: Pause when hero leaves viewport, resume when it re-enters
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry?.isIntersecting;

        // If out of view: pause (but don't mark as userPaused)
        if (!inView) {
          setIsPlaying(false);
          return;
        }

        // If back in view: resume ONLY if user didn't manually pause
        if (!userPaused) {
          setIsPlaying(true);
        }
      },
      {
        // triggers when it becomes fully out or back in
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [userPaused]);

  const playIcon = useMemo(() => (isPlaying && !userPaused ? "⏸" : "▶"), [isPlaying, userPaused]);
  const soundIcon = useMemo(() => (isMuted ? "🔇" : "🔊"), [isMuted]);

  const onTogglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    const currentlyPlaying = !v.paused && !v.ended;

    if (currentlyPlaying) {
      // user pauses manually
      v.pause();
      setUserPaused(true);
      setIsPlaying(false);
    } else {
      // user plays manually
      setUserPaused(false);
      setIsPlaying(true);
      await tryPlay();
    }
  };

  const onToggleMute = () => {
    setIsMuted((m) => !m);
  };

  return (
    <div className="page">
      {/* HERO */}
      <section
        ref={heroRef}
        className="hero"
        style={heroHeight ? { height: `${heroHeight}px` } : undefined}
      >
        <video
          ref={videoRef}
          className="heroVideo"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />

        <div className="heroOverlay" />

        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background video. Scroll down to see
            more sections below.
          </p>
        </div>

        {/* VISIBLE VIDEO CONTROLS */}
        <div className="heroControls" aria-label="Video controls">
          <button className="heroBtn" type="button" onClick={onTogglePlay} aria-label="Play/pause">
            <span className="heroBtnIcon" aria-hidden="true">{playIcon}</span>
            <span className="heroBtnText">{isPlaying && !userPaused ? "Pause" : "Play"}</span>
          </button>

          <button className="heroBtn" type="button" onClick={onToggleMute} aria-label="Mute/unmute">
            <span className="heroBtnIcon" aria-hidden="true">{soundIcon}</span>
            <span className="heroBtnText">{isMuted ? "Muted" : "Sound"}</span>
          </button>
        </div>
      </section>

      {/* CONTENT SURFACE */}
      <main className="surface">
        <section className="card">
          <h2 className="cardHeader">Overview</h2>
          <p className="cardText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, velit nec pharetra tincidunt, augue risus ultrices
            nisi, vitae posuere neque purus sed elit.
          </p>
        </section>

        <section className="card">
          <h2 className="cardHeader">Details</h2>
          <p className="cardText">
            Praesent eget erat non leo posuere interdum. Integer non justo sed
            orci feugiat ultricies.
          </p>
        </section>

        <section className="card">
          <h2 className="cardHeader">Features</h2>
          <p className="cardText">
            Morbi eleifend, nibh vitae vulputate vulputate, massa arcu luctus
            justo, sit amet luctus enim erat sed mi.
          </p>
        </section>

        <div style={{ height: 600 }} />
      </main>
    </div>
  );
}
