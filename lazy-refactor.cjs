const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'DetailView.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add global cache and preload function after imports
const preloadCode = `
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
`;
if (!content.includes('const imageCache = new Map();')) {
  content = content.replace(/(import .* from "\.\/helpers"\r?\n)/, `$1${preloadCode}\n`);
}

// 2. Add preloadImagesNearPosition inside useEffect, just before maybeReveal
const preloadLogic = `
    const preloadImagesNearPosition = (x, isMobileIO = false, targetSection = null) => {
      const vw = overlay.clientWidth;
      const sectionsToLoad = [];

      if (isMobileIO && targetSection) {
        sectionsToLoad.push(targetSection);
      } else {
        sections.forEach((sec) => {
          const secLeft = sec.offsetLeft + x;
          // Preload if the section is within 1.5 viewport widths ahead (approx 500-1000px)
          if (secLeft < vw * 1.5 + 500) {
            sectionsToLoad.push(sec);
          }
        });
      }

      sectionsToLoad.forEach((sec) => {
        const lazyEls = sec.querySelectorAll('[data-lazy-src]');
        lazyEls.forEach((el) => {
          const src = el.getAttribute('data-lazy-src');
          if (src) {
            el.removeAttribute('data-lazy-src');
            preloadImage(src).then(() => {
              el.style.backgroundImage = \`url(\${src})\`;
            });
          }
        });
      });
    };
`;
if (!content.includes('preloadImagesNearPosition')) {
  content = content.replace(/(const maybeReveal = \(x\) => \{)/, `${preloadLogic}\n    $1`);
}

// 3. Update desktop handleWheel and onTouchMove to call preloadImagesNearPosition
content = content.replace(
  /(maybeReveal\(targetX\);\s*\};)/g,
  `$1\n      preloadImagesNearPosition(targetX);`
);

// 4. Update desktop init to call preloadImagesNearPosition(0)
content = content.replace(
  /(gsap\.set\(content, \{ x: 0 \}\);\s*let targetX = 0;)/,
  `$1\n    preloadImagesNearPosition(0);`
);

// 5. Add mobile IntersectionObserver for preloading
const mobileIOPreload = `
      const ioPreload = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              preloadImagesNearPosition(0, true, entry.target);
            }
          });
        },
        { root: overlay, rootMargin: "500px 0px" }
      );
      sections.forEach((s) => ioPreload.observe(s));
`;
if (!content.includes('ioPreload = new IntersectionObserver')) {
  content = content.replace(/(sections\.forEach\(\(s\) => io\.observe\(s\)\);\r?\n)/, `$1${mobileIOPreload}\n`);
}

// 6. Disconnect mobile ioPreload on cleanup
content = content.replace(
  /(io\.disconnect\(\);\r?\n)/,
  `$1        ioPreload?.disconnect();\n`
);

// 7. Convert specific divs to data-lazy-src (Excluding Hero image)
content = content.replace(
  /(<div[^>]*?)style=\{\{\s*backgroundImage:\s*`url\(\$\{project\.([^}]+)\}\)`(.*?)\}\}/gs,
  (match, beforeStyle, imgProp, restOfStyle) => {
    if (beforeStyle.includes('id={`detail-img-')) {
      return match; 
    }
    // Handle the remaining style string correctly. It might start with a comma if there are other props.
    let cleanRest = restOfStyle.trim();
    if (cleanRest.startsWith(',')) {
      cleanRest = cleanRest.substring(1).trim();
    }
    const finalStyle = cleanRest ? `{{ ${cleanRest} }}` : `{{}}`;
    return `${beforeStyle}data-lazy-src={project.${imgProp}} style=${finalStyle}`;
  }
);

fs.writeFileSync(filePath, content);
console.log('Refactoring DetailView.jsx completed.');
