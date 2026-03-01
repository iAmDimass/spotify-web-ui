import { useLayoutEffect, useRef, useState } from "react";

export default function App() {
  const artwork =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  const didLockRef = useRef(false);
  const [heroH, setHeroH] = useState(null);

  // Lock hero height ONCE, as early as possible, never update again.
  useLayoutEffect(() => {
    if (didLockRef.current) return;
    didLockRef.current = true;

    const measure = () => {
      // Prefer visualViewport if available, but fall back safely.
      const h =
        Math.round(window.visualViewport?.height ?? 0) ||
        Math.round(document.documentElement.clientHeight ?? 0) ||
        Math.round(window.innerHeight ?? 0);

      setHeroH(h);

      // Also set CSS var (useful if you want to refer in CSS later)
      document.documentElement.style.setProperty("--heroH", `${h}px`);
    };

    // Measure at layout time and once more on next frame (stabilizes on mobile)
    measure();
    requestAnimationFrame(measure);
  }, []);

  const sections = [
    {
      title: "Overview",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper, velit nec pharetra tincidunt, augue risus ultrices nisi, vitae posuere neque purus sed elit.",
    },
    {
      title: "Details",
      text: "Praesent eget erat non leo posuere interdum. Integer non justo sed orci feugiat ultricies.",
    },
    {
      title: "Features",
      text: "Morbi eleifend, nibh vitae vulputate vulputate, massa arcu luctus justo, sit amet luctus enim erat sed mi.",
    },
    {
      title: "More",
      text: "Aliquam erat volutpat. Donec ac felis id libero tincidunt consequat. Duis non ex in justo elementum volutpat.",
    },
  ];

  return (
    <div className="page">
      {/* HERO */}
      <section
        className="hero"
        style={heroH ? { height: `${heroH}px` } : undefined}
      >
        <img src={artwork} alt="" className="heroImage" draggable={false} />
        <div className="heroOverlay" aria-hidden="true" />

        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </p>
        </div>
      </section>

      {/* SURFACE (peeks into hero by a fixed amount) */}
      <main className="surface">
        {sections.map((s) => (
          <section className="card" key={s.title}>
            <h2 className="cardHeader">{s.title}</h2>
            <p className="cardText">{s.text}</p>
          </section>
        ))}
        <div style={{ height: 600 }} />
      </main>
    </div>
  );
}
