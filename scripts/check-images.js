const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const srcMatches = html.match(/src="\/images\/[^"]+"/g);
console.log('img src attrs:');
(srcMatches || []).forEach(s => console.log('  ' + s));

const photoMatches = html.match(/photo:"[^"]*images[^"]*"/g);
console.log('\nJSON photo refs:');
(photoMatches || []).forEach(s => console.log('  ' + s));
