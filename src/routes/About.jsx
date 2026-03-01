import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <section className="card">
        <h2 className="cardHeader">About</h2>
        <p className="cardText">
          This is a second route using the same locked hero height + safe-area
          padding. Navigate back to Home below.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link className="link" to="/">
            ← Back to Home
          </Link>
        </div>
      </section>

      <div style={{ height: 700 }} />
    </>
  );
}
