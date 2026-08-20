import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Bike,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Coffee,
  House,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Send,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import Section from "./Section.jsx";
import SectorSlider from "./SectorSlider";
import Scrol from "./scrol.jsx";
import DetailView from "./DetailView"; // adjust path to where DetailView.jsx lives

// High-resolution Unsplash URLs with professional query parameters
const getServiceDetails = () => ({
  schoonmaak: {
    id: "schoonmaak",
    number: "01",
    name: "Schoonmaak",
    category: "Professionele reiniging",
    location: "Maastricht",
    year: "2026",
    color: "#1677ff",

    tagline: "Een fris, verzorgd resultaat — elke keer opnieuw.",

    description:
      "Van woningen tot restaurants: een grondige, betrouwbare schoonmaak die past bij uw ruimte en ritme.",

    technologies: ["Woningen", "Kantoren", "Horeca"],

    images: [
      "/schoonmaak/Gemini_Generated_Image_1vzbgu1vzbgu1vzb.jpg",
      "/schoonmaak/Gemini_Generated_Image_39p99e39p99e39p9.jpg",
      "/schoonmaak/Gemini_Generated_Image_6xhnas6xhnas6xhn.jpg",
      "/schoonmaak/Gemini_Generated_Image_aswtedaswtedaswt.jpg",
      "/schoonmaak/Gemini_Generated_Image_k1on6zk1on6zk1on.jpg",
      "/schoonmaak/Gemini_Generated_Image_ql7amyql7amyql7a.jpg",
      "/schoonmaak/Gemini_Generated_Image_vb5t7qvb5t7qvb5t.jpg",
    ],

    quote: "Een schone ruimte is het begin van een goede dag.",

    processHeading: "Onze aanpak",

    processP1:
      "We starten met een kort gesprek over uw ruimte en wensen, zodat de aanpak precies aansluit.",

    processP2:
      "Daarna komen we op vaste momenten langs en houden we kort contact over hoe het gaat.",

    kpis: [
      ["100+", "Tevreden klanten"],
      ["4.9★", "Score"],
      ["7", "Dagen per week"],
      ["0", "Verrassingen"],
    ],
  },

  tuinonderhoud: {
    id: "tuinonderhoud",
    number: "02",
    name: "Tuinonderhoud",
    category: "Onderhoud & verzorging",
    location: "Maastricht",
    year: "2026",
    color: "#39a269",

    tagline: "Een tuin die uitnodigt om buiten te zijn.",

    description:
      "Van een nette voortuin tot een groene buitenplek: onderhoud met zorg en oog voor detail.",

    technologies: ["Gazon", "Hagen", "Seizoensonderhoud"],

    images: [
      "/jardan/Gemini_Generated_Image_eh8tnteh8tnteh8t.jpg",
      "/jardan/Gemini_Generated_Image_h412feh412feh412.jpg",
      "/jardan/Gemini_Generated_Image_oiy0qoiy0qoiy0qo (1).jpg",
      "/jardan/Gemini_Generated_Image_q4nfl6q4nfl6q4nf.jpg",
      "/jardan/Gemini_Generated_Image_qvaiz1qvaiz1qvai.jpg",
      "/jardan/Gemini_Generated_Image_sqz19psqz19psqz1.jpg",
      '/jardan/Gemini_Generated_Image_wpm30hwpm30hwpm3.jpg',
    ],

    quote: "Een verzorgde tuin geeft rust aan een heel huis.",

    processHeading: "Onze aanpak",

    processP1:
      "We bekijken uw tuin en bespreken wat er nodig is, van gazon tot hagen.",

    processP2:
      "Vervolgens onderhouden we op vaste basis, zodat uw tuin er altijd verzorgd bij ligt.",

    kpis: [
      ["50+", "Tuinen per jaar"],
      ["4.9★", "Score"],
      ["Bakfiets", "Vervoer"],
      ["0", "Verrassingen"],
    ],
  },
});
/* -------------------------------------------------------------------------
   Local image imports from the original project have been replaced with
   placeholder URLs below (the source .jpg/.png assets aren't available in
   this single-file context). Swap these for your own image URLs / imports.
------------------------------------------------------------------------- */
const flyerAsset = "https://picsum.photos/seed/fergal-flyer/685/988";
const logoMarkAsset = "/image.png"; // Replace with your actual logo path
const cleanHomeAsset = "https://picsum.photos/seed/fergal-home/900/700";
const cleanOfficeAsset = "https://picsum.photos/seed/fergal-office/900/700";
const gardenCareAsset = "https://picsum.photos/seed/fergal-garden/900/700";

const services = [
  {
    label: "Schoonmaak woningen",
    kicker: "Thuis",
    icon: House,
    image: cleanHomeAsset,
    text: "Een fris, rustig huis — met aandacht voor de plekken die het verschil maken.",
  },
  {
    label: "Schoonmaak bedrijven",
    kicker: "Werken",
    icon: Building2,
    image: cleanOfficeAsset,
    text: "Een verzorgde werkomgeving voor teams, klanten en bezoekers. Planbaar en discreet.",
  },
  {
    label: "Schoonmaak restaurants",
    kicker: "Horeca",
    icon: Utensils,
    image: flyerAsset,
    text: "Hygiëne die je proeft. Zorgvuldig van keuken tot gastenruimte, voor elke service.",
  },
  {
    label: "Schoonmaak cafés",
    kicker: "Horeca",
    icon: Coffee,
    image: cleanOfficeAsset,
    text: "Een uitnodigende plek begint met een schone vloer, bar en tafel.",
  },
  {
    label: "Schoonmaak kantoren",
    kicker: "Werken",
    icon: BriefcaseBusiness,
    image: cleanOfficeAsset,
    text: "Fris binnenkomen, prettig samenwerken. Voor kleine en grotere kantoorruimtes.",
  },
  {
    label: "Tuinonderhoud",
    kicker: "Buiten",
    icon: Scissors,
    image: gardenCareAsset,
    text: "Van een nette voortuin tot een groene buitenplek waar u graag tijd doorbrengt.",
  },
];

const principles = [
  {
    no: "01",
    title: "Efficiënte werkwijze",
    text: "We werken met een heldere aanpak, vaste afspraken en oog voor uw tijd.",
  },
  {
    no: "02",
    title: "Betrouwbare service",
    text: "U weet waar u aan toe bent. We komen wanneer we dat afspreken en houden contact.",
  },
  {
    no: "03",
    title: "Kwaliteit waar u op kunt rekenen",
    text: "Geen vluchtige ronde, maar werk dat zichtbaar klopt — elke keer opnieuw.",
  },
  {
    no: "04",
    title: "Met zorg voor elke omgeving",
    text: "Voor woningen, bedrijven en horeca. We passen ons aan aan wat uw plek nodig heeft.",
  },
];

function withDetailImages(service) {
  const images = service.images ?? [];
  const imageAt = (index) => images[index] ?? images[0] ?? "";

  return {
    ...service,
    leftImage: service.leftImage ?? imageAt(0),
    rightImage: service.rightImage ?? imageAt(1),
    image3: service.image3 ?? imageAt(2),
    image4: service.image4 ?? imageAt(3),
    image5: service.image5 ?? imageAt(4),
    image6: service.image6 ?? imageAt(5),
    image7: service.image7 ?? imageAt(6),
    image8: service.image8 ?? imageAt(7),
  };
}

function AppLogo({ light = false }) {
  return (
    <a className="brand" href="#top" data-testid="link-logo">
      <span className="brand-mark">
        <img src={logoMarkAsset} alt="" />
      </span>
      <span
        className="brand-name"
        style={light ? { color: "hsl(48 30% 98%)" } : undefined}
      >
        Fergal
        <small>Green &amp; Clean</small>
      </span>
    </a>
  );
}

function QuoteModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Schoonmaak woningen",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Er ging iets mis.");
      }

      setSent(true);
    } catch (error) {
      console.error("Quote submission error:", error);
      setError(
        "Er ging iets mis bij het verzenden. Probeer het opnieuw."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Venster sluiten"
          data-testid="button-close-quote"
        >
          <X />
        </button>

        {!sent ? (
          <>
            <span className="eyebrow">
              Vrijblijvend kennismaken
            </span>

            <h2 id="quote-title">
              Vertel wat er nodig is.
            </h2>

            <p>
              Laat uw gegevens achter. We nemen persoonlijk contact op om mee
              te denken over een passende aanpak.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="quote-name">Naam</label>

                <input
                  id="quote-name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    update("name", event.target.value)
                  }
                  placeholder="Uw naam"
                  data-testid="input-quote-name"
                />
              </div>

              <div className="field">
                <label htmlFor="quote-email">
                  E-mail
                </label>

                <input
                  id="quote-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    update("email", event.target.value)
                  }
                  placeholder="uw@email.nl"
                  data-testid="input-quote-email"
                />
              </div>

              <div className="field">
                <label htmlFor="quote-phone">
                  Telefoon
                </label>

                <input
                  id="quote-phone"
                  value={form.phone}
                  onChange={(event) =>
                    update("phone", event.target.value)
                  }
                  placeholder="+31 ..."
                  data-testid="input-quote-phone"
                />
              </div>

              <div className="field">
                <label htmlFor="quote-service">
                  Waar kunnen we bij helpen?
                </label>

                <select
                  id="quote-service"
                  value={form.service}
                  onChange={(event) =>
                    update("service", event.target.value)
                  }
                  data-testid="select-quote-service"
                >
                  {services.map((service) => (
                    <option key={service.label}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="quote-message">
                  Korte toelichting
                </label>

                <textarea
                  id="quote-message"
                  value={form.message}
                  onChange={(event) =>
                    update("message", event.target.value)
                  }
                  placeholder="Vertel iets over de ruimte, tuin of gewenste frequentie."
                  data-testid="input-quote-message"
                />
              </div>

              {error && (
                <p
                  style={{
                    margin: "0 0 14px",
                    color: "#c0392b",
                    fontSize: ".85rem",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                className="button button-primary"
                type="submit"
                disabled={sending}
                data-testid="button-submit-quote"
                style={{
                  opacity: sending ? 0.7 : 1,
                  cursor: sending ? "wait" : "pointer",
                }}
              >
                {sending ? (
                  <>
                    Aanvraag wordt verzonden...
                  </>
                ) : (
                  <>
                    Aanvraag versturen <Send />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="form-success">
            <div>
              <CheckCircle2 />
            </div>

            <h3>Bedankt voor uw aanvraag.</h3>

            <p>
              Uw aanvraag is succesvol verzonden. We nemen zo snel mogelijk
              persoonlijk contact met u op.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const serviceDetails = getServiceDetails();
  const homeRef = useRef(null);
  const openQuote = () => {
    setQuoteOpen(true);
    setMenuOpen(false);
  };
  const openService = (service) => setActiveService(withDetailImages(service));
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const root = homeRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll("[data-reveal]"));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" id="top" ref={homeRef}>
      <div className="topline">
        <div className="container-wide topline-inner">
          <span>Lokale service voor een omgeving die goed voelt.</span>
          <div className="topline-meta">
            <span>
              <Phone />{" "}
              <a href="tel:+31687955899" data-testid="link-top-phone">
                +31 687955899
              </a>
            </span>
            <span>
              <Mail />{" "}
              <a
                href="mailto:f.greenlean@gmail.com"
                data-testid="link-top-email"
              >
                f.greenlean@gmail.com
              </a>
            </span>
          </div>
        </div>
      </div>
      <header className="navbar">
        <div className="container-wide nav-inner">
          <AppLogo light />
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu openen"
            aria-expanded={menuOpen}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            className={`nav-links ${menuOpen ? "is-open" : ""}`}
            position="fixed"
            aria-label="Hoofdnavigatie"
          >
            <a
              href="#diensten"
              onClick={closeMenu}
              data-testid="link-nav-diensten"
            >
              Diensten
            </a>
            <a
              href="#werkwijze"
              onClick={closeMenu}
              data-testid="link-nav-werkwijze"
            >
              Werkwijze
            </a>
            <a
              href="#duurzaam"
              onClick={closeMenu}
              data-testid="link-nav-duurzaam"
            >
              Duurzaam
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              data-testid="link-nav-contact"
            >
              Contact
            </a>
            <button
              className="button button-light nav-cta"
              onClick={openQuote}
              data-testid="button-nav-quote"
            >
              Offerte aanvragen <ArrowRight />
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Section />

        <div className="signal-strip" data-reveal="up">
          <div className="container-wide signal-inner">
            <div className="signal-item">
              <span className="signal-icon">
                <Sparkles />
              </span>
              <span>
                <small>01 / Aanpak</small>Efficiënte werkwijze
              </span>
            </div>
            <div className="signal-item">
              <span className="signal-icon">
                <BadgeCheck />
              </span>
              <span>
                <small>02 / Service</small>Betrouwbare service
              </span>
            </div>
            <div className="signal-item">
              <span className="signal-icon">
                <Leaf />
              </span>
              <span>
                <small>03 / Resultaat</small>Kwaliteit waar u op kunt rekenen
              </span>
            </div>
          </div>
        </div>

        <section className="section intro-section" id="werkwijze">
          <div className="container-wide intro-layout">
            <div className="intro-lead section-heading" data-reveal="left">
              <span className="eyebrow">De Fergal belofte</span>
              <h2 className="display">Schoon begint bij aandacht.</h2>
              <p>
                Een schone woning, een fris kantoor of een verzorgde tuin: het
                maakt elke dag prettiger. Wij zorgen voor dat gevoel, met een
                aanpak die nuchter, zorgvuldig en persoonlijk is.
              </p>
              <a
                className="text-link"
                href="#contact"
                style={{ marginTop: 30 }}
                data-testid="link-intro-contact"
              >
                Samen kijken wat past <ArrowRight />
              </a>
            </div>
            <div className="principles" data-reveal="right">
              {principles.map((principle, index) => (
                <article
                  className="principle"
                  key={principle.no}
                  data-testid={`card-principle-${principle.no}`}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <span className="principle-no">{principle.no}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section services-section bg-[#f4f7fb]"
          id="diensten"
        >
          <div className="container-wide">
            {/* Header */}
            <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_420px]">
              <div className="section-heading" data-reveal="left">
                <span className="eyebrow">Wat we doen</span>

                <h2 className="display mt-3 max-w-[750px]">
                  Ruimte voor wat belangrijk is.
                </h2>
              </div>

              <p
                className="section-heading text-[15px] leading-[1.65] text-[hsl(var(--muted-foreground))]"
                data-reveal="right"
              >
                Van binnen naar buiten, voor thuis en op het werk. Kies de
                ondersteuning die uw omgeving nodig heeft.
              </p>
            </div>

            {/* Werkgebied */}
            <div
              className="
        mb-10
        flex
        items-start
        gap-4
        rounded-xl
        border
        border-black/[0.06]
        bg-white
        p-5
        shadow-sm
      "
              data-reveal="up"
            >
              <div
                className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#1677ff]
          text-white
        "
              >
                <MapPin size={18} />
              </div>

              <div>
                <span className="eyebrow">Werkgebied</span>

                <h3 className="mt-1 text-base font-medium text-[#202327]">
                  Is deze service beschikbaar in Maastricht en omgeving?
                </h3>

                <p className="mt-1 max-w-4xl text-[13px] leading-[1.6] text-[hsl(var(--muted-foreground))]">
                  Ja. Fergal Green &amp; Clean is beschikbaar in Maastricht en
                  de omliggende plaatsen. We helpen particulieren en ondernemers
                  met betrouwbare schoonmaak voor woningen, bedrijven,
                  restaurants, cafés en kantoren — en met zorgvuldig
                  tuinonderhoud buiten.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Schoonmaak */}
              <article
                data-testid="card-service-cleaning"
                data-reveal="up"
                onClick={() => openService(serviceDetails.schoonmaak)}
                className="group relative aspect-[1.45/1] overflow-hidden rounded-[10px] bg-[#073b66] cursor-pointer"
              >
                <img
                  src={serviceDetails.schoonmaak.images[0]}
                  alt="Schoonmaak"
                  className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        ease-out
        group-hover:scale-[1.04]
      "
                />

                <div
                  className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/70
        via-black/10
        to-transparent
      "
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/60">
                      Professionele reiniging
                    </span>

                    <h3 className="text-[28px] font-medium tracking-[-0.03em] text-white">
                      Schoonmaak
                    </h3>
                  </div>

                  <span
                    className="
          flex h-10 w-10 items-center justify-center
          rounded-full bg-white text-[#17352a]
          transition-transform duration-300
          group-hover:translate-x-1
        "
                  >
                    →
                  </span>
                </div>
              </article>

              {/* Tuinonderhoud */}
              <article
                data-testid="card-service-garden"
                data-reveal="up"
                style={{ "--reveal-delay": "100ms" }}
                onClick={() => openService(serviceDetails.tuinonderhoud)}
                className="group relative aspect-[1.45/1] overflow-hidden rounded-[10px] bg-[#073b66] cursor-pointer"
              >
                <img
                  src={serviceDetails.tuinonderhoud.images[0]}
                  alt="Tuinonderhoud"
                  className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        ease-out
        group-hover:scale-[1.04]
      "
                />

                <div
                  className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/70
        via-black/10
        to-transparent
      "
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/60">
                      Onderhoud & verzorging
                    </span>

                    <h3 className="text-[28px] font-medium tracking-[-0.03em] text-white">
                      Tuinonderhoud
                    </h3>
                  </div>

                  <span
                    className="
          flex h-10 w-10 items-center justify-center
          rounded-full bg-white text-[#17352a]
          transition-transform duration-300
          group-hover:translate-x-1
        "
                  >
                    →
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
        {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
        {activeService && (
          <DetailView
            project={activeService}
            onBack={() => setActiveService(null)}
          />
        )}


        <section className="section sustain-section" id="duurzaam">
          <div className="container-wide sustain-layout">
            <div className="sustain-copy" data-reveal="left">
              <span className="eyebrow">Zorg voor de omgeving</span>
              <h2 className="display">
                Schoon werken, met een lichte voetafdruk.
              </h2>
              <p>
                Onze bakfiets brengt ons naar de klus zonder onnodige uitstoot.
                Want zorg voor een schone omgeving begint niet pas bij het
                eindresultaat, maar al bij de manier waarop we er komen.
              </p>
              <div className="sustain-points">
                <div className="sustain-point">
                  <Bike />
                  <strong>Duurzaam vervoer</strong>
                  <span>Met de bakfiets naar klanten in de buurt.</span>
                </div>
                <div className="sustain-point">
                  <Leaf />
                  <strong>Bewuste keuzes</strong>
                  <span>Praktisch omgaan met middelen en materialen.</span>
                </div>
              </div>
            </div>
            <div className="bike-visual" data-reveal="right">
              <img
                src={gardenCareAsset}
                alt="Fergal verzorgt tuinen met aandacht voor de omgeving"
              />
              <div className="bike-label">
                <strong>Van deur tot tuin.</strong>
                <span>
                  Betrouwbaar onderweg
                  <br />
                  met aandacht voor morgen.
                </span>
              </div>
              <div className="bike-badge">
                <Bike />
                <span>
                  Duurzaam vervoer
                  <br />
                  met bakfiets
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container-wide process-grid">
            <div data-reveal="left">
              <div className="section-heading">
                <span className="eyebrow">Zo werkt het</span>
                <h2 className="display">Geen gedoe. Wel goed geregeld.</h2>
                <p>
                  U vertelt wat er nodig is, wij maken het overzichtelijk. Zo
                  weet u vooraf wat u kunt verwachten.
                </p>
              </div>
              <div className="process-list">
                <div className="process-row">
                  <span className="process-number">01</span>
                  <div>
                    <h3>We luisteren</h3>
                    <p>Een kort gesprek over uw ruimte, wensen en planning.</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="process-row">
                  <span className="process-number">02</span>
                  <div>
                    <h3>We maken een plan</h3>
                    <p>
                      Een heldere aanpak die past bij uw omgeving en budget.
                    </p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="process-row">
                  <span className="process-number">03</span>
                  <div>
                    <h3>We zorgen ervoor</h3>
                    <p>
                      We komen voorbereid, werken zorgvuldig en laten het netjes
                      achter.
                    </p>
                  </div>
                  <ChevronRight />
                </div>
              </div>
            </div>
            <aside className="process-aside" data-reveal="right">
              <CircleUserRound />
              <h3>Een vast gezicht maakt verschil.</h3>
              <p>
                Bij Fergal weet u met wie u contact heeft. Dat werkt prettig —
                voor u én voor ons.
              </p>
              <a
                className="text-link"
                href="tel:+31687955899"
                style={{ marginTop: 28 }}
                data-testid="link-process-call"
              >
                Bel ons direct <Phone />
              </a>
            </aside>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container-wide">
            <div className="contact-panel" data-reveal="up">
              <div className="contact-copy">
                <span className="eyebrow">Neem contact op</span>
                <h2 className="display">Klaar voor een omgeving die klopt?</h2>
                <p>
                  Vertel ons waar u hulp bij kunt gebruiken. We denken graag mee
                  en maken het concreet.
                </p>
                <div className="contact-methods">
                  <a href="tel:+31687955899" data-testid="link-contact-phone">
                    <Phone /> +31 687955899
                  </a>
                  <a
                    href="mailto:f.greenlean@gmail.com"
                    data-testid="link-contact-email"
                  >
                    <Mail /> f.greenlean@gmail.com
                  </a>
                  <a
                    href="https://wa.me/31687955899"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-contact-whatsapp"
                  >
                    <MessageCircle /> WhatsApp
                  </a>
                </div>
              </div>
              <div className="contact-form">
                <h3>Even kennismaken?</h3>
                <p>Start met een vrijblijvende aanvraag.</p>
                <button
                  className="button button-dark"
                  onClick={openQuote}
                  data-testid="button-contact-quote"
                >
                  Vertel ons over uw situatie <ArrowRight />
                </button>
                <div
                  style={{
                    display: "grid",
                    gap: 13,
                    marginTop: 27,
                    paddingTop: 25,
                    borderTop: "1px solid hsl(var(--border))",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      color: "hsl(var(--muted-foreground))",
                      fontSize: ".88rem",
                    }}
                  >
                    <Check
                      style={{ width: 17, color: "hsl(var(--primary))" }}
                    />{" "}
                    Reactie zonder lange wachtrij
                  </span>
                  <span
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      color: "hsl(var(--muted-foreground))",
                      fontSize: ".88rem",
                    }}
                  >
                    <Check
                      style={{ width: 17, color: "hsl(var(--primary))" }}
                    />{" "}
                    Duidelijke afspraken vooraf
                  </span>
                  <span
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      color: "hsl(var(--muted-foreground))",
                      fontSize: ".88rem",
                    }}
                  >
                    <Check
                      style={{ width: 17, color: "hsl(var(--primary))" }}
                    />{" "}
                    Voor particulier en zakelijk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container-wide">
          <div className="footer-top">
            <div>
              <AppLogo light />
              <p className="footer-brand-copy">
                Professionele schoonmaak en tuinonderhoud, met zorg voor elke
                omgeving.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <strong>Naar</strong>
                <a href="#diensten" data-testid="link-footer-services">
                  Diensten
                </a>
                <a href="#werkwijze" data-testid="link-footer-method">
                  Werkwijze
                </a>
                <a href="#duurzaam" data-testid="link-footer-sustainability">
                  Duurzaam
                </a>
              </div>
              <div>
                <strong>Contact</strong>
                <a href="tel:+31687955899">+31 687955899</a>
                <a href="mailto:f.greenlean@gmail.com">f.greenlean@gmail.com</a>
                <a
                  href="https://www.fgreenlean.nl"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.fgreenlean.nl
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Fergal Green &amp; Clean</span>
            <span>Professioneel · Betrouwbaar · Met zorg</span>
          </div>
        </div>
      </footer>

      <a
        className="floating-contact"
        href="https://wa.me/31687955899"
        target="_blank"
        rel="noreferrer"
        data-testid="link-floating-whatsapp"
      >
        <MessageCircle /> WhatsApp ons
      </a>
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');

.fergal-root {
  --background: 48 28% 96%;
  --foreground: 217 54% 16%;
  --card: 48 30% 98%;
  --card-foreground: 217 54% 16%;
  --border: 214 24% 84%;
  --input: 214 24% 84%;
  --ring: 151 63% 35%;
  --primary: 151 63% 35%;
  --primary-foreground: 48 30% 98%;
  --secondary: 217 55% 18%;
  --secondary-foreground: 48 30% 98%;
  --muted: 210 18% 91%;
  --muted-foreground: 214 18% 42%;
  --accent: 77 61% 54%;
  --accent-foreground: 217 55% 18%;
  --font-body: 'Outfit', ui-sans-serif, sans-serif;
  --font-display: 'Fraunces', Georgia, serif;
  --font-mono-family: 'DM Mono', ui-monospace, monospace;
  --radius: 1.25rem;
  --shadow-soft: 0 18px 60px rgba(24, 49, 83, 0.1);
  --shadow-lift: 0 24px 70px rgba(24, 49, 83, 0.17);
}

.fergal-root * { box-sizing: border-box; border-color: hsl(var(--border)); }
.fergal-root { scroll-behavior: smooth; background: hsl(var(--background)); }
.fergal-root {
  margin: 0;
  min-width: 320px;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.fergal-root button, .fergal-root a, .fergal-root input, .fergal-root textarea, .fergal-root select { font: inherit; }
.fergal-root button { cursor: pointer; }
.fergal-root a { color: inherit; text-decoration: none; }
.fergal-root ::selection { background: hsl(var(--accent)); color: hsl(var(--secondary)); }

.site-shell { overflow: hidden; }
.container-wide { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  color: hsl(var(--primary));
  font-family: var(--font-mono-family);
  font-size: .7rem;
  letter-spacing: .13em;
  text-transform: uppercase;
} 
.eyebrow::before { content: ''; width: 28px; height: 2px; background: hsl(var(--accent)); }
.display { font-family: var(--font-display); font-weight: 600; letter-spacing: -.045em; line-height: .98; }
.section { padding: 112px 0; position: relative; }
.section-heading { max-width: 660px; }
.section-heading h2 { margin: 14px 0 20px; font-size: clamp(2.55rem, 5vw, 5rem); }
.section-heading p { margin: 0; max-width: 570px; color: hsl(var(--muted-foreground)); font-size: 1.1rem; line-height: 1.65; }
.text-link { display: inline-flex; align-items: center; gap: .55rem; font-weight: 700; color: hsl(var(--primary)); transition: gap .25s ease; }
.text-link:hover { gap: .85rem; }
.text-link svg { width: 17px; }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .65rem;
  min-height: 51px;
  padding: 0 1.35rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: .92rem;
  font-weight: 700;
  transition: transform .25s ease, background-color .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.button:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(24, 49, 83, .14); }
.button-primary { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.button-primary:hover { background: hsl(151 63% 29%); }
.button-dark { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.button-dark:hover { background: hsl(217 55% 24%); }
.button-outline { border-color: hsl(var(--border)); color: hsl(var(--secondary)); background: transparent; }
.button-outline:hover { border-color: hsl(var(--primary)); color: hsl(var(--primary)); background: hsl(151 63% 35% / .06); }
.button-light { background: hsl(var(--card)); color: hsl(var(--secondary)); }
.button-light:hover { background: hsl(var(--accent)); }

.topline { background: hsl(var(--secondary)); color: hsl(48 30% 93%); font-size: .77rem; }
.topline-inner { display: flex; justify-content: space-between; align-items: center; min-height: 36px; gap: 20px; }
.topline a { color: hsl(var(--accent)); font-weight: 700; }
.topline-meta { display: flex; gap: 18px; align-items: center; }
.topline-meta span { display: inline-flex; align-items: center; gap: 6px; }
.topline svg { width: 14px; color: hsl(var(--accent)); }

.navbar { position: sticky; top: 0; z-index: 20; color: hsl(var(--card)); background: rgba(18, 43, 76, .92); box-shadow: 0 8px 24px rgba(9, 28, 48, .12); backdrop-filter: blur(14px); }
.nav-inner { display: flex; justify-content: space-between; align-items: center; min-height: 92px; border-bottom: 1px solid rgba(248,246,235,.22); }
.brand { display: inline-flex; align-items: center; gap: 11px; font-weight: 800; letter-spacing: .04em; }
.brand-mark { display: grid; place-items: center; width: 48px; height: 48px; overflow: hidden; border: 2px solid hsl(var(--accent)); border-radius: 50%; background: hsl(48 30% 98%); }
.brand-mark img { width: 100%; height: 100%; object-fit: cover; }
.brand-name { font-size: 1.05rem; line-height: 1; }
.brand-name small { display: block; margin-top: 4px; color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .53rem; font-weight: 500; letter-spacing: .11em; }
.nav-links { display: flex; align-items: center; gap: 30px; font-size: .87rem; font-weight: 600; }
.nav-links a { opacity: .86; transition: color .2s ease, opacity .2s ease; }
.nav-links a:hover { color: hsl(var(--accent)); opacity: 1; }
.nav-cta { min-height: 43px; padding: 0 1.05rem; font-size: .8rem; }
.menu-toggle { display: none; border: 0; color: hsl(var(--card)); background: transparent; }

.hero { position: relative; min-height: 790px; padding: 113px 0 90px; color: hsl(var(--card)); background: hsl(var(--secondary)); }
.hero::before { position: absolute; inset: 0; content: ''; background: radial-gradient(circle at 15% 12%, rgba(57, 162, 105, .23), transparent 37%), linear-gradient(110deg, rgba(18,43,76,.98) 0%, rgba(18,43,76,.91) 48%, rgba(18,43,76,.58) 100%); }
.hero::after { position: absolute; right: -10%; bottom: -19%; width: 70%; height: 68%; content: ''; border-radius: 50%; border: 1px solid rgba(203, 226, 76, .18); transform: rotate(-12deg); }
.hero-content { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(350px, .95fr); align-items: center; gap: 65px; }
.hero-copy { max-width: 680px; animation: reveal-up .7s both ease-out; }
.hero h1 { margin: 18px 0 24px; font-size: clamp(3.6rem, 7vw, 7.3rem); }
.hero h1 em { color: hsl(var(--accent)); font-style: normal; }
.hero-intro { max-width: 545px; color: rgba(248,246,235,.78); font-size: clamp(1.04rem, 1.5vw, 1.24rem); line-height: 1.6; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 35px; }
.hero-note { display: flex; align-items: center; gap: 13px; margin-top: 45px; color: rgba(248,246,235,.7); font-size: .84rem; }
.hero-note strong { color: hsl(var(--card)); }
.hero-note-mark { display: grid; place-items: center; width: 31px; height: 31px; border: 1px solid hsl(var(--accent)); border-radius: 50%; color: hsl(var(--accent)); }
.hero-note-mark svg { width: 16px; }
.hero-asset-wrap { position: relative; justify-self: end; width: min(100%, 485px); animation: reveal-image .9s .15s both ease-out, hero-drift 7s 1.2s ease-in-out infinite; }
.hero-asset-wrap::before { position: absolute; top: -19px; left: -19px; width: 95px; height: 95px; content: ''; border-top: 2px solid hsl(var(--accent)); border-left: 2px solid hsl(var(--accent)); border-radius: 24px 0 0; }
.hero-asset-wrap::after { position: absolute; right: -16px; bottom: -16px; width: 110px; height: 110px; content: ''; border-right: 2px solid hsl(var(--accent)); border-bottom: 2px solid hsl(var(--accent)); border-radius: 0 0 24px; }
.hero-asset { display: block; width: 100%; aspect-ratio: 685 / 988; object-fit: cover; object-position: center; border: 11px solid hsl(var(--card)); box-shadow: var(--shadow-lift); transform: rotate(2.2deg); }
.hero-stamp { position: absolute; right: -30px; bottom: 35px; display: grid; place-items: center; width: 114px; height: 114px; padding: 14px; border: 1px solid hsl(var(--accent)); border-radius: 50%; background: hsl(var(--secondary)); color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .6rem; letter-spacing: .06em; line-height: 1.35; text-align: center; transform: rotate(9deg); animation: stamp-drift 5s 1.5s ease-in-out infinite; }
.hero-stamp svg { width: 22px; margin-bottom: 5px; }
.hero-scroll { position: absolute; right: 25px; bottom: 34px; z-index: 1; display: flex; align-items: center; gap: 10px; color: rgba(248,246,235,.62); font-family: var(--font-mono-family); font-size: .61rem; letter-spacing: .13em; text-transform: uppercase; writing-mode: vertical-rl; }
.hero-scroll::before { width: 1px; height: 48px; content: ''; background: hsl(var(--accent)); }

.signal-strip { position: relative; z-index: 2; margin-top: -1px; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.signal-inner { display: grid; grid-template-columns: repeat(3, 1fr); }
.signal-item { display: flex; align-items: center; gap: 14px; min-height: 93px; padding: 18px 28px; border-right: 1px solid rgba(248,246,235,.22); font-weight: 700; transition: background-color .28s ease, padding-left .28s ease; }
.signal-item:last-child { border-right: 0; }
.signal-item:hover { background: rgba(255,255,255,.06); padding-left: 34px; }
.signal-icon { color: hsl(var(--accent)); transition: transform .35s ease; }
.signal-icon svg { width: 24px; }
.signal-item:hover .signal-icon { transform: rotate(-8deg) scale(1.12); }
.signal-item small { display: block; margin-bottom: 4px; color: rgba(248,246,235,.7); font-family: var(--font-mono-family); font-size: .62rem; letter-spacing: .09em; text-transform: uppercase; }

.intro-section { background: hsl(var(--background)); }
.intro-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 100px; align-items: start; }
.intro-lead { position: sticky; top: 110px; }
.intro-lead h2 { margin: 17px 0 23px; font-size: clamp(2.8rem, 5vw, 5rem); }
.intro-lead p { max-width: 360px; color: hsl(var(--muted-foreground)); font-size: 1.05rem; line-height: 1.7; }
.principles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; border-top: 1px solid hsl(var(--border)); }
.principle { min-height: 210px; padding: 28px 24px 28px 0; border-bottom: 1px solid hsl(var(--border)); }
.principle:nth-child(odd) { padding-right: 40px; border-right: 1px solid hsl(var(--border)); }
.principle:nth-child(even) { padding-left: 40px; }
.principle-no { display: block; color: hsl(var(--primary)); font-family: var(--font-mono-family); font-size: .72rem; }
.principle h3 { margin: 26px 0 10px; font-family: var(--font-display); font-size: 1.65rem; font-weight: 600; }
.principle p { margin: 0; color: hsl(var(--muted-foreground)); line-height: 1.55; }
.services-section { background: hsl(210 22% 91%); }
.services-header { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 56px; }
.services-header .section-heading p { max-width: 460px; }
.service-area-note { display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: start; max-width: 850px; margin: -20px 0 43px; padding: 22px 25px; border-left: 3px solid hsl(var(--primary)); background: hsl(48 30% 98% / .74); }
.service-area-icon { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; background: hsl(var(--primary)); color: hsl(var(--accent)); }
.service-area-icon svg { width: 21px; }
.service-area-note .eyebrow { font-size: .62rem; }
.service-area-note h3 { margin: 7px 0 7px; font-family: var(--font-display); font-size: clamp(1.45rem, 2.4vw, 2rem); line-height: 1.05; }
.service-area-note p { max-width: 690px; margin: 0; color: hsl(var(--muted-foreground)); font-size: .96rem; line-height: 1.6; }
.services-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 15px; }
.service-card { position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 270px; padding: 27px; overflow: hidden; border: 1px solid rgba(24,49,83,.12); background: hsl(var(--card)); transition: transform .45s cubic-bezier(.2,.75,.25,1), box-shadow .45s ease, background-color .28s ease; }
.service-card:nth-child(1) { grid-column: span 5; }
.service-card:nth-child(2) { grid-column: span 7; background: hsl(var(--secondary)); color: hsl(var(--card)); }
.service-card:nth-child(3), .service-card:nth-child(4), .service-card:nth-child(5) { grid-column: span 4; }
.service-card:nth-child(6) { grid-column: span 8; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.service-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-soft); }
.service-card::after { position: absolute; right: -20px; bottom: -42px; width: 145px; height: 145px; content: ''; border: 1px solid currentColor; border-radius: 50%; opacity: .12; }
.service-image-wrap { position: relative; height: 122px; margin: -27px -27px 25px; overflow: hidden; }
.service-image-wrap::after { position: absolute; inset: 0; content: ''; background: linear-gradient(180deg, rgba(9, 28, 48, .03), rgba(9, 28, 48, .52)); }
.service-image-wrap img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.service-card:hover .service-image-wrap img { transform: scale(1.06); }
.service-card:nth-child(3) .service-image-wrap img { object-position: center 58%; }
.service-icon { display: grid; place-items: center; width: 50px; height: 50px; border: 1px solid currentColor; border-radius: 50%; opacity: .92; transition: background-color .3s ease, color .3s ease, transform .35s ease; }
.service-icon svg { width: 23px; }
.service-card:hover .service-icon { background: hsl(var(--accent)); color: hsl(var(--secondary)); transform: rotate(-7deg) scale(1.06); }
.service-meta { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
.service-kicker { color: hsl(var(--primary)); font-family: var(--font-mono-family); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }
.service-card:nth-child(2) .service-kicker, .service-card:nth-child(6) .service-kicker { color: hsl(var(--accent)); }
.service-card h3 { max-width: 240px; margin: 25px 0 0; font-size: 1.72rem; line-height: 1.07; }
.service-card p { max-width: 390px; margin: 10px 0 0; color: hsl(var(--muted-foreground)); line-height: 1.5; }
.service-card:nth-child(2) p, .service-card:nth-child(6) p { color: rgba(248,246,235,.68); }

.visual-section { background: hsl(var(--background)); }
.visual-header { display: flex; justify-content: space-between; align-items: end; gap: 40px; margin-bottom: 50px; }
.visual-header .section-heading h2 { margin-bottom: 0; }
.visual-header > p { max-width: 385px; margin: 0 0 7px; color: hsl(var(--muted-foreground)); font-size: 1.03rem; line-height: 1.6; }
.visual-grid { display: grid; grid-template-columns: 1.25fr .75fr; grid-template-rows: repeat(2, minmax(220px, 1fr)); gap: 15px; }
.visual-card { position: relative; min-height: 250px; overflow: hidden; background: hsl(var(--secondary)); color: hsl(var(--card)); }
.visual-card-large { grid-row: span 2; min-height: 520px; }
.visual-card-garden { background: hsl(var(--primary)); }
.visual-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.visual-card-large img { object-position: center; }
.visual-card:hover img { transform: scale(1.045); }
.visual-card::after { position: absolute; inset: 35% 0 0; content: ''; background: linear-gradient(transparent, rgba(9, 28, 48, .9)); }
.visual-card-copy { position: absolute; right: 26px; bottom: 23px; left: 26px; z-index: 1; }
.visual-card-copy span { color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .63rem; letter-spacing: .1em; text-transform: uppercase; }
.visual-card-copy h3 { margin: 10px 0 7px; font-family: var(--font-display); font-size: clamp(1.55rem, 2.8vw, 2.55rem); line-height: .98; }
.visual-card-copy p { max-width: 330px; margin: 0; color: rgba(248,246,235,.72); font-size: .9rem; line-height: 1.45; }

.sustain-section { background: hsl(var(--secondary)); color: hsl(var(--card)); }
.sustain-layout { display: grid; grid-template-columns: 1.05fr .95fr; gap: 95px; align-items: center; }
.sustain-copy .eyebrow { color: hsl(var(--accent)); }
.sustain-copy h2 { max-width: 620px; margin: 16px 0 23px; font-size: clamp(2.8rem, 5.4vw, 5.7rem); }
.sustain-copy > p { max-width: 545px; color: rgba(248,246,235,.7); font-size: 1.08rem; line-height: 1.7; }
.sustain-points { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 35px; }
.sustain-point { padding-top: 17px; border-top: 1px solid rgba(248,246,235,.24); }
.sustain-point svg { width: 21px; margin-bottom: 15px; color: hsl(var(--accent)); }
.sustain-point strong { display: block; margin-bottom: 6px; }
.sustain-point span { color: rgba(248,246,235,.64); font-size: .89rem; line-height: 1.45; }
.bike-visual { position: relative; min-height: 455px; padding: 28px; overflow: hidden; background: hsl(151 49% 26%); }
.bike-visual::before { position: absolute; top: -110px; right: -90px; width: 360px; height: 360px; content: ''; border: 1px solid rgba(203,226,76,.32); border-radius: 50%; box-shadow: 0 0 0 36px rgba(203,226,76,.06), 0 0 0 72px rgba(203,226,76,.04); }
.bike-visual::after { position: absolute; right: 0; bottom: 0; left: 0; height: 45%; content: ''; background: linear-gradient(transparent, rgba(9,33,43,.82)); }
.bike-visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: .72; mix-blend-mode: screen; filter: saturate(.7) contrast(1.06); }
.bike-label { position: absolute; right: 28px; bottom: 24px; left: 28px; z-index: 1; display: flex; justify-content: space-between; align-items: end; gap: 20px; }
.bike-label strong { display: block; max-width: 260px; font-family: var(--font-display); font-size: 2rem; line-height: 1; }
.bike-label span { max-width: 160px; color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .65rem; line-height: 1.45; text-transform: uppercase; }
.bike-badge { position: absolute; top: 24px; left: 24px; z-index: 2; display: inline-flex; align-items: center; gap: 9px; padding: 10px 13px; border: 1px solid rgba(203,226,76,.6); background: rgba(9,33,43,.55); color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .58rem; line-height: 1.3; text-transform: uppercase; }
.bike-badge svg { width: 19px; }

.process-section { background: hsl(var(--background)); }
.process-grid { display: grid; grid-template-columns: 1.25fr .75fr; gap: 90px; align-items: start; }
.process-list { margin-top: 43px; border-top: 1px solid hsl(var(--border)); }
.process-row { display: grid; grid-template-columns: 76px 1fr 25px; align-items: center; gap: 20px; min-height: 96px; border-bottom: 1px solid hsl(var(--border)); transition: padding-left .3s ease, background-color .3s ease; }
.process-row:hover { padding-left: 10px; background: hsl(151 63% 35% / .045); }
.process-number { color: hsl(var(--primary)); font-family: var(--font-mono-family); font-size: .8rem; }
.process-row h3 { margin: 0 0 4px; font-size: 1.17rem; }
.process-row p { margin: 0; color: hsl(var(--muted-foreground)); font-size: .9rem; }
.process-row > svg { color: hsl(var(--primary)); transition: transform .3s ease; }
.process-row:hover > svg { transform: translateX(5px); }
.process-aside { padding: 33px; background: hsl(77 53% 87%); }
.process-aside svg { width: 28px; color: hsl(var(--primary)); }
.process-aside h3 { margin: 55px 0 13px; font-family: var(--font-display); font-size: 2rem; line-height: 1.05; }
.process-aside p { margin: 0; color: hsl(217 40% 30%); line-height: 1.55; }

.contact-section { padding: 0 0 112px; background: hsl(var(--background)); }
.contact-panel { display: grid; grid-template-columns: 1.05fr .95fr; min-height: 470px; overflow: hidden; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.contact-copy { padding: 65px; }
.contact-copy .eyebrow { color: hsl(var(--accent)); }
.contact-copy h2 { max-width: 500px; margin: 16px 0 20px; font-size: clamp(2.7rem, 5.5vw, 5.3rem); }
.contact-copy p { max-width: 440px; color: rgba(248,246,235,.73); font-size: 1.05rem; line-height: 1.6; }
.contact-methods { display: flex; flex-wrap: wrap; gap: 14px 25px; margin-top: 36px; }
.contact-methods a { display: inline-flex; align-items: center; gap: 9px; color: hsl(var(--card)); font-weight: 600; }
.contact-methods svg { width: 17px; color: hsl(var(--accent)); }
.contact-form { padding: 48px; background: hsl(210 22% 92%); color: hsl(var(--secondary)); }
.contact-form h3 { margin: 0 0 8px; font-family: var(--font-display); font-size: 2rem; }
.contact-form > p { margin: 0 0 24px; color: hsl(var(--muted-foreground)); }
.field { display: grid; gap: 7px; margin-bottom: 14px; }
.field label { color: hsl(var(--secondary)); font-family: var(--font-mono-family); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; }
.field input, .field textarea, .field select { width: 100%; border: 1px solid hsl(214 24% 78%); border-radius: 10px; padding: 12px 13px; outline: none; background: hsl(var(--card)); color: hsl(var(--foreground)); transition: border-color .2s ease, box-shadow .2s ease; }
.field textarea { min-height: 80px; resize: vertical; }
.field input:focus, .field textarea:focus, .field select:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(151 63% 35% / .13); }
.contact-form .button { width: 100%; margin-top: 5px; }
.form-success { display: grid; place-items: center; min-height: 280px; text-align: center; }
.form-success svg { width: 34px; margin-bottom: 14px; color: hsl(var(--primary)); }
.form-success h3 { margin: 0 0 7px; }
.form-success p { margin: 0; color: hsl(var(--muted-foreground)); line-height: 1.5; }

.footer { padding: 36px 0 24px; background: hsl(var(--secondary)); color: hsl(var(--card)); }
.footer-top { display: flex; justify-content: space-between; gap: 40px; padding-bottom: 34px; border-bottom: 1px solid rgba(248,246,235,.18); }
.footer-brand-copy { max-width: 300px; margin-top: 18px; color: rgba(248,246,235,.63); font-size: .9rem; line-height: 1.5; }
.footer-links { display: flex; gap: 55px; }
.footer-links div { display: grid; align-content: start; gap: 10px; }
.footer-links strong { margin-bottom: 6px; color: hsl(var(--accent)); font-family: var(--font-mono-family); font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; }
.footer-links a { color: rgba(248,246,235,.76); font-size: .9rem; transition: color .2s ease; }
.footer-links a:hover { color: hsl(var(--accent)); }
.footer-bottom { display: flex; justify-content: space-between; gap: 20px; padding-top: 20px; color: rgba(248,246,235,.48); font-family: var(--font-mono-family); font-size: .62rem; letter-spacing: .04em; }

.modal-backdrop { position: fixed; inset: 0; z-index: 40; display: grid; place-items: center; padding: 20px; background: rgba(9, 26, 46, .68); animation: fade-in .2s both ease-out; }
.modal { position: relative; width: min(520px, 100%); max-height: calc(100dvh - 40px); overflow: auto; padding: 34px; border-radius: 18px; background: hsl(var(--card)); color: hsl(var(--foreground)); box-shadow: var(--shadow-lift); animation: reveal-up .35s both ease-out; }
.modal-close { position: absolute; top: 16px; right: 16px; display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid hsl(var(--border)); border-radius: 50%; color: hsl(var(--muted-foreground)); background: transparent; }
.modal h2 { margin: 12px 0 9px; font-family: var(--font-display); font-size: 2.4rem; line-height: 1; }
.modal > p { margin: 0 0 26px; color: hsl(var(--muted-foreground)); line-height: 1.5; }
.modal .button { width: 100%; }
.floating-contact { position: fixed; right: 20px; bottom: 20px; z-index: 15; display: flex; align-items: center; gap: 10px; min-height: 49px; padding: 0 16px; border-radius: 999px; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); box-shadow: 0 12px 30px rgba(24,49,83,.2); font-size: .82rem; font-weight: 700; transition: transform .25s ease; animation: contact-breathe 3.8s 2s ease-in-out infinite; }
.floating-contact:hover { transform: translateY(-4px); animation-play-state: paused; }
.floating-contact svg { width: 18px; color: hsl(var(--accent)); }

[data-reveal] {
  --reveal-delay: 0ms;
  opacity: 0;
  transition: opacity .8s ease var(--reveal-delay), transform .8s cubic-bezier(.2,.75,.25,1) var(--reveal-delay);
}
[data-reveal="up"] { transform: translateY(28px); }
[data-reveal="left"] { transform: translateX(-30px); }
[data-reveal="right"] { transform: translateX(30px); }
[data-reveal].is-visible { opacity: 1; transform: translate(0); }

@keyframes reveal-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes reveal-image { from { opacity: 0; transform: translateY(22px) rotate(2.2deg); } to { opacity: 1; transform: translateY(0) rotate(2.2deg); } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes hero-drift { 0%, 100% { transform: translateY(0) rotate(2.2deg); } 50% { transform: translateY(-8px) rotate(2.2deg); } }
@keyframes stamp-drift { 0%, 100% { transform: rotate(9deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-7px); } }
@keyframes contact-breathe { 0%, 100% { box-shadow: 0 12px 30px rgba(24,49,83,.2); } 50% { box-shadow: 0 12px 34px rgba(24,49,83,.3), 0 0 0 7px hsl(151 63% 35% / .1); } }

@media (prefers-reduced-motion: reduce) {
  .fergal-root { scroll-behavior: auto; }
  .fergal-root *, .fergal-root *::before, .fergal-root *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}

@media (max-width: 900px) {
  .hero-content, .intro-layout, .sustain-layout, .process-grid, .contact-panel { grid-template-columns: 1fr; }
  .hero { min-height: auto; padding-bottom: 110px; }
  .hero-asset-wrap { justify-self: start; width: min(75vw, 390px); margin: 25px auto 0; }
  .intro-lead { position: static; }
  .intro-layout, .sustain-layout, .process-grid { gap: 55px; }
  .bike-visual { min-height: 400px; }
  .contact-copy { padding: 50px 38px; }
  .contact-form { padding: 38px; }
}
@media (max-width: 700px) {
  .container-wide { width: min(100% - 30px, 560px); }
  .topline-meta { display: none; }
  .topline-inner { justify-content: center; min-height: 32px; font-size: .7rem; }
  .nav-inner { min-height: 75px; }
  .menu-toggle { display: grid; place-items: center; width: 42px; height: 42px; }
  .menu-toggle svg { width: 25px; }
  .nav-links { position: absolute; top: 78px; right: 0; left: 0; display: none; flex-direction: column; align-items: stretch; gap: 0; padding: 10px 20px 20px; border: 1px solid rgba(248,246,235,.2); background: hsl(var(--secondary)); box-shadow: var(--shadow-soft); }
  .nav-links.is-open { display: flex; animation: reveal-up .25s both ease-out; }
  .nav-links a { padding: 13px 0; border-bottom: 1px solid rgba(248,246,235,.13); }
  .nav-cta { width: 100%; margin-top: 12px; }
  .hero { padding-top: 84px; }
  .hero h1 { font-size: clamp(3rem, 15vw, 5.1rem); }
  .hero-actions { align-items: stretch; flex-direction: column; }
  .hero-actions .button { width: 100%; }
  .hero-note { margin-top: 30px; }
  .hero-asset-wrap { width: min(82vw, 355px); }
  .hero-stamp { right: -14px; width: 96px; height: 96px; font-size: .5rem; }
  .hero-scroll { display: none; }
  .signal-inner { grid-template-columns: 1fr; }
  .signal-item { min-height: 64px; padding: 14px 0; border-right: 0; border-bottom: 1px solid rgba(248,246,235,.18); }
  .signal-item:last-child { border-bottom: 0; }
  .section { padding: 76px 0; }
  .section-heading h2 { font-size: clamp(2.7rem, 13vw, 4.5rem); }
  .principles { grid-template-columns: 1fr; }
  .principle, .principle:nth-child(odd), .principle:nth-child(even) { padding: 25px 0; border-right: 0; }
  .services-header { align-items: start; flex-direction: column; margin-bottom: 35px; }
  .service-area-note { grid-template-columns: 1fr; gap: 14px; margin: -8px 0 30px; padding: 20px; }
  .services-grid { display: flex; flex-direction: column; gap: 12px; }
  .service-card { min-height: 225px; }
  .sustain-points { grid-template-columns: 1fr; }
  .visual-header { align-items: start; flex-direction: column; gap: 20px; margin-bottom: 34px; }
  .visual-grid { display: flex; flex-direction: column; gap: 12px; }
  .visual-card, .visual-card-large { min-height: 270px; }
  .visual-card-large { min-height: 350px; }
  .bike-visual { min-height: 350px; }
  .process-row { grid-template-columns: 45px 1fr 20px; gap: 10px; }
  .process-row p { font-size: .82rem; }
  .process-aside { padding: 26px; }
  .process-aside h3 { margin-top: 35px; }
  .contact-section { padding-bottom: 76px; }
  .contact-copy { padding: 42px 25px; }
  .contact-form { padding: 30px 22px; }
  .footer-top, .footer-bottom { align-items: start; flex-direction: column; }
  .footer-links { flex-wrap: wrap; gap: 26px 48px; }
  .footer-bottom { gap: 7px; }
  .floating-contact { right: 14px; bottom: 14px; }
  .modal { padding: 29px 22px 24px; }
}
`;

export default function FergalGreenClean() {
  return (
    <div className="fergal-root">
      <style>{styles}</style>
      <Home />
    </div>
  );
}
