const fs = require('fs');
const file = 'C:/Users/User/Projects/leap-edge-website/src/LeapEdgeView.jsx';
let jsx = fs.readFileSync(file, 'utf8');

jsx = jsx.replace(/style=\{(\{[^}]+\})\}/g, (m, inner) => {
  const pairs = inner.slice(1, -1).match(/"([^"]+)":("[^"]*"|[^,}]+)/g) || [];
  const entries = pairs.map(p => {
    const colon = p.indexOf(':');
    const key = p.slice(1, p.indexOf('"', 1));
    let val = p.slice(colon + 1).trim();
    if (!val.startsWith('"')) val = '"' + val.replace(/"/g, '') + '"';
    const jsKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return jsKey + ': ' + val;
  });
  return 'style={{ ' + entries.join(', ') + ' }}';
});

jsx = jsx.replace(/shape=rect/g, 'shape="rect"');

fs.writeFileSync(file, jsx);
console.log('Done. Sample:', jsx.split('\n')[15]);