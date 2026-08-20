import { useState } from "react";

const sectors = [
  {
    name: "Industrie",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e8746_600x600%20thema%20industrie.avif",
    text: "Bij de productie houden wij het schoon",
  },
  {
    name: "In de buurt",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e8849_buurt%20main%20500x500.avif",
    text: "Schoonmaak op maat voor MKB",
  },
  {
    name: "Mobiliteit",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e874a_600x600%20thema%20mobiliteit.avif",
    text: "Onderweg houden wij het schoon",
  },
  {
    name: "Onderwijs",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e874b_600x600%20thema%20Onderwijs.avif",
    text: "Op school houden wij het schoon",
  },
  {
    name: "Overheid",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e88f2_600x600%20thema%20plaatje%20sector%20pagina%20overheid%202.0.avif",
    text: "Bij de overheid houden wij het schoon",
  },
  {
    name: "Recreatie",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e8749_600x600%20thema%20recreatie.avif",
    text: "Op vakantie houden wij het schoon",
  },
  {
    name: "Retail",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e8748_600x600%20thema%20retail.avif",
    text: "In de winkel houden wij het schoon",
  },
  {
    name: "Zakelijk",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e8747_600x600%20thema%20zakelijk.avif",
    text: "Op kantoor houden wij het schoon",
  },
  {
    name: "Zorg",
    image:
      "https://cdn.prod.website-files.com/69136227eed3deae1c2e7c43/69136227eed3deae1c2e874c_600x600%20thema%20zorg.avif",
    text: "In de zorg houden wij het schoon",
  },
];

export default function SectorSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeSector = sectors[activeIndex];

  return (
    <section
      className="section--sector-slider"
      aria-labelledby="sector-slider-title"
    >
      <div className="sector-slider_component">
        <div className="container-wide sector-slider-container">
          <h2 id="sector-slider-title" className="sector-slider-title">
            Sectoren waarin Asito schoonmaakt
          </h2>
          <div className="sector-slider-grid">
            <div
              className="sector-slider-list"
              role="list"
              aria-label="Sectoren"
            >
              {sectors.map((sector, index) => (
                <button
                  type="button"
                  role="listitem"
                  key={sector.name}
                  className={`sector-slider-item ${activeIndex === index ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  <span className="sector-slider-name">{sector.name}</span>
                  <span className="sector-slider-and">&amp; Asito</span>
                  <span className="sector-slider-line" />
                </button>
              ))}
            </div>
            <article className="sector-slider-feature" key={activeSector.name}>
              <img
                src={activeSector.image}
                alt={`Sector ${activeSector.name}`}
              />
              <div className="sector-slider-overlay" />
              <div className="sector-slider-copy">
                <span className="eyebrow">{activeSector.name} &amp; Asito</span>
                <h3>{activeSector.text}</h3>
                <a href="#contact" className="button button-light">
                  Meer over {activeSector.name}
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
