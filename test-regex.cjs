const fs = require('fs');
const l = fs.readFileSync('C:/Users/User/Projects/leap-edge-website/src/LeapEdgeView.jsx','utf8').split('\n')[5];
console.log(l);
console.log('has double brace', l.includes('style={{'));