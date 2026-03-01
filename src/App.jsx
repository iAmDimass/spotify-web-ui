export default function App() {
  const artwork =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

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
      <section className="hero" style={{ backgroundImage: `url(${artwork})` }}>
        <div className="heroOverlay" aria-hidden="true" />
        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </p>
        </div>
      </section>

      {/* ONE SURFACE that peeks into hero (Spotify-like) */}
      <main className="surface">
        {sections.map((s) => (
          <section className="card" key={s.title}>
            <div className="cardHeader">{s.title}</div>
            <div className="cardBody">
              <p className="cardText">{s.text}</p>
            </div>
          </section>
        ))}

        <div style={{ height: 700 }} />
      </main>
    </div>
  );
}
