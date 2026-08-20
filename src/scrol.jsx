import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollRevealShowcase({
  items,
  className = '',
  activeIndex: controlledIndex,
  onActiveChange,
}) {
  const sceneRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const imageRefs = useRef([]);
  const mobileItemRefs = useRef([]);
  const lastNotifiedIndex = useRef(null);
  
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  // Configuration et Animations GSAP via matchMedia
  useLayoutEffect(() => {
    if (!sceneRef.current || items.length < 1) return;
    
    const setActiveFromCenter = (index) => {
      if (lastNotifiedIndex.current === index) return;
      lastNotifiedIndex.current = index;
      setInternalIndex(index);
      window.requestAnimationFrame(() => onActiveChange?.(index));
    };

    const mm = gsap.matchMedia();

    // -- DESKTOP --
    mm.add("(min-width: 1024px)", () => {
      const layers = imageRefs.current.filter(Boolean);
      gsap.set(layers, { clipPath: 'inset(0% 0% 0% 0%)' });
      layers.forEach((layer, index) => {
        if (index > 0) gsap.set(layer, { clipPath: 'inset(100% 0% 0% 0%)' });
      });

      const transition = 1 / Math.max(items.length - 1, 1);
      const revealTl = gsap.timeline({ paused: true });
      
      layers.forEach((layer, index) => {
        if (index === 0) return;
        revealTl.to(
          layer,
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: transition },
          (index - 1) * transition
        );
      });

      ScrollTrigger.create({
        trigger: desktopContainerRef.current,
        start: 'center center',
        end: `+=${items.length * 100}%`,
        pin: true,
        scrub: 1,
        animation: revealTl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(items.length - 1, Math.floor(progress * items.length));
          setActiveFromCenter(newIndex);
        }
      });
    });

    // -- MOBILE --
    mm.add("(max-width: 1023px)", () => {
      mobileItemRefs.current.forEach((item, index) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: 'center center',
          end: 'center center',
          invalidateOnRefresh: true,
          onEnter: () => setActiveFromCenter(index),
          onEnterBack: () => setActiveFromCenter(index),
        });
      });
    });

    return () => mm.revert();
  }, [items.length, onActiveChange]);

  if (!items.length) return null;

  return (
    <section ref={sceneRef} className={`relative ${className}`}>
      {/* ---------- DESKTOP LAYOUT (GSAP Pinned) ---------- */}
      <div 
        ref={desktopContainerRef}
        className="hidden lg:grid grid-cols-[minmax(280px,0.78fr)_minmax(0,1.22fr)] gap-[7vw] h-screen items-center"
      >
        {/* Colonne de texte */}
        <div className="relative z-10 flex flex-col justify-center px-4 xl:px-0">
          <ol className="space-y-5 max-w-[26rem]">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <li
                  key={`desktop-copy-${item.title}-${index}`}
                  className={`border-l-2 pl-5 transition-all duration-500 ${
                    isActive ? 'border-[#1677ff]' : 'border-[#d4d1c9]'
                  }`}
                >
                  <h3
                    className={`font-serif text-[clamp(1.5rem,2.3vw,2.5rem)] leading-[.96] tracking-[-.035em] transition-colors duration-500 ${
                      isActive ? 'text-[#1677ff]' : 'text-[#77756f]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[21rem] text-[12px] leading-[1.45] transition-colors duration-500 ${
                      isActive ? 'text-[#34383f]' : 'text-[#9b9992]'
                    }`}
                  >
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Cadre visuel */}
        <div className="relative z-20 h-[76vh] w-full">
          {/* Ligne de progression verticale */}
          <div className="absolute -left-7 top-10 h-[76%] w-px bg-[#d4d1c9]" aria-hidden="true">
            <div
              className="w-full origin-top bg-[#1677ff] transition-[height] duration-300"
              style={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
            />
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[#d1cec6] shadow-[0_22px_60px_rgba(37,40,48,.13)]">
            {items.map((item, index) => (
              <div
                key={`desktop-img-${item.image}-${index}`}
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
                className="absolute inset-0 overflow-hidden"
                style={{ zIndex: index + 1 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b25]/45 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-7 text-[10px] uppercase tracking-[.08em] text-[#f6f4ef]">
                  {item.eyebrow ?? `Chapitre ${String(index + 1).padStart(2, '0')}`}
                </span>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 z-20 border border-[#f6f4ef]/30" />
            <div className="pointer-events-none absolute right-6 top-6 z-20 flex items-center gap-2 text-[#f6f4ef]">
              <span className="text-[10px] uppercase tracking-[.08em]">Cadre</span>
              <span className="text-sm">
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MOBILE LAYOUT (CSS Sticky) ---------- */}
      <div className="grid lg:hidden grid-cols-1 gap-12">
        <ol className="relative">
          <span className="absolute left-[5px] top-4 bottom-4 w-px bg-[#d4d1c9]" aria-hidden="true" />
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li key={`mobile-copy-${item.title}-${index}`} className="relative">
                <article
                  ref={(node) => {
                    mobileItemRefs.current[index] = node;
                  }}
                  className={`group py-7 pl-9 transition-all duration-500 ${
                    isActive ? 'translate-x-1' : 'opacity-45'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-[2.1rem] h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ${
                      isActive ? 'border-[#1677ff] bg-[#1677ff]' : 'border-[#b8b5ad] bg-[#eeece7]'
                    }`}
                    aria-hidden="true"
                  />
                  <h3
                    className={`font-serif max-w-[20rem] text-[clamp(1.75rem,8vw,2.5rem)] leading-[.94] tracking-[-.035em] transition-colors duration-500 ${
                      isActive ? 'text-[#1677ff]' : 'text-[#4d4e50]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-[19rem] text-[12px] leading-[1.55] transition-colors duration-500 ${
                      isActive ? 'text-[#34383f]' : 'text-[#77756f]'
                    }`}
                  >
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Cadre visuel mobile (sticky) */}
        <div className="relative block">
          <div className="sticky top-4 z-0 aspect-[4/3] overflow-hidden rounded-[2px] bg-[#d1cec6] shadow-[0_18px_45px_rgba(37,40,48,.13)]">
            {items.map((item, index) => (
              <div
                key={`mobile-img-${item.image}-${index}`}
                className="absolute inset-0 overflow-hidden transition-[clip-path] duration-500"
                style={{
                  zIndex: index + 1,
                  clipPath:
                    index === activeIndex
                      ? 'inset(0% 0% 0% 0%)'
                      : `inset(${index < activeIndex ? '0%' : '100%'} 0% 0% 0%)`,
                }}
              >
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b25]/45 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.08em] text-[#f6f4ef]">
                  {item.eyebrow ?? `Chapitre ${String(index + 1).padStart(2, '0')}`}
                </span>
              </div>
            ))}
            <span className="absolute right-5 top-5 z-10 text-[10px] uppercase tracking-[.08em] text-[#f6f4ef]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const demoItems = [
  {
    title: 'Nettoyage professionnel',
    description: 'Des solutions de nettoyage professionnelles et fiables.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1800',
    eyebrow: 'Service 01',
  },
  {
    title: 'Entretien du jardin',
    description: 'Un entretien complet pour de beaux espaces extérieurs.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800',
    eyebrow: 'Service 02',
  },
  {
    title: 'Solutions durables',
    description: 'Des solutions responsables pensées pour l’avenir.',
    image: 'https://images.pexels.com/photos/3862382/pexels-photo-3862382.jpeg?auto=compress&cs=tinysrgb&w=1800',
    eyebrow: 'Service 03',
  },
  {
    title: 'Service fiable',
    description: 'Une équipe présente et réactive à chaque étape.',
    image: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1800',
    eyebrow: 'Service 04',
  },
  {
    title: 'Approche personnalisée',
    description: 'Des solutions adaptées à chaque client, à chaque besoin.',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1800',
    eyebrow: 'Service 05',
  },
];

export default function ScrollRevealShowcaseDemo() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eeece7] text-[#252a34]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <ScrollRevealShowcase items={demoItems} />
      </div>
    </main>
  );
}