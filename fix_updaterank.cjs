const fs = require('fs');
let code = fs.readFileSync('public/app.js', 'utf8');

// I will remove the stray lines
code = code.replace(/    state\.rank = currentRank;\n    document\.getElementById\('xp-counter'\)\.innerText = state\.xp;\n    document\.getElementById\('rank-badge'\)\.innerText = state\.rank;\n\}/, "");

fs.writeFileSync('public/app.js', code);
