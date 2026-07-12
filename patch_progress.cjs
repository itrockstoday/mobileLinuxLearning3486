const fs = require('fs');
let code = fs.readFileSync('public/app.js', 'utf8');

const updateRankNew = `
function updateRank() {
    let currentRank = "NOVICE";
    let nextThreshold = ranks[1].threshold;
    let prevThreshold = 0;
    
    for (let i = 0; i < ranks.length; i++) {
        if (state.xp >= ranks[i].threshold) {
            currentRank = ranks[i].name;
            prevThreshold = ranks[i].threshold;
            nextThreshold = (i + 1 < ranks.length) ? ranks[i+1].threshold : ranks[i].threshold;
        }
    }
    state.rank = currentRank;
    
    const xpCounter = document.getElementById('xp-counter');
    const rankBadge = document.getElementById('rank-badge');
    const xpProgress = document.getElementById('xp-progress');
    
    if (xpCounter) xpCounter.innerText = state.xp;
    if (rankBadge) rankBadge.innerText = state.rank;
    
    if (xpProgress) {
        let percent = 100;
        if (nextThreshold > prevThreshold) {
            percent = Math.floor(((state.xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100);
        }
        xpProgress.style.width = percent + '%';
    }
}
`;

code = code.replace(/function updateRank\(\) \{[\s\S]*?\}\n/, updateRankNew + "\n");
fs.writeFileSync('public/app.js', code);
