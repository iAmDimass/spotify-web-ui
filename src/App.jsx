export default function App() {
  const artworkUrl =
    "https://image2url.com/r2/default/images/1772355798345-e4c9c96d-86bb-415f-85e0-7932a4873b8b.jpg";

  return (
    <div className="page">
      {/* SECTION 1: HERO (opening section) */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      >
        {/* Static overlay only for readability (NOT animated) */}
        <div className="heroOverlay" aria-hidden="true" />

        <div className="heroContent">
          <div className="heroTitle">Discover New Experiences</div>
          <div className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </div>
        </div>
      </section>

      {/* SECTION 2-5: normal content sections */}
      <main className="sections">
        <section className="sectionCard">
          <h3 className="sectionTitle">Overview</h3>
          <p className="sectionText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, velit nec pharetra tincidunt, augue risus ultrices
            nisi, vitae posuere neque purus sed elit.
          </p>
        </section>

        <section className="sectionCard">
          <h3 className="sectionTitle">Details</h3>
          <p className="sectionText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget erat non leo posuere interdum. Integer non justo sed orci
            feugiat ultricies.
          </p>
        </section>

        <section className="sectionCard">
          <h3 className="sectionTitle">Features</h3>
          <p className="sectionText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            eleifend, nibh vitae vulputate vulputate, massa arcu luctus justo,
            sit amet luctus enim erat sed mi.
          </p>
        </section>

        <section className="sectionCard">
          <h3 className="sectionTitle">More Information</h3>
          <p className="sectionText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            erat volutpat. Donec ac felis id libero tincidunt consequat. Duis
            non ex in justo elementum volutpat.
          </p>
        </section>

        <div style={{ height: 700 }} />
      </main>
    </div>
  );
}
