export default function App() {
  const artworkUrl =
    "https://instagram.fsrg5-1.fna.fbcdn.net/v/t51.82787-15/634497238_18565576186035723_1226701140431012928_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzgzMTcwMDY4NDIyODMxMDc4OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=mIjTb1950TAQ7kNvwE6XDg5&_nc_oc=Adl6si-apmV1EbBOvt1Y2kSrzAEPJ6e1yLu5iXdbKJyP4x7otf85nFKsQjhLpyTjDos&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsrg5-1.fna&_nc_gid=FA3IH9BEGa5_3_ZpFRzmFg&_nc_ss=8&oh=00_AfskOgFJeVW11LlS3wvGkCPksDSSDBy43Pw6OMdz2h_NZA&oe=69A9B5EE";

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
