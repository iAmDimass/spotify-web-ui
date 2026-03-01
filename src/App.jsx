import { useEffect, useState } from "react";

export default function App() {
  const artwork =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  const [heroHeight, setHeroHeight] = useState(null);

  // Measure viewport ONCE on first visit (then never change)
  useEffect(() => {
    const h =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setHeroHeight(h);
  }, []);

  return (
    <div className="page">
      {/* HERO */}
      <section
        className="hero"
        style={heroHeight ? { height: `${heroHeight}px` } : undefined}
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

      {/* CONTENT SURFACE (peeks into hero) */}
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
