const fs = require('fs');
const path = require('path');
const file = 'C:/Users/User/Projects/leap-edge-website/src/LeapEdgeView.jsx';
let jsx = fs.readFileSync(file, 'utf8');

jsx = jsx.replace(/style=\{(\{[^}]+\})\}/g, (m, inner) => {
  try {
    const obj = JSON.parse(inner.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
    return 'style={' + JSON.stringify(obj) + '}';
  } catch (e) {
    return m;
  }
});

jsx = jsx.replace(/style=\{"([^"]+)":"([^"]*)"(.*?)\}/g, (m) => {
  return m;
});

function fixStyles(content) {
  return content.replace(/style=\{(\{[^}]+\})\}/g, (match) => match)
    .replace(/style=\{"([^"]+)":/g, 'style={{ "$1":')
    .replace(/style=\{\{/g, 'style={{')
    .replace(/,"([a-zA-Z]+)":/g, ', $1:')
    .replace(/\{"([a-zA-Z]+)":/g, '{ $1:');
}

jsx = jsx.replace(/style=\{(\{[^{][^}]*\})\}/g, (m, objStr) => {
  const fixed = objStr
    .replace(/"([a-zA-Z]+)":/g, '$1:')
    .replace(/:\s*"([^"]*)"/g, ': "$1"');
  return 'style={' + fixed + '}';
});

jsx = jsx.replace(/shape=rect/g, 'shape="rect"');
jsx = jsx.replace(/style=\{"([^"]+)"\}/g, (m, css) => {
  const obj = {};
  css.split(';').filter(Boolean).forEach(part => {
    const idx = part.indexOf(':');
    if (idx === -1) return;
    const key = part.slice(0, idx).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[key] = part.slice(idx + 1).trim();
  });
  const entries = Object.entries(obj).map(([k, v]) => k + ': ' + JSON.stringify(v)).join(', ');
  return 'style={{ ' + entries + ' }}';
});

const header = `/* AUTO-GENERATED FROM DC TEMPLATE */
import ImageSlot from './ImageSlot';

export default function LeapEdgeView({
  isHome, isStudio, isPortfolio, isServices, isProcess, isCatalogue, isClients, isContact,
  navItems, goHome, goPortfolio, goServices, goProcess, goClients, goContact,
  stats, featured, serviceTeasers, values, credentials,
  portfolioFilters, filteredProjects, services, advantages, steps,
  showPricing, catalogueFilters, filteredSpaces, testimonials,
  formName, formPhone, formEmail, formProperty, formBudget, formMessage,
  hasError, errorMsg, formDone, formNotDone, onField, submitForm, resetForm,
  showWhatsApp,
}) {
  return (
    <>`;

jsx = jsx.replace(/\/\* AUTO-GENERATED FROM DC TEMPLATE \*\/[\s\S]*?return \(\s*<>/, header);

const lines = jsx.split('\n');
const fixed = lines.map(line => {
  if (!line.includes('style={')) return line;
  return line.replace(/style=\{(\{[^}]+\})\}/g, (m, inner) => {
    const body = inner.slice(1, -1)
      .replace(/"([a-zA-Z]+)":/g, '$1:');
    return 'style={{ ' + body + ' }}';
  });
});

fs.writeFileSync(file, fixed.join('\n'));
console.log('Fixed LeapEdgeView.jsx');