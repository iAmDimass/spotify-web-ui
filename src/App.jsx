import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const videoSrc =
    "https://image2url.com/r2/default/videos/1772529007332-748e1086-4c90-40f2-b29b-e9614d766984.mp4";

  const posterSrc =
    "https://image2url.com/r2/default/images/1772355798345-e4c9c96d-86bb-415f-85e0-7932a4873b8b.jpg";

  const [heroHeight, setHeroHeight] = useState(null);

  // Video state
  const [isMuted, setIsMuted] = useState(true); // must start muted for autoplay
  const [isPlaying, setIsPlaying] = useState(true); // auto intent (when allowed)
  const [userPaused, setUserPaused] = useState(false); // manual override

  // Page/viewport state (performance)
  const [pageVisible, setPageVisible] = useState(true);

  // “flash icon” state (appears once then disappears)
  const [flash, setFlash] = useState(null); // "play" | "pause" | null
  const flashTimerRef = useRef(null);

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

  // ✅ 1) Pause/resume when tab/app visibility changes
  useEffect(() => {
    const onVis = () => {
      const visible = document.visibilityState === "visible";
      setPageVisible(visible);

      // If hidden, always stop playback (but don't mark userPaused)
      if (!visible) {
        setIsPlaying(false);
        return;
      }

      // If visible again, resume only if user didn't manually pause
      if (!userPaused) {
        setIsPlaying(true);
      }
    };

    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [userPaused]);

  // Helper: attempt play (handles browser blocking)
  const tryPlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch {
      // Autoplay can be blocked. Poster still shows; user can tap to play.
      setIsPlaying(false);
    }
  };

  // Sync mute
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.defaultMuted = isMuted;
    v.volume = isMuted ? 0 : 1;
  }, [isMuted]);

  // Sync play/pause with state (respect userPaused and page visibility)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // If page is hidden, pause no matter what
    if (!pageVisible) {
      v.pause();
      return;
    }

    if (isPlaying && !userPaused) {
      tryPlay();
    } else {
      v.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, userPaused, pageVisible]);

  // Option B: Pause when hero leaves viewport, resume when back (if not userPaused)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry?.isIntersecting;

        if (!inView) {
          setIsPlaying(false);
          return;
        }

        // Resume only if:
        // - user didn't manually pause
        // - page is visible
        if (!userPaused && pageVisible) {
          setIsPlaying(true);
        }
      },
      { threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [userPaused, pageVisible]);

  const showFlash = (type) => {
    setFlash(type);

    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => {
      setFlash(null);
      flashTimerRef.current = null;
    }, 650);
  };

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  // Tap only the VIDEO LAYER (not text/controls)
  const onTogglePlayFromVideoTap = async () => {
    const v = videoRef.current;
    if (!v) return;

    const currentlyPlaying = !v.paused && !v.ended;

    if (currentlyPlaying) {
      v.pause();
      setUserPaused(true);
      setIsPlaying(false);
      showFlash("pause");
    } else {
      setUserPaused(false);
      setIsPlaying(true);
      await tryPlay();
      showFlash("play");
    }
  };

  const onToggleMute = () => {
    setIsMuted((m) => !m);
  };

  const soundLabel = useMemo(() => (isMuted ? "Muted" : "Sound"), [isMuted]);
  const soundIcon = useMemo(() => (isMuted ? "🔇" : "🔊"), [isMuted]);
  const flashIcon = flash === "play" ? "▶" : flash === "pause" ? "⏸" : "";

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
          preload="metadata"   /* ✅ 2) lighter preload for performance */
        />

        <div className="heroOverlay" />

        {/* Tap layer sits ABOVE video/overlay but BELOW text+controls */}
        <button
          type="button"
          className="heroTapLayer"
          aria-label="Toggle video play/pause"
          onClick={onTogglePlayFromVideoTap}
        />

        {/* One-time flash indicator */}
        {flash && (
          <div className="heroFlash" aria-hidden="true">
            <div className="heroFlashIcon">{flashIcon}</div>
          </div>
        )}

        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background video. Scroll down to see
            more sections below.
          </p>
        </div>

        {/* Controls: ONLY Mute/Unmute */}
        <div className="heroControls" aria-label="Video controls">
          <button
            className="heroBtn"
            type="button"
            onClick={onToggleMute}
            aria-label="Mute/unmute"
          >
            <span className="heroBtnIcon" aria-hidden="true">
              {soundIcon}
            </span>
            <span className="heroBtnText">{soundLabel}</span>
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
