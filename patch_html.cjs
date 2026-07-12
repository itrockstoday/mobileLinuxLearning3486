const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const topBar = `
                <div class="flex flex-col md:flex-row justify-between items-center p-4 bg-[var(--panel-bg)] border-b-2 border-[var(--arcade-purple)] shrink-0 gap-4 shadow-md">
                    <div class="flex items-center gap-4 w-full md:w-auto">
                        <div class="text-fluid font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <svg class="w-5 h-5 text-[var(--arcade-yellow)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            XP: <span id="xp-counter" class="text-[var(--arcade-green)]">0</span>
                        </div>
                        <div class="text-[10px] md:text-[12px] bg-[var(--arcade-purple)]/20 text-[var(--arcade-purple)] px-2 py-1 rounded font-bold border border-[var(--arcade-purple)] uppercase tracking-widest" id="rank-badge">NOVICE</div>
                    </div>
                    <div class="w-full md:w-1/2 flex items-center gap-2">
                        <span class="text-[10px] text-slate-400">LVL PROGRESS</span>
                        <div class="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div id="xp-progress" class="h-full bg-[var(--arcade-green)] transition-all duration-500 ease-out" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
`;

html = html.replace('<div id="vi-overlay"', topBar + '                <div id="vi-overlay"');
fs.writeFileSync('public/index.html', html);
