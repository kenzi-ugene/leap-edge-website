const fs = require('fs');
const path = require('path');

const outDir = 'C:/Users/User/Projects/leap-edge-website';
let html = fs.readFileSync(path.join(outDir, 'xdc-template.html'), 'utf8');

html = html.replace(/^<x-dc>\s*/i, '').replace(/\s*<\/x-dc>\s*$/i, '');

const helmetMatch = html.match(/<helmet>([\s\S]*?)<\/helmet>/i);
let fontsCss = '';
if (helmetMatch) {
    fontsCss = helmetMatch[1]
        .replace(/<link[^>]*>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<\/?style>/gi, '')
        .replace(/\.\/assets\//g, '/assets/');
    html = html.replace(helmetMatch[0], '');
}

function replaceBalancedTags(source, tagName, replacer) {
    const openTag = '<' + tagName;
    const closeTag = '</' + tagName + '>';
    let result = '';
    let i = 0;
    while (i < source.length) {
        const openIdx = source.indexOf(openTag, i);
        if (openIdx === -1) {
            result += source.slice(i);
            break;
        }
        result += source.slice(i, openIdx);
        const openEnd = source.indexOf('>', openIdx);
        if (openEnd === -1) {
            result += source.slice(openIdx);
            break;
        }
        const attrs = source.slice(openIdx + openTag.length, openEnd);
        let depth = 1;
        let pos = openEnd + 1;
        let contentEnd = -1;
        while (pos < source.length && depth > 0) {
            const nextOpen = source.indexOf(openTag, pos);
            const nextClose = source.indexOf(closeTag, pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                depth++;
                pos = nextOpen + openTag.length;
            } else {
                depth--;
                if (depth === 0) contentEnd = nextClose;
                else pos = nextClose + closeTag.length;
            }
        }
        if (contentEnd === -1) {
            result += source.slice(openIdx);
            break;
        }
        const inner = source.slice(openEnd + 1, contentEnd);
        result += replacer(attrs, inner);
        i = contentEnd + closeTag.length;
    }
    return result;
}

function convertScIf(source) {
    return replaceBalancedTags(source, 'sc-if', (attrs, inner) => {
        const cond = (attrs.match(/value="\{\{\s*([^}]+?)\s*\}\}"/) || [])[1];
        if (!cond) return inner;
        return '{' + cond.trim() + ' && (\n' + convertAll(inner) + '\n)}';
    });
}

function convertScFor(source) {
    return replaceBalancedTags(source, 'sc-for', (attrs, inner) => {
        const list = (attrs.match(/list="\{\{\s*([^}]+?)\s*\}\}"/) || [])[1];
        const as = (attrs.match(/\bas="([^"]+)"/) || [])[1] || 'item';
        if (!list) return inner;
        const keyExpr = `${as}.slotId ?? ${as}.label ?? ${as}.name ?? ${as}.num ?? ${as}.title ?? ${as}.quote ?? ${as}`;
        return '{' + list.trim() + '.map((' + as + ') => (\n<Fragment key={' + keyExpr + '}>\n' + convertAll(inner) + '\n</Fragment>\n))}';
    });
}

function convertAll(source) {
    let out = source;
    let prev;
    do {
        prev = out;
        out = convertScFor(out);
        out = convertScIf(out);
    } while (out !== prev);
    return out;
}

html = convertAll(html);

html = html.replace(/<!--([\s\S]*?)-->/g, (_, c) => '{/*' + c + '*/}');

html = html.replace(/\sstyle-hover="[^"]*"/gi, '');

html = html.replace(/onclick="\{\{\s*([^}]+?)\s*\}\}"/gi, 'onClick={$1}');
html = html.replace(/onchange="\{\{\s*([^}]+?)\s*\}\}"/gi, 'onChange={$1}');

html = html.replace(/<image-slot([^>]*)><\/image-slot>/gi, (m, attrs) => {
    const get = (name) => {
        const lit = attrs.match(new RegExp(name + '="([^"]*)"'));
        if (lit) return lit[1];
        const dyn = attrs.match(new RegExp(name + '="\\{\\{\\s*([^}]+?)\\s*\\}\\}"'));
        if (dyn) return '{' + dyn[1].trim() + '}';
        return null;
    };
    const id = get('id');
    const placeholder = get('placeholder');
    const shape = get('shape') || '"rect"';
    const styleAttr = attrs.match(/style="([^"]*)"/);
    let styleJsx = '';
    if (styleAttr) {
        const s = styleAttr[1];
        if (s.includes('{{')) {
            styleJsx = ' style={toStyle(`' + s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, '${$1}') + '`)}';
        } else {
            styleJsx = ' style={toStyle("' + s.replace(/"/g, '\\"') + '")}';
        }
    }
    const idJsx = id && id.startsWith('{') ? ' id={' + id.slice(1, -1) + '}' : (id ? ' id="' + id + '"' : '');
    const phJsx = placeholder && placeholder.startsWith('{') ? ' placeholder={' + placeholder.slice(1, -1) + '}' : (placeholder ? ' placeholder="' + placeholder + '"' : '');
    const shapeJsx = shape.startsWith('{') ? ' shape={' + shape.slice(1, -1) + '}' : ' shape=' + shape;
    return '<ImageSlot' + idJsx + phJsx + shapeJsx + styleJsx + ' />';
});

html = html.replace(/shape=rect/g, 'shape="rect"');

html = html.replace(/\svalue="\{\{\s*([^}]+?)\s*\}\}"/gi, ' value={$1}');

html = html.replace(/style="([^"]*\{\{[^"]*)"/gi, (m, styleContent) => {
    const converted = styleContent.replace(/\{\{\s*([^}]+?)\s*\}\}/g, '${$1}');
    return 'style={`' + converted + '`}';
});

html = html.replace(/\{\{\s*([^}]+?)\s*\}\}/g, '{$1}');

html = html.replace(/style="([^"{]*)"/gi, (m, styleContent) => {
    if (styleContent.includes('{{')) return m;
    const obj = {};
    styleContent.split(';').filter(Boolean).forEach(part => {
        const idx = part.indexOf(':');
        if (idx === -1) return;
        const key = part.slice(0, idx).trim();
        const val = part.slice(idx + 1).trim();
        const jsKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        obj[jsKey] = val;
    });
    return 'style={' + JSON.stringify(obj) + '}';
});

html = html.replace(/<br>/gi, '<br />');

html = html.replace(/<input([^>]*?)>/gi, '<input$1 />');
html = html.replace(/rows="(\d+)"/gi, 'rows={$1}');

html = html.replace(/class=/g, 'className=');

html = html.replace(/style=\{(`(?:[^`\\]|\\.)*`)\}/g, 'style={toStyle($1)}');
html = html.replace(/style=\{"([^"]+)"\}/g, (m, css) => {
    if (!css.includes(':')) return m;
    return 'style={toStyle("' + css.replace(/"/g, '\\"') + '")}';
});

fs.mkdirSync(path.join(outDir, 'src'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'src', 'fonts.css'), fontsCss);
fs.writeFileSync(path.join(outDir, 'src', 'LeapEdgeView.jsx'),
`/* AUTO-GENERATED FROM DC TEMPLATE */
import { Fragment } from 'react';
import ImageSlot from './ImageSlot';
import { toStyle } from './styleUtils';

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
    <>
` + html.trim() + `
    </>
  );
}
`);
console.log('Converted template -> src/LeapEdgeView.jsx');