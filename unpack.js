const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const html = fs.readFileSync('c:/Users/User/Downloads/Leap Edge Website.html', 'utf8');

function extractScript(type) {
    const marker = '<script type="' + type + '">';
    const start = html.indexOf(marker);
    if (start === -1) throw new Error('Missing ' + type);
    const contentStart = start + marker.length;
    const end = html.indexOf('</script>', contentStart);
    return html.slice(contentStart, end).trim();
}

const manifest = JSON.parse(extractScript('__bundler/manifest'));
const templateRaw = JSON.parse(extractScript('__bundler/template'));
const extResources = JSON.parse(extractScript('__bundler/ext_resources'));

const outDir = 'C:/Users/User/Projects/leap-edge-website';
const assetsDir = path.join(outDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

const assetPaths = {};
for (const [uuid, entry] of Object.entries(manifest)) {
    let bytes = Buffer.from(entry.data, 'base64');
    if (entry.compressed) bytes = zlib.gunzipSync(bytes);
    let ext = '.bin';
    if (entry.mime.includes('javascript')) ext = '.js';
    else if (entry.mime.includes('woff')) ext = '.woff2';
    else if (entry.mime.includes('json')) ext = '.json';
    else if (entry.mime.includes('css')) ext = '.css';
    else if (entry.mime.includes('svg')) ext = '.svg';
    else if (entry.mime.includes('png')) ext = '.png';
    else if (entry.mime.includes('jpeg') || entry.mime.includes('jpg')) ext = '.jpg';
    fs.writeFileSync(path.join(assetsDir, uuid + ext), bytes);
    assetPaths[uuid] = './assets/' + uuid + ext;
}

let template = templateRaw;
for (const [uuid, assetPath] of Object.entries(assetPaths)) {
    template = template.split(uuid).join(assetPath);
}

fs.writeFileSync(path.join(outDir, 'unpacked-template.html'), template);
console.log('Unpacked', Object.keys(manifest).length, 'assets');