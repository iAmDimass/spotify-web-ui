export default function App() {
  const artworkUrl =
    "https://instagram.fsrg5-2.fna.fbcdn.net/v/t39.30808-6/641024289_905891149039122_8055481058494607355_n.jpg?stp=c0.0.1536.1919a_dst-jpg_e35_s1536x1919_tt6&_nc_cat=104&ig_cache_key=Mzg0MTgxOTI4NDcyMDkxMjQ1MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE1MzZ4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=HcHMMBhE_o8Q7kNvwHNsVzh&_nc_oc=Adk110KzaOL4LHk_ixQ33K0rSHse_gB3RcZs7XtNcGfY6xdtS3BK-N0tJ29exjp7Z-A&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsrg5-2.fna&_nc_gid=eHwqSs_QLzXV-zC_PnhMmw&_nc_ss=8&oh=00_AfvUrxJpRfuoOY_KKJdOdlfYXManUxMX9-gXcKv876WbAA&oe=69A9BB4E";

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
