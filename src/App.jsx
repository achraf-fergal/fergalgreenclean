import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import FergalGreenClean from "./home";
function App() {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<FergalGreenClean />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function About() {
  return (
    <section className="page-section">
      <p className="eyebrow">About</p>
      <h1>A simple route, ready to grow</h1>
      <p className="lead">
        This page is rendered by React Router at <code>/about</code>.
      </p>
      <Link className="text-link" to="/">
        Back to home
      </Link>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="text-link" to="/">
        Return home
      </Link>
    </section>
  );
}

export default App;
