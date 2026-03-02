import { useEffect, useState } from "react";

export default function App() {
  const artwork =
    "https://image2url.com/r2/default/images/1772355798345-e4c9c96d-86bb-415f-85e0-7932a4873b8b.jpg";

  const [heroHeight, setHeroHeight] = useState(null);

  // Measure viewport ONCE on first render
  useEffect(() => {
    const height =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setHeroHeight(height);
  }, []);

  return (
    <div className="page">
      {/* HERO */}
      <section
        className="hero"
        style={heroHeight ? { height: `${heroHeight}px` } : undefined}
      >
        <img
          src={artwork}
          alt=""
          className="heroImage"
          draggable={false}
        />

        <div className="heroOverlay" />

        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background artwork.
            Scroll down to see more sections below.
          </p>
        </div>
      </section>

      {/* CONTENT SURFACE */}
      <main className="surface">
        <section className="card">
          <h2 className="cardHeader">Overview</h2>
          <p className="cardText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed ullamcorper, velit nec pharetra tincidunt, augue risus
            ultrices nisi, vitae posuere neque purus sed elit.
          </p>
        </section>

        <section className="card">
          <h2 className="cardHeader">Details</h2>
          <p className="cardText">
            Praesent eget erat non leo posuere interdum.
            Integer non justo sed orci feugiat ultricies.
          </p>
        </section>

        <section className="card">
          <h2 className="cardHeader">Features</h2>
          <p className="cardText">
            Morbi eleifend, nibh vitae vulputate vulputate,
            massa arcu luctus justo, sit amet luctus enim erat sed mi.
          </p>
        </section>

        <div style={{ height: 600 }} />
      </main>
    </div>
  );
}
