import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroLayout from "./layout/HeroLayout";
import Home from "./routes/Home";
import About from "./routes/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route group using the reusable hero layout */}
        <Route
          element={
            <HeroLayout
              hero={{
                artwork:
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop",
                title: "Discover New Experiences",
                desc: "A simple hero section with a background artwork. Scroll down to see more sections below.",
              }}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
