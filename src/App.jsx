import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import FergalGreenClean from "./home";
function App() {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<FergalGreenClean />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function NotFound() {
  // Keep this route out of the index even though the SPA always serves a
  // 200 response — search engines respect a client-rendered noindex tag.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = "Pagina niet gevonden | Fergal Green & Clean";
    return () => {
      document.head.removeChild(meta);
      document.title = previousTitle;
    };
  }, []);

  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Pagina niet gevonden</h1>
      <p className="lead">
        Deze pagina bestaat niet (meer). Ga terug naar de homepage.
      </p>
      <Link className="text-link" to="/">
        Terug naar home
      </Link>
    </section>
  );
}

export default App;
