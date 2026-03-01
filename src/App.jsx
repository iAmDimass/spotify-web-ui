export default function App() {
  const artwork =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  return (
    <div className="page">
      <section className="hero" style={{ backgroundImage: `url(${artwork})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">Discover New Experiences</h1>
          <p className="heroDesc">
            A simple hero section with a background artwork. Scroll down to see
            more sections below.
          </p>
        </div>
      </section>

      <main className="sections">
        <section className="section">
          {/* keep peek class here */}
          <div className="sectionHeader peek">Overview</div>
          <div className="sectionCard">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ullamcorper, velit nec pharetra tincidunt, augue risus ultrices
              nisi, vitae posuere neque purus sed elit.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">Details</div>
          <div className="sectionCard">
            <p>
              Praesent eget erat non leo posuere interdum. Integer non justo sed
              orci feugiat ultricies.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">Features</div>
          <div className="sectionCard">
            <p>
              Morbi eleifend, nibh vitae vulputate vulputate, massa arcu luctus
              justo, sit amet luctus enim erat sed mi.
            </p>
          </div>
        </section>

        <div style={{ height: 700 }} />
      </main>
    </div>
  );
}            </p>
          </div>
        </section>

        {/* More sections */}
        <section className="section">
          <div className="sectionHeader">Details</div>
          <div className="sectionCard">
            <p>
              Praesent eget erat non leo posuere interdum.
              Integer non justo sed orci feugiat ultricies.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">Features</div>
          <div className="sectionCard">
            <p>
              Morbi eleifend, nibh vitae vulputate vulputate,
              massa arcu luctus justo, sit amet luctus enim erat sed mi.
            </p>
          </div>
        </section>

        <div style={{ height: 600 }} />
      </main>
    </div>
  );
}
