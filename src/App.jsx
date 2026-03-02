import { useEffect, useState } from "react";

export default function App() {
  const artwork =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  const [heroHeight, setHeroHeight] = useState(null);

  // Measure viewport ONCE (first visit) and lock forever
  useEffect(() => {
    const h =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setHeroHeight(Math.round(h));
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
  ];

  return (
    <div className="page">
      {/* HERO (always behind cards) */}
      <section
        className="hero"
        style={heroHeight ? { height: `${heroHeight}px` } : undefined}
      >
        <img className="heroImage" src={artwork} alt="" draggable={false} />
        <div className="heroOverlay" aria-hidden="true" />

        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </p>
        </div>
      </section>

      {/* CONTENT SURFACE (always above hero) */}
      <main className="surface" role="main">
        {sections.map((s) => (
          <section className="card" key={s.title}>
            <h2 className="cardHeader">{s.title}</h2>
            <p className="cardText">{s.text}</p>
          </section>
        ))}

        <div style={{ height: 700 }} />
      </main>
    </div>
  );
}
