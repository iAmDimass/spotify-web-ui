export default function App() {
  const artworkUrl =
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&q=80&auto=format&fit=crop";

  const sections = [
    {
      title: "Overview",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper, velit nec pharetra tincidunt, augue risus ultrices nisi, vitae posuere neque purus sed elit.",
    },
    {
      title: "Details",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget erat non leo posuere interdum. Integer non justo sed orci feugiat ultricies.",
    },
    {
      title: "Features",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend, nibh vitae vulputate vulputate, massa arcu luctus justo, sit amet luctus enim erat sed mi.",
    },
    {
      title: "More Information",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Donec ac felis id libero tincidunt consequat. Duis non ex in justo elementum volutpat.",
    },
  ];

  return (
    <div className="page">
      {/* SECTION 1: HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      >
        <div className="heroOverlay" aria-hidden="true" />

        <div className="heroContent">
          <div className="heroTitle">Discover New Experiences</div>
          <div className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </div>
        </div>
      </section>

      {/* SECTION 2+: normal scroll */}
      <main className="sections">
        {sections.map((s) => (
          <section key={s.title} className="sectionBlock">
            {/* Spotify-like peek header strip */}
            <div className="sectionPeekHeader">{s.title}</div>

            {/* Content card (starts below, so peek shows mostly header) */}
            <div className="sectionCard">
              <p className="sectionText">{s.text}</p>
            </div>
          </section>
        ))}

        <div style={{ height: 800 }} />
      </main>
    </div>
  );
}
