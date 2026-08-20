import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowUpRight,
  BadgeCheck,
  Leaf,
  Sparkles,
  Scissors,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85";

export default function FergalGreenCleanHero({ openQuote }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".hero-title-line",
          {
            y: 70,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".hero-trust",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-image-wrap",
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".service-badge",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.5"
        );

      gsap.to(".hero-image", {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".service-badge", {
        y: -5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#f4f6f1] text-[#18352b]"
    >
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#dcebd5]/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-[#e7eee2]/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        {/* top label */}
        <div className="hero-eyebrow mb-12 flex items-center justify-between lg:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#3d7658]" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#3d7658]">
              Schoonmaak & Tuinonderhoud
            </span>
          </div>

          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-[#708078] sm:block">
            Maastricht & omgeving
          </span>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* LEFT */}
          <div>
<h1 className="max-w-[800px] text-[#17352a]">
  <span className="hero-title-line block font-[Playfair_Display,serif] text-[clamp(4rem,8vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.055em]">
    Fergal
  </span>

  <span className="hero-title-line mt-2 block font-[Playfair_Display,serif] text-[clamp(3.4rem,6.5vw,6.3rem)] font-medium italic leading-[0.9] tracking-[-0.05em] text-[#3d7658]">
    Green &amp; Clean.
  </span>
</h1>

            <p className="hero-description mt-8 max-w-[570px] text-[16px] leading-[1.75] text-[#65746d] sm:text-[17px]">
             
Professionele schoonmaak voor woningen, kantoren en horeca. Grondig, betrouwbaar en met aandacht voor een fris en verzorgd resultaat.

<br />
Zorgvuldig onderhoud van gazon, hagen en groen. Voor een verzorgde tuin die er elk seizoen netjes en uitnodigend uitziet.

            </p>

            {/* actions */}
            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openQuote}
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#315f49] px-7 text-[14px] font-medium text-white shadow-[0_12px_35px_rgba(49,95,73,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#274e3b] hover:shadow-[0_18px_40px_rgba(49,95,73,0.25)]"
              >
                Vrijblijvende offerte

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <a
                href="#diensten"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-[#cad5cd] bg-white/60 px-7 text-[14px] font-medium text-[#31523f] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#315f49] hover:bg-white"
              >
                Bekijk onze diensten

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

            {/* trust */}
            <div className="hero-trust mt-9 flex flex-wrap gap-x-7 gap-y-3">
              <span className="flex items-center gap-2 text-[12px] text-[#68766f]">
                <BadgeCheck size={16} className="text-[#4d8765]" />
                Persoonlijk contact
              </span>

              <span className="flex items-center gap-2 text-[12px] text-[#68766f]">
                <BadgeCheck size={16} className="text-[#4d8765]" />
                Heldere afspraken
              </span>

              <span className="flex items-center gap-2 text-[12px] text-[#68766f]">
                <BadgeCheck size={16} className="text-[#4d8765]" />
                Zichtbaar resultaat
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="hero-image-wrap relative">
              {/* image */}
              <div className="group relative overflow-hidden rounded-[28px] bg-[#dfe8df] shadow-[0_30px_80px_rgba(32,62,48,0.16)]">
                <img
                  src={heroImage}
                  alt="Professionele schoonmaak"
                  className="hero-image h-[500px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035] sm:h-[600px]"
                />

                {/* soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15372a]/40 via-transparent to-transparent" />

                {/* image label */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/65">
                      Fergal Green & Clean
                    </span>

                    <p className="mt-1 font-[Playfair_Display,serif] text-2xl text-white">
                      Met zorg gedaan.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#315f49] shadow-lg">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* cleaning badge */}
              <div className="service-badge absolute -left-5 top-16 w-[190px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_18px_50px_rgba(28,55,43,0.14)] backdrop-blur-md sm:-left-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ed] text-[#3d7658]">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.14em] text-[#829087]">
                      Dienst 01
                    </span>

                    <strong className="mt-0.5 block text-[13px] font-medium text-[#244336]">
                      Schoonmaak
                    </strong>
                  </div>
                </div>
              </div>

              {/* garden badge */}
              <div className="service-badge absolute -right-5 bottom-24 w-[190px] rounded-2xl border border-white/70 bg-[#315f49] p-4 text-white shadow-[0_18px_50px_rgba(28,55,43,0.22)] sm:-right-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#c9e4b8]">
                    <Leaf size={18} />
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.14em] text-white/55">
                      Dienst 02
                    </span>

                    <strong className="mt-0.5 block text-[13px] font-medium">
                      Tuinonderhoud
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom mini card */}
            <div className="mt-5 flex items-center justify-between border-t border-[#d3ddd5] pt-4 text-[11px] text-[#718078]">
              <span className="flex items-center gap-2">
                <Scissors size={14} className="text-[#4d8765]" />
                Binnen & buiten
              </span>

              <span className="uppercase tracking-[0.12em]">
                Zorg voor elke omgeving
              </span>
            </div>
          </div>
        </div>

        {/* bottom scroll */}
        <div className="mt-16 hidden items-center justify-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#819088] lg:flex">
          <span className="h-px w-10 bg-[#b8c7bd]" />
          Ontdek Fergal
          <span className="h-px w-10 bg-[#b8c7bd]" />
        </div>
      </div>
    </section>
  );
}