export default function Home() {
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
    <>
      {sections.map((s) => (
        <section className="card" key={s.title}>
          <h2 className="cardHeader">{s.title}</h2>
          <p className="cardText">{s.text}</p>
        </section>
      ))}

      <div style={{ height: 700 }} />
    </>
  );
}
