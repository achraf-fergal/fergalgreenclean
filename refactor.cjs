const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'DetailView.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern 1: Simple img with src and className
// <img src={project.image5} className="w-full h-full object-cover" />
content = content.replace(
  /<img\s+src=\{([^}]+)\}\s+className="([^"]+?)\s*object-cover([^"]*)"\s*\/>/g,
  (match, src, beforeClass, afterClass) => {
    return `<div className="${beforeClass}${afterClass}" style={{ backgroundImage: \`url(\$\{${src}\})\`, backgroundSize: 'cover', backgroundPosition: 'center' }} />`;
  }
);

// Pattern 2: img with src, className, and style
// <img src={project.image7} className="w-full h-full object-cover" style={{ objectPosition: "center bottom" }} />
content = content.replace(
  /<img\s+src=\{([^}]+)\}\s+className="([^"]+?)\s*object-cover([^"]*)"\s*style=\{\{\s*([^}]+)\s*\}\}\s*\/>/g,
  (match, src, beforeClass, afterClass, styleContent) => {
    const newStyle = `backgroundImage: \`url(\$\{${src}\})\`, backgroundSize: 'cover', backgroundPosition: 'center', ${styleContent}`;
    return `<div className="${beforeClass}${afterClass}" style={{ ${newStyle} }} />`;
  }
);

// Pattern 3: img with id, src, data-cursor, style
// <img id={`detail-img-${project.id}`} src={project.image4} data-cursor="grow" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "transform" }} />
content = content.replace(
  /<img\s+id=\{([^}]+)\}\s+src=\{([^}]+)\}\s+data-cursor="([^"]+)"\s*style=\{\{\s*width:\s*"100%",\s*height:\s*"100%",\s*objectFit:\s*"cover",\s*display:\s*"block",\s*willChange:\s*"transform",?\s*\}\}\s*\/>/g,
  (match, id, src, cursor) => {
    return `<div id={${id}} data-cursor="${cursor}" style={{ backgroundImage: \`url(\$\{${src}\})\`, backgroundSize: 'cover', backgroundPosition: 'center', width: "100%", height: "100%", display: "block", willChange: "transform" }} />`;
  }
);

// Any remaining img tags with object-cover? Let's check:
fs.writeFileSync(filePath, content);
console.log('Refactoring complete.');
