/**
 * components/DetailView.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Full case-study overlay for a selected project, extracted verbatim from
 * PremiumPortfolioShowcase.jsx.
 * ─────────────────────────────────────────────────────────────────────────
 */
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { darken, useIsMobile } from "./helpers";

const imageCache = new Map();

function preloadImage(src) {
  if (!src) return Promise.resolve();
  if (imageCache.has(src)) return imageCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      console.warn("Failed to preload:", src);
      resolve(src);
    };
    img.src = src;
  });
  imageCache.set(src, promise);
  return promise;
}

export function DetailView({ project, onBack }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
const goToContact = (e) => {
  e.preventDefault();

  // إغلاق الـ DetailView أولاً
  onBack();

  // تغيير الـ URL
  navigate("/#contact");

  // ننتظر حتى يختفي الـ overlay وتظهر الصفحة الرئيسية
  setTimeout(() => {
    const contact = document.getElementById("contact");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 100);
};
  useEffect(() => {
    if (!project) return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    const sections = Array.from(content.querySelectorAll(".h-section"));
    const sectionEntered = new Set();

    const revealSection = (sec) => {
      if (sectionEntered.has(sec)) return;
      sectionEntered.add(sec);

      if (!sec.classList.contains("h-section-full")) {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 28, filter: "blur(6px)", scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
          },
        );
      } else {
        gsap.set(sec, { opacity: 1 });
      }
      const items = Array.from(sec.querySelectorAll(".h-item"));

      items.forEach((el) => {
        gsap.killTweensOf(el);

        gsap.set(el, {
          clearProps: "transform,filter",
          opacity: 1,
          visibility: "visible",
        });
      });

      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 46,
            filter: "blur(3px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.72,
            ease: "power3.out",
            delay: i * 0.08,
            overwrite: "auto",
          },
        );
      });
    };

    if (sections[0]) revealSection(sections[0]);

    const titleEl = overlay.querySelector(".split-text-target");
    let splitCtx = null;
    try {
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "chars" });
        splitCtx = gsap.context(() => {
          gsap.from(".hero-logo", {
            opacity: 0,
            y: -14,
            duration: 0.55,
            ease: "power2.out",
            delay: 0.45,
          });
          gsap.from(".hero-meta", {
            opacity: 0,
            y: 12,
            duration: 0.55,
            ease: "power2.out",
            delay: 0.6,
          });
          gsap.from(".hero-frame", {
            opacity: 0,
            scale: 0.9,
            rotateY: 8,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.7,
          });
          gsap.from(".hero-tagline", {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power2.out",
            delay: 1.0,
          });
          gsap.from(split.chars, {
            opacity: 0,
            y: 70,
            rotateX: -80,
            skewY: 4,
            stagger: 0.016,
            duration: 1.0,
            ease: "back.out(1.6)",
            delay: 1.1,
          });
          gsap.from(".h-btn", {
            opacity: 0,
            y: 8,
            duration: 0.5,
            ease: "power2.out",
            delay: 1.65,
          });
          gsap.from(".hero-scroll-hint", {
            opacity: 0,
            y: 10,
            duration: 0.7,
            ease: "power2.out",
            delay: 1.9,
          });
        });
      }
    } catch (err) {
      console.warn("SplitText failed, falling back:", err);
      gsap.set(
        [
          ".hero-logo",
          ".hero-meta",
          ".hero-frame",
          ".hero-tagline",
          ".h-btn",
          ".hero-scroll-hint",
          titleEl,
        ],
        { opacity: 1, y: 0 },
      );
    }

    if (isMobile) {
      const onScroll = () => {
        if (!progressRef.current) return;
        const pct =
          (overlay.scrollTop /
            Math.max(1, overlay.scrollHeight - overlay.clientHeight)) *
          100;
        gsap.set(progressRef.current, { width: `${pct}%` });
      };
      overlay.addEventListener("scroll", onScroll, { passive: true });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealSection(entry.target);
            }
          });
        },
        {
          root: overlay,
          threshold: 0,
          rootMargin: "0px 0px -20% 0px",
        },
      );
      sections.forEach((s) => io.observe(s));

      const ioPreload = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              preloadImagesNearPosition(0, true, entry.target);
            }
          });
        },
        { root: overlay, rootMargin: "500px 0px" },
      );
      sections.forEach((s) => ioPreload.observe(s));

      requestAnimationFrame(() => {
        sections.forEach((section) => revealSection(section));
      });
      setTimeout(() => {
        sections.forEach((section) => revealSection(section));
      }, 100);
      return () => {
        overlay.removeEventListener("scroll", onScroll);
        io.disconnect();
        ioPreload?.disconnect();
        splitCtx?.revert();
      };
    }

    gsap.set(content, { x: 0 });
    let targetX = 0;
    const xTo = gsap.quickTo(content, "x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const getMaxX = () => -(content.scrollWidth - overlay.clientWidth);

    // --- Proximity-based lazy image preloader ---
    // Loads images for current + next section only. Far sections remain unloaded.
    const preloadImagesNearPosition = (
      x,
      isMobileIO = false,
      targetSection = null,
    ) => {
      const vw = overlay.clientWidth;
      const sectionsToLoad = [];

      if (isMobileIO && targetSection) {
        // Mobile: load the section entering the 500px lookahead zone
        sectionsToLoad.push(targetSection);
      } else {
        // Desktop: load sections that are within viewport + 500px ahead.
        // "within 500px ahead" = secLeft < vw + 500
        // This typically covers the current section and the next one.
        sections.forEach((sec) => {
          const secLeft = sec.offsetLeft + x;
          if (secLeft < vw + 500) {
            sectionsToLoad.push(sec);
          }
        });
      }

      sectionsToLoad.forEach((sec) => {
        const lazyEls = sec.querySelectorAll("[data-lazy-src]");
        lazyEls.forEach((el) => {
          const src = el.getAttribute("data-lazy-src");
          if (src) {
            el.removeAttribute("data-lazy-src");
            preloadImage(src).then(() => {
              el.style.backgroundImage = `url(${src})`;
            });
          }
        });
      });
    };

    // Preload Hero + next section on init
    preloadImagesNearPosition(0);

    const maybeReveal = (x) => {
      const vw = overlay.clientWidth;
      sections.forEach((sec) => {
        const secLeft = sec.offsetLeft + x;
        const threshold = sec.classList.contains("h-section-full")
          ? vw * 0.7
          : vw - 60;
        if (secLeft < threshold) revealSection(sec);
      });
    };

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const maxX = getMaxX();
      targetX = Math.max(maxX, Math.min(0, targetX - e.deltaY));
      xTo(targetX);
      if (progressRef.current) {
        const pct = maxX !== 0 ? (targetX / maxX) * 100 : 0;
        gsap.to(progressRef.current, {
          width: `${pct}%`,
          duration: 0.3,
          ease: "none",
        });
      }
      maybeReveal(targetX);
      preloadImagesNearPosition(targetX);
    };

    let lastTouchY = 0;
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const delta = lastTouchY - e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;
      const maxX = getMaxX();
      targetX = Math.max(maxX, Math.min(0, targetX - delta));
      xTo(targetX);
      maybeReveal(targetX);
      preloadImagesNearPosition(targetX);
    };

    overlay.addEventListener("wheel", handleWheel, { passive: false });
    overlay.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      overlay.removeEventListener("touchstart", onTouchStart);
      overlay.removeEventListener("touchmove", onTouchMove);
      gsap.killTweensOf(content);
      splitCtx?.revert();
    };
  }, [project, isMobile]);

  if (!project) return null;

  const bgColor = project.color;
  const frameBorder = darken(bgColor, 0.12);

  const mW = (desk, mob = "100%") => (isMobile ? mob : desk);
  const mPad = (desk, mob = "48px 20px") => (isMobile ? mob : desk);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 detail-overlay bg-black"
      style={{
        opacity: 0,
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
        ...(isMobile && {
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }),
      }}
    >
      {/* ── Fixed "View All Projects" button ── */}
      <button
        to="/servise"
        onClick={onBack}
        className="fixed bottom-8 right-8 z-[70] flex items-center gap-3 group"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${project.color}55`,
          borderRadius: "999px",
          padding: "10px 20px 10px 16px",
          color: project.color,
          fontFamily: '"Inter","Helvetica Neue",sans-serif',
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition:
            "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = project.color;
          e.currentTarget.style.color = "#000";
          e.currentTarget.style.borderColor = project.color;
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.55)";
          e.currentTarget.style.color = project.color;
          e.currentTarget.style.borderColor = `${project.color}55`;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        View All Projects
      </button>

      <div className="fixed top-0 left-0 right-0 h-[1.5px] z-[60] bg-white/5">
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ width: "0%", background: project.color }}
        />
      </div>

      <div
        ref={contentRef}
        className={isMobile ? "" : "will-change-transform"}
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: isMobile ? "auto" : "100%",
          width: isMobile ? "100%" : "max-content",
        }}
      >
        {/* S1 — Hero colored panel */}
        <div
          className="h-section flex-shrink-0 relative overflow-hidden"
          style={{
            width: "100vw",
            minHeight: isMobile ? "100svh" : undefined,
            height: isMobile ? undefined : "100vh",
            background: bgColor,
            opacity: 1,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
              opacity: 0.55,
              mixBlendMode: "multiply",
            }}
          />

          <div
            className="hero-logo absolute top-6 sm:top-8 left-4 sm:left-6 md:left-10 flex flex-col font-black text-[0.55rem] sm:text-[0.62rem] tracking-[0.04em] leading-tight text-black/45 uppercase"
            style={{ fontFamily: '"Inter","Helvetica Neue",sans-serif' }}
          >
            <span>PORT</span>
            <span>FOLIO</span>
          </div>
          <div
            className="hero-logo absolute top-6 sm:top-8 right-4 sm:right-6 md:right-10 font-bold text-[0.55rem] sm:text-[0.62rem] tracking-[0.1em] text-black/40 uppercase"
            style={{ fontFamily: '"Inter","Helvetica Neue",sans-serif' }}
          >
            {project.number}
          </div>

          <button
            onClick={onBack}
            data-cursor="grow"
            className="h-btn absolute top-6 sm:top-7 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-[0.18em] text-black/45 uppercase bg-transparent border-none px-3 sm:px-3.5 py-1.5"
            style={{
              fontFamily: '"Inter","Helvetica Neue",sans-serif',
              cursor: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "1px",
                background: "rgba(0,0,0,0.4)",
              }}
            />
            Back
          </button>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            style={{
              paddingBottom: isMobile ? "18vh" : "14vh",
              paddingTop: "10vh",
            }}
          >
            <div className="hero-meta flex justify-between w-[85%] sm:w-4/5 md:w-[42%] mb-4 sm:mb-5">
              <span className="font-sans text-[0.62rem] sm:text-[0.7rem] tracking-[0.12em] uppercase text-black/50">
                {project.location}
              </span>
              <span className="font-sans text-[0.62rem] sm:text-[0.7rem] tracking-[0.12em] uppercase text-black/50">
                {project.year}
              </span>
            </div>
            <div
              className="hero-frame w-[80%] sm:w-3/4 md:w-[32%]"
              style={{
                width: "clamp(260px, 32vw, 420px)",
                aspectRatio: "1 / 1",
                border: `2px solid ${frameBorder}`,
                padding: "8px",
                background: frameBorder,
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              <img
                id={`detail-img-${project.id}`}
                src={project.image4}
                data-cursor="grow"
                style={{
                  width: "100%",
                  backgroundSize: "cover",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  willChange: "transform",
                }}
              />
            </div>
            <p className="hero-tagline mt-4 sm:mt-5 font-sans text-xs sm:text-[0.8rem] tracking-[0.04em] text-black/50 text-center italic px-5">
              {project.tagline}
            </p>
          </div>

          <div
            className="absolute bottom-0 left-0 overflow-hidden"
            style={{ paddingLeft: "4%", paddingBottom: "1%", lineHeight: 0.82 }}
          >
            <h2
              className="split-text-target font-black leading-[0.82] select-none text-black/20"
              style={{
                fontFamily: '"Inter","Helvetica Neue",sans-serif',
                fontSize: isMobile
                  ? "clamp(40px,13vw,72px)"
                  : "clamp(72px,10.5vw,148px)",
                letterSpacing: "-0.045em",
              }}
            >
              {project.name}
            </h2>
          </div>

          <div className="hero-scroll-hint absolute right-4 sm:right-6 md:right-8 bottom-6 sm:bottom-8 md:bottom-10 flex-col items-center gap-2 text-black/30 hidden sm:flex">
            <span className="text-[0.6rem] tracking-[0.2em] uppercase font-sans">
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "rgba(0,0,0,0.25)",
              }}
            />
          </div>
        </div>

        {/* S2 — Full-screen image with info overlay */}
        <div
          className="h-section h-section-full flex-shrink-0 relative overflow-hidden"
          style={{
            width: "100vw",
            minHeight: isMobile ? "100svh" : undefined,
            height: isMobile ? undefined : "100vh",
            opacity: isMobile ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            data-lazy-src={project.rightImage}
            style={{ backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 flex flex-col gap-3 sm:gap-4 md:gap-5 max-w-full md:max-w-[55%]"
            style={{
              padding: isMobile ? "32px 20px 40px" : "56px",
            }}
          >
            <div
              className="h-item flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: project.color,
                }}
              />
              <span
                className="font-sans text-[0.62rem] sm:text-[0.65rem] tracking-[0.22em] uppercase"
                style={{ color: project.color }}
              >
                {project.category} · {project.number}
              </span>
            </div>
            <h3
              className="h-item font-extrabold leading-[0.95] text-white"
              style={{
                opacity: 0,
                fontFamily: '"Inter","Helvetica Neue",sans-serif',
                fontSize: isMobile
                  ? "clamp(34px,9vw,52px)"
                  : "clamp(42px,5.5vw,76px)",
                letterSpacing: "-0.03em",
              }}
            >
              {project.name}
            </h3>
            <p
              className="h-item font-sans font-light text-sm sm:text-[0.95rem] leading-[1.65] text-white/65 max-w-full sm:max-w-[42ch]"
              style={{ opacity: 0 }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="h-item font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.18em] uppercase px-3 sm:px-4 py-1.5 rounded-full"
                  style={{
                    opacity: 0,
                    border: `1px solid ${project.color}70`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div
              className="absolute bottom-14 right-14 flex flex-col gap-6"
              style={{ minWidth: "160px" }}
            >
              {[
                [project.year, "Year"],
                [project.location, "Location"],
                ["4.9★", "Score"],
              ].map(([val, lbl]) => (
                <div key={lbl} className="h-item" style={{ opacity: 0 }}>
                  <div className="font-sans font-bold text-xl md:text-2xl leading-none text-white">
                    {val}
                  </div>
                  <div className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-white/35 mt-1">
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isMobile && (
            <div
              className="h-item absolute"
              style={{
                opacity: 0,
                top: "10%",
                right: "8%",
                width: "clamp(140px,13vw,200px)",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-full h-full"
                data-lazy-src={project.image5}
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-sans text-[0.55rem] tracking-[0.16em] uppercase text-white/50">
                  {project.category}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* S3 — Image mosaic */}
        <div
          className="h-section h-section-full flex-shrink-0 relative overflow-hidden"
          style={{
            width: "100vw",
            minHeight: isMobile ? "80svh" : undefined,
            height: isMobile ? undefined : "100vh",
            opacity: isMobile ? 1 : 0,
            background: "#111",
          }}
        >
          {isMobile ? (
            <div className="flex flex-col h-full">
              <div
                className="h-item relative overflow-hidden flex-1"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-full h-full"
                  data-lazy-src={project.image3}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectPosition: "center top",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div
                className="h-item relative overflow-hidden flex-1"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-full h-full"
                  data-lazy-src={project.image6}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectPosition: "center 20%",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: project.color,
                    opacity: 0.15,
                    mixBlendMode: "color",
                  }}
                />
                <div className="absolute bottom-6 left-6">
                  <p className="font-sans font-bold text-[0.65rem] tracking-[0.2em] uppercase text-white/50">
                    {project.category}
                  </p>
                  <p
                    className="font-sans font-light text-xs sm:text-[0.75rem] mt-1 italic"
                    style={{ color: project.color }}
                  >
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex gap-[3px]">
              <div
                className="h-item relative overflow-hidden"
                style={{ opacity: 0, flex: "0 0 38%", height: "100%" }}
              >
                <div
                  className="w-full h-full"
                  data-lazy-src={project.image3}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectPosition: "center top",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div
                className="flex flex-col gap-[3px]"
                style={{ flex: "0 0 32%" }}
              >
                <div
                  className="h-item relative overflow-hidden"
                  style={{ opacity: 0, flex: 1 }}
                >
                  <div
                    className="w-full h-full"
                    data-lazy-src={project.image6}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectPosition: "center 20%",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 60%)",
                    }}
                  />
                </div>
                <div
                  className="h-item relative overflow-hidden"
                  style={{ opacity: 0, flex: 1 }}
                >
                  <div
                    className="w-full h-full"
                    data-lazy-src={project.image7}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectPosition: "center bottom",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: project.color,
                      opacity: 0.18,
                      mixBlendMode: "color",
                    }}
                  />
                </div>
              </div>
              <div
                className="flex flex-col gap-[3px]"
                style={{ flex: "0 0 30%" }}
              >
                <div
                  className="h-item relative overflow-hidden"
                  style={{ opacity: 0, flex: "0 0 62%" }}
                >
                  <div
                    className="w-full h-full"
                    data-lazy-src={project.image4}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectPosition: "80% center",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute top-5 left-5 font-sans text-[0.58rem] tracking-[0.22em] uppercase text-white/45">
                    {project.category}
                  </div>
                </div>
                <div
                  className="h-item relative overflow-hidden"
                  style={{ opacity: 0, flex: 1, background: project.color }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="font-sans font-bold text-[0.7rem] tracking-[0.08em] uppercase text-black/55">
                      {project.location}
                    </p>
                    <p className="font-sans font-light text-[0.75rem] text-black/40 mt-1 italic">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isMobile && (
            <div
              className="h-item absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
              style={{ opacity: isMobile ? 1 : 0 }}
            >
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(255,255,255,0.3)",
                }}
              />
              <span className="font-sans text-[0.6rem] tracking-[0.28em] uppercase text-white/40">
                {project.category}
              </span>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>
          )}
        </div>

        {/* S4 — Process text + side images */}
        <div
          className="h-section h-section-full flex-shrink-0 relative overflow-hidden"
          style={{
            width: "100vw",
            minHeight: isMobile ? "auto" : undefined,
            height: isMobile ? undefined : "100vh",
            opacity: isMobile ? 1 : 0,
            background: "#0d0d0d",
          }}
        >
          <div
            className={isMobile ? "relative" : "absolute inset-0"}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              overflowY: isMobile ? "visible" : "hidden",
            }}
          >
            <div
              className="flex flex-col justify-center gap-5 sm:gap-6 md:gap-7"
              style={{
                flex: isMobile ? "none" : "0 0 48%",
                padding: isMobile ? "56px 24px 32px" : "0 0 0 64px",
                paddingRight: isMobile ? "24px" : "40px",
              }}
            >
              <div
                className="h-item flex items-center gap-3"
                style={{ opacity: isMobile ? 1 : 0 }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: project.color,
                  }}
                />
                <span
                  className="font-sans text-[0.6rem] tracking-[0.24em] uppercase"
                  style={{ color: project.color }}
                >
                  Our Approach
                </span>
              </div>
              <h4
                className="h-item font-extrabold leading-[1.05] text-white"
                style={{
                  opacity: isMobile ? 1 : 0,
                  fontFamily: '"Inter","Helvetica Neue",sans-serif',
                  fontSize: isMobile
                    ? "clamp(2rem,8vw,2.8rem)"
                    : "clamp(2rem,3.5vw,3.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.processHeading ?? "Our Approach"}
              </h4>
              <p
                className="h-item font-sans font-light text-sm sm:text-[0.92rem] leading-[1.78] text-white/65 max-w-full sm:max-w-[40ch]"
                style={{ opacity: isMobile ? 1 : 0 }}
              >
                {project.processP1}
              </p>
              <p
                className="h-item font-sans font-light text-sm sm:text-[0.92rem] leading-[1.78] text-white/40 max-w-full sm:max-w-[40ch]"
                style={{ opacity: isMobile ? 1 : 0 }}
              >
                {project.processP2}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="h-item font-sans text-[0.6rem] sm:text-[0.62rem] tracking-[0.18em] uppercase px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full"
                    style={{
                      opacity: isMobile ? 1 : 0,
                      border: `1px solid ${project.color}55`,
                      color: project.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {isMobile ? (
              <div
                className="h-item relative overflow-hidden"
                style={{
                  opacity: isMobile ? 1 : 0,
                  width: "100%",
                  aspectRatio: "16/9",
                  flexShrink: 0,
                }}
              >
                <div
                  className="w-full h-full"
                  data-lazy-src={project.image6}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectPosition: "center 30%",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <p className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-white/40">
                    {project.name} · {project.year}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="relative flex-1 flex items-center justify-center"
                style={{ paddingRight: "5vw" }}
              >
                <div
                  className="h-item absolute"
                  style={{
                    opacity: 0,
                    width: "55%",
                    aspectRatio: "3/4",
                    borderRadius: "20px",
                    overflow: "hidden",
                    top: "8%",
                    right: "18%",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-full h-full"
                    data-lazy-src={project.image7}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectPosition: "center 30%",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)`,
                    }}
                  />
                </div>
                <div
                  className="h-item absolute"
                  style={{
                    opacity: isMobile ? 1 : 0,
                    width: "48%",
                    aspectRatio: "4/5",
                    borderRadius: "16px",
                    overflow: "hidden",
                    bottom: "8%",
                    left: "10%",
                    boxShadow: "0 50px 90px rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="w-full h-full"
                    data-lazy-src={project.leftImage}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-white/40">
                      {project.name} · {project.year}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* S5 — Cinematic portrait */}
        <div
          className="h-section h-section-full flex-shrink-0 relative overflow-hidden"
          style={{
            width: "100vw",
            minHeight: isMobile ? "70svh" : undefined,
            height: isMobile ? undefined : "100vh",
            flex: isMobile ? "none" : "0 0 65vw",
            opacity: isMobile ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            data-lazy-src={project.image4}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              objectPosition: "center 25%",
              transform: "scale(1.06)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 45%)",
            }}
          />

          <div
            className="absolute left-0 top-0 bottom-0 flex flex-col justify-between max-w-[90%] md:max-w-[50%]"
            style={{
              padding: isMobile ? "40px 24px" : "56px",
            }}
          >
            <div className="h-item" style={{ opacity: 0 }}>
              <span className="font-sans text-[0.6rem] tracking-[0.24em] uppercase text-white/35">
                {project.number} — {project.location}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="h-item"
                style={{
                  opacity: 0,
                  width: "36px",
                  height: "1px",
                  background: project.color,
                }}
              />
              <blockquote
                className="h-item font-extrabold leading-[1.2] text-white italic"
                style={{
                  opacity: isMobile ? 1 : 0,
                  fontFamily: '"Inter","Helvetica Neue",sans-serif',
                  fontSize: isMobile
                    ? "clamp(1.3rem,5vw,1.8rem)"
                    : "clamp(1.4rem,2.5vw,2.4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                "{project.quote}"
              </blockquote>
              <p
                className="h-item font-sans text-xs sm:text-[0.7rem] tracking-[0.12em] uppercase"
                style={{ opacity: isMobile ? 1 : 0, color: project.color }}
              >
                {project.category} · {project.location}
              </p>
            </div>
          </div>
        </div>

        {/* S6 — Results */}
        <div
          className="h-section flex flex-col gap-6 sm:gap-8 flex-shrink-0 justify-center"
          style={{
            width: mW("40vw"),
            minHeight: isMobile ? "auto" : undefined,
            height: isMobile ? undefined : "100vh",
            padding: mPad("0 80px"),
            opacity: 0,
            background: "#0d0d0d",
          }}
        >
          <div
            className="h-item w-8 h-px"
            style={{ opacity: isMobile ? 1 : 0, background: project.color }}
          />
          <h4
            className="h-item font-extrabold leading-none text-white text-4xl sm:text-5xl"
            style={{
              opacity: 0,
              fontFamily: '"Inter","Helvetica Neue",sans-serif',
              letterSpacing: "-0.03em",
            }}
          >
            Results
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {project.kpis.map(([num, label]) => (
              <div
                key={label}
                className="h-item rounded-xl p-4 sm:p-5 md:p-6"
                style={{
                  opacity: 0,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-sans font-extrabold text-xl sm:text-2xl leading-none mb-1.5"
                  style={{ color: project.color }}
                >
                  {num}
                </div>
                <div className="text-[0.6rem] sm:text-[0.62rem] text-white/35 uppercase tracking-[0.18em]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* S7 — Return */}
        <div
          className="h-section flex flex-col items-center justify-center flex-shrink-0 gap-6 sm:gap-8"
          style={{
            width: mW("38vw"),
            minHeight: isMobile ? "auto" : undefined,
            height: isMobile ? undefined : "100vh",
            padding: mPad("0 80px", "64px 40px 80px"),
            opacity: 0,
            background: "#0d0d0d",
          }}
        >
          <div
            className="h-item flex flex-col items-center gap-3 text-center"
            style={{ opacity: 0 }}
          >
            <p className="font-sans text-[0.56rem] sm:text-[0.58rem] text-white/[.18] uppercase tracking-[0.32em]">
              {project.number} of {String(5).padStart(2, "0")}
            </p>
            <p
              className="font-extrabold text-base sm:text-lg md:text-[1.3rem] text-white leading-[1.3] tracking-[-0.02em]"
              style={{ fontFamily: '"Inter","Helvetica Neue",sans-serif' }}
            >
              Ready to build something
              <br />
              this precise?
            </p>
            <p className="font-sans font-light text-sm sm:text-[0.82rem] text-white/40 max-w-[28ch] leading-[1.6]">
              We take on a limited number of projects each quarter. Let's talk.
            </p>
          </div>

          <div
            className="h-item flex flex-col items-center gap-3 w-full"
            style={{ opacity: 0 }}
          >
<button
  onClick={goToContact}
  data-cursor="grow"
  className="h-btn w-full rounded-full py-3.5 sm:py-4 px-10 sm:px-12 font-bold text-[0.62rem] sm:text-[0.68rem] tracking-[0.24em] uppercase text-black/85 border-none"
  style={{
    background: project.color,
    fontFamily: '"Inter","Helvetica Neue",sans-serif',
    cursor: "none",
  }}
  onMouseEnter={(e) =>
    gsap.to(e.currentTarget, {
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
    })
  }
  onMouseLeave={(e) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1,0.5)",
    })
  }
>
  Start a Project
</button>

            <button
              onClick={onBack}
              data-cursor="grow"
              className="h-btn w-full rounded-full py-3 sm:py-3.5 px-10 sm:px-12 font-medium text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] uppercase text-white/45 bg-transparent"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: '"Inter","Helvetica Neue",sans-serif',
                cursor: "none",
              }}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#fff",
                  duration: 0.3,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.45)",
                  duration: 0.3,
                })
              }
            >
              ← View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
