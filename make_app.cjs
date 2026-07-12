const fs = require('fs');

const code = `let state = {
    xp: 0,
    rank: 'NOVICE',
    resumeBlocks: [],
    profile: { name: '', email: '', phone: '' },
    wizardStep: 'menu', 
    mod: 1,
    concept: 1,
    step: 'explain',
    subStep: 0
};

const CURRICULUM = {
  1: {
    1: {
      explain: "To see what's within the room use the ls command.",
      demonstrateText: "Watch closely as I look around...",
      demonstrateCommand: "ls",
      demonstrateOutput: "toy.txt  blocks.txt  puzzle",
      imitatePrompt: "Now your turn! Try looking around the room. Type exactly: ls",
      imitateTarget: "ls",
      practice: [
        { prompt: "Awesome! Now let's look closer to find hidden toys. Type exactly: ls -a", target: "ls -a" }
      ]
    },
    2: {
      explain: "To walk through a doorway into a different room use the cd command.",
      demonstrateText: "Watch closely as I move to the playground...",
      demonstrateCommand: "cd playground",
      demonstrateOutput: "",
      imitatePrompt: "Step into the playground! Type exactly: cd playground",
      imitateTarget: "cd playground",
      practice: [
        { prompt: "Let's go back to the home room. Type exactly: cd ..", target: "cd .." }
      ]
    },
    3: {
      explain: "To look at your map and see exactly what room you are standing in right now use the pwd command.",
      demonstrateText: "Watch closely as I check the map...",
      demonstrateCommand: "pwd",
      demonstrateOutput: "/home/user",
      imitatePrompt: "Check your map! Type exactly: pwd",
      imitateTarget: "pwd",
      practice: [
        { prompt: "Walk into the playground room! Type exactly: cd playground", target: "cd playground" },
        { prompt: "Now read your map here! Type exactly: pwd", target: "pwd", output: "/home/user/playground" }
      ],
      resume: "Demonstrated proficiency in Linux filesystem hierarchies; navigated complex absolute and relative pathways and optimized data storage structures using core Bash systems administration utilities."
    }
  },
  2: {
    1: {
      explain: "To put down a brand new, empty toy box use the mkdir command.",
      demonstrateText: "Watch closely as I build a box...",
      demonstrateCommand: "mkdir sandbox",
      demonstrateOutput: "",
      imitatePrompt: "Let's build a box called sandbox! Type exactly: mkdir sandbox",
      imitateTarget: "mkdir sandbox",
      practice: [
        { prompt: "Now make a box for your tools! Type exactly: mkdir tools", target: "mkdir tools" }
      ]
    },
    2: {
      explain: "To make a brand new toy to put inside your box use the touch command.",
      demonstrateText: "Watch closely as I craft a toy...",
      demonstrateCommand: "touch toy.txt",
      demonstrateOutput: "",
      imitatePrompt: "Let's craft a toy named toy.txt! Type exactly: touch toy.txt",
      imitateTarget: "touch toy.txt",
      practice: [
        { prompt: "Make another toy called ball.txt! Type exactly: touch ball.txt", target: "touch ball.txt" }
      ]
    },
    3: {
      explain: "To put a special secret lock on your toy box so only you can open it use the chmod command.",
      demonstrateText: "Watch closely as I lock the toy...",
      demonstrateCommand: "chmod 700 toy.txt",
      demonstrateOutput: "",
      imitatePrompt: "Lock it down! Type exactly: chmod 700 toy.txt",
      imitateTarget: "chmod 700 toy.txt",
      practice: [
        { prompt: "Give everyone permission to read your toy! Type exactly: chmod 644 toy.txt", target: "chmod 644 toy.txt" }
      ],
      resume: "Administered file system security and data integrity protocols by initializing critical system files and configuring fine-grained user read/write/execute permissions under CompTIA Linux+ standards."
    }
  },
  3: {
    1: {
      explain: "To use a magic cloning machine to make an exact double of your favorite toy use the cp command.",
      demonstrateText: "Watch closely as I clone a toy...",
      demonstrateCommand: "cp toy.txt clone.txt",
      demonstrateOutput: "",
      imitatePrompt: "Clone your toy! Type exactly: cp toy.txt clone.txt",
      imitateTarget: "cp toy.txt clone.txt",
      practice: [
        { prompt: "Copy clone.txt directly into your sandbox folder! Type exactly: cp clone.txt sandbox/", target: "cp clone.txt sandbox/" }
      ]
    },
    2: {
      explain: "To carry a toy down the hall into a completely different room or change its name tag use the mv command.",
      demonstrateText: "Watch closely as I move the toy...",
      demonstrateCommand: "mv clone.txt sandbox/",
      demonstrateOutput: "",
      imitatePrompt: "Move the toy! Type exactly: mv clone.txt sandbox/",
      imitateTarget: "mv clone.txt sandbox/",
      practice: [
        { prompt: "Rename your main toy to game.txt! Type exactly: mv toy.txt game.txt", target: "mv toy.txt game.txt" }
      ]
    },
    3: {
      explain: "To toss a toy into a magical trash can where it disappears forever use the rm command.",
      demonstrateText: "Watch closely as I toss a toy...",
      demonstrateCommand: "rm game.txt",
      demonstrateOutput: "",
      imitatePrompt: "Throw away game.txt! Type exactly: rm game.txt",
      imitateTarget: "rm game.txt",
      practice: [
        { prompt: "Destroy the whole sandbox box and everything inside it! Type exactly: rm -rf sandbox", target: "rm -rf sandbox" }
      ],
      resume: "Executed system administration and lifecycle data operations, including automated bulk file migrations, replication schemas, and secure deletion protocols utilizing advanced CLI command arguments."
    }
  },
  4: {
    1: {
      explain: "To open your magical drawing notebook and look at its rules use the vi command.",
      demonstrateText: "Watch closely as I open the book...",
      demonstrateCommand: "vi rules.txt",
      demonstrateOutput: "Entering VI Mode...",
      imitatePrompt: "Open a config book! Type exactly: vi rules.txt",
      imitateTarget: "vi rules.txt",
      practice: [
        { prompt: "Great! You are in Command Mode. You can look but cannot write yet. Jump to the next concept!", target: "AUTO" }
      ]
    },
    2: {
      explain: "To tell your crayons to start drawing new rules inside the book use the i key.",
      demonstrateText: "Watch closely as I get the crayons...",
      demonstrateCommand: "i",
      demonstrateOutput: "-- INSERT --",
      imitatePrompt: "Enter Insert Mode! Press exactly: i",
      imitateTarget: "i",
      practice: [
        { prompt: "Type your name directly into the file buffer row, then press Escape to lock your crayons away!", target: "ESCAPE" }
      ]
    },
    3: {
      explain: "To close your magical drawing notebook and lock your changes onto the shelf use the :wq command.",
      demonstrateText: "Watch closely as I save and exit...",
      demonstrateCommand: ":wq",
      demonstrateOutput: "rules.txt written",
      imitatePrompt: "Save and exit now! Type exactly: :wq",
      imitateTarget: ":wq",
      practice: [
        { prompt: "Incredible job! You have fully completed the arcade curriculum!", target: "AUTO" }
      ],
      resume: "Configured system environments and runtime variables through modal terminal text editors, specializing in VI shell stream manipulations, system configurations, and automated environment tuning."
    }
  }
};

const ranks = [
    { threshold: 0, name: "NOVICE" },
    { threshold: 100, name: "APPRENTICE" },
    { threshold: 250, name: "JOURNEYMAN" },
    { threshold: 500, name: "SYSADMIN" },
    { threshold: 800, name: "ARCHITECT" },
    { threshold: 1200, name: "LINUX MASTER" }
];

function updateRank() {
    let currentRank = "NOVICE";
    for (let r of ranks) {
        if (state.xp >= r.threshold) currentRank = r.name;
    }
    state.rank = currentRank;
    document.getElementById('xp-counter').innerText = state.xp;
    document.getElementById('rank-badge').innerText = state.rank;
}

function addXP(amount, reason) {
    state.xp += amount;
    saveState();
    
    if (!viMode) {
        const div = document.createElement('div');
        div.innerHTML = \`<br><span class="text-[var(--arcade-green)] bg-[var(--arcade-purple)]/10 px-2 py-1 font-bold rounded animate-pulse border border-[var(--arcade-purple)] uppercase">+\${amount} XP EARNED: \${reason}</span><br>\`;
        termOutput.appendChild(div);
        scrollToBottom();
    }
    updateRank();
}

const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
const inputContainer = document.getElementById('input-container');

let viMode = false;
let viInsertMode = false;
let exCommand = '';
const viOverlay = document.getElementById('vi-overlay');
const viBuffer = document.getElementById('vi-buffer');
const viStatus = document.getElementById('vi-status');
const viCmdline = document.getElementById('vi-cmdline');
const viTitle = document.getElementById('vi-title');
const viStatusIndicator = document.getElementById('vi-status-indicator');

let isTyping = false;

function scrollToBottom() {
    inputContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function printTypewriter(htmlText, cssClass = '', repeat = 1) {
    isTyping = true;
    termInput.disabled = true;
    
    for (let r = 0; r < repeat; r++) {
        const div = document.createElement('div');
        div.className = cssClass + ' mb-1 block w-full break-words';
        termOutput.appendChild(div);
        
        for (let i = 0; i < htmlText.length; i++) {
            div.textContent += htmlText.charAt(i);
            scrollToBottom();
            await new Promise(res => setTimeout(res, 20)); // Typewriter effect
        }
        if (r < repeat - 1) {
            await new Promise(res => setTimeout(res, 300));
        }
    }
    
    termInput.disabled = false;
    isTyping = false;
    termInput.focus();
    scrollToBottom();
}

async function printTypewriterVi(htmlText, cssClass = '', repeat = 1) {
    isTyping = true;
    for (let r = 0; r < repeat; r++) {
        const div = document.createElement('div');
        div.className = cssClass;
        viStatus.innerHTML = '';
        viStatus.appendChild(div);
        
        for (let i = 0; i < htmlText.length; i++) {
            div.textContent += htmlText.charAt(i);
            await new Promise(res => setTimeout(res, 20));
        }
        if (r < repeat - 1) {
            await new Promise(res => setTimeout(res, 300));
        }
    }
    isTyping = false;
}

function loadState() {
    const s = localStorage.getItem('arcade_state_v3');
    if (s) {
        state = JSON.parse(s);
    } else {
        state.wizardStep = 'menu';
    }
    if(state.subStep === undefined) state.subStep = 0;
    updateRank();
    updateResumeView();
    updatePrompt();
}

function saveState() {
    localStorage.setItem('arcade_state_v3', JSON.stringify(state));
}

function updatePrompt() {
    if (state.wizardStep === 'menu') {
        document.getElementById('prompt').innerText = \`arcade@menu:~$\`;
    } else if (state.wizardStep !== 'done') {
        document.getElementById('prompt').innerText = \`setup@wizard:~$\`;
    } else {
        document.getElementById('prompt').innerText = \`player@arcade:~$\`;
    }
}

let gameStarted = false;
['blog', 'terminal', 'resume'].forEach(view => {
    const btn = document.getElementById(\`nav-\${view}\`);
    if(btn) {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('section').forEach(s => s.classList.add('view-hidden'));
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('tab-active'));
            
            document.getElementById(\`view-\${view}\`).classList.remove('view-hidden');
            e.target.classList.add('tab-active');
            
            // Hide mobile menu on selection if in mobile screen size
            const mNav = document.getElementById('main-nav');
            if (mNav && window.innerWidth < 768) {
                mNav.classList.add('max-md:hidden');
            }
            
            if (view === 'terminal') {
                termInput.focus();
                scrollToBottom();
                
                if (!gameStarted) {
                    gameStarted = true;
                    if (state.wizardStep === 'menu') {
                        startMenu();
                    } else if (state.wizardStep !== 'done') {
                        startWizard();
                    } else {
                        advanceCurriculum(true);
                    }
                }
            }
        });
    }
});

// Mobile Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
if (hamburgerBtn && mainNav) {
    let lastToggle = 0;
    const toggleMenu = (e) => {
        const now = Date.now();
        if (now - lastToggle < 300) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
        lastToggle = now;
        
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        mainNav.classList.toggle('max-md:hidden');
    };
    
    hamburgerBtn.addEventListener('click', toggleMenu);
    hamburgerBtn.addEventListener('touchend', toggleMenu);
}

async function startMenu() {
    termOutput.innerHTML = '';
    state.wizardStep = 'menu';
    await printTypewriter("=== ARCADE TERMINAL SIMULATOR ===", 'text-[var(--arcade-purple)] text-fluid-lg text-center tracking-widest drop-shadow-[0_0_4px_rgba(129,140,248,0.3)] block', 1);
    await printTypewriter("SELECT AN OPTION:", 'text-[var(--arcade-yellow)] block mt-4 mb-2', 1);
    await printTypewriter("[1] Start New Profile", 'text-[var(--arcade-green)] block', 1);
    const hasSave = localStorage.getItem('arcade_state_v3') !== null;
    if (hasSave) {
        await printTypewriter("[2] Continue Profile", 'text-[var(--arcade-green)] block', 1);
    } else {
        await printTypewriter("[2] Continue Profile (No Save Found)", 'text-slate-500 block italic', 1);
    }
    await printTypewriter("[3] Delete Profile", 'text-red-500 block', 1);
    await printTypewriter("Enter choice (1, 2, or 3):", 'text-[var(--arcade-yellow)] mt-4 block', 1);
    updatePrompt();
}

async function startWizard() {
    termOutput.innerHTML = '';
    state.wizardStep = 'name';
    updatePrompt();
    await printTypewriter("=== SYSTEM INITIALIZATION ===", 'text-[var(--arcade-purple)] text-fluid-lg text-center tracking-widest drop-shadow-[0_0_4px_rgba(129,140,248,0.3)] block', 1);
    await printTypewriter("RESUME CONTACT CAPTURE WIZARD", 'text-[var(--arcade-yellow)] text-center block mb-4', 1);
    await printTypewriter("Welcome to the terminal! Let's set up your profile.", 'text-[var(--arcade-green)] block mb-2', 1);
    await printTypewriter("(Type skip at any time to use a sample profile)", 'text-slate-400 block mb-4 italic', 1);
    await printTypewriter("This is for the resume. Enter your Full Name:", 'text-[var(--arcade-yellow)] block', 1);
}

async function handleWizardInput(val) {
    if (state.wizardStep === 'menu') {
        if (val === '1') {
            localStorage.removeItem('arcade_state_v3');
            state = {
                xp: 0, rank: 'NOVICE', resumeBlocks: [], profile: { name: '', email: '', phone: '' },
                wizardStep: 'name', mod: 1, concept: 1, step: 'explain', subStep: 0
            };
            updateRank();
            updateResumeView();
            startWizard();
        } else if (val === '2') {
            const hasSave = localStorage.getItem('arcade_state_v3') !== null;
            if (hasSave) {
                const s = localStorage.getItem('arcade_state_v3');
                state = JSON.parse(s);
                if(state.subStep === undefined) state.subStep = 0;
                updateRank();
                updateResumeView();
                updatePrompt();
                if (state.wizardStep !== 'done') {
                    startWizard();
                } else {
                    advanceCurriculum(true);
                }
            } else {
                await printTypewriter("No save file exists. Enter choice:", 'text-red-500 mt-2 block', 1);
            }
        } else if (val === '3') {
            localStorage.removeItem('arcade_state_v3');
            state = {
                xp: 0, rank: 'NOVICE', resumeBlocks: [], profile: { name: '', email: '', phone: '' },
                wizardStep: 'menu', mod: 1, concept: 1, step: 'explain', subStep: 0
            };
            updateRank();
            updateResumeView();
            await printTypewriter("Profile deleted. Refreshing menu...", 'text-red-500 mt-2 block', 1);
            await new Promise(r => setTimeout(r, 1000));
            startMenu();
        } else {
            await printTypewriter("Invalid choice. Please enter 1, 2, or 3.", 'text-red-500 mt-2 block', 1);
        }
        return;
    }

    if (val.toLowerCase() === 'skip') {
        state.profile = { name: 'Alex Hacker', email: 'alex@arcade.net', phone: '555-0199' };
        await printTypewriter("[!] Setup bypassed. Loading sample profile...", 'text-[var(--arcade-yellow)] mt-2 block', 1);
        await finishWizard();
        return;
    }

    if (state.wizardStep === 'name') {
        state.profile.name = val;
        state.wizardStep = 'email';
        await printTypewriter("Enter your Email Address:", 'text-[var(--arcade-yellow)] mt-2 block', 1);
    } else if (state.wizardStep === 'email') {
        state.profile.email = val;
        state.wizardStep = 'phone';
        await printTypewriter("Enter your Phone Number:", 'text-[var(--arcade-yellow)] mt-2 block', 1);
    } else if (state.wizardStep === 'phone') {
        state.profile.phone = val;
        await printTypewriter("[✓] Profile saved successfully!", 'text-[var(--arcade-green)] mt-2 block', 1);
        await finishWizard();
    }
}

async function finishWizard() {
    state.wizardStep = 'done';
    saveState();
    updatePrompt();
    updateResumeView();
    await new Promise(r => setTimeout(r, 1000));
    advanceCurriculum();
}

async function advanceCurriculum(isResuming = false) {
    if (state.wizardStep !== 'done') return;
    if (state.mod > 4) {
        if (isResuming) termOutput.innerHTML = '';
        await printTypewriter("Curriculum complete! Check your Exec Resume.", 'text-[var(--arcade-green)] text-fluid-lg block', 1);
        return;
    }

    const cur = CURRICULUM[state.mod][state.concept];
    const isVi = viMode;
    
    if (state.step === 'explain') {
        if (isVi) {
            viBuffer.innerHTML = '';
            viBuffer.contentEditable = 'false';
            await printTypewriterVi(cur.explain, 'text-[var(--arcade-green)] mb-2 font-bold block', 3);
        } else {
            if (!isResuming) {
                termOutput.innerHTML = '';
                await printTypewriter(\`--- MODULE \${state.mod} : CONCEPT \${state.concept} ---\`, 'text-[var(--arcade-purple)] mb-4 font-bold block', 1);
            }
            await printTypewriter(cur.explain, 'text-[var(--arcade-green)] mb-2 font-bold block', 3);
        }
        state.step = 'demonstrate';
        saveState();
    }
    
    if (state.step === 'demonstrate') {
        if (isVi) {
            await printTypewriterVi(cur.demonstrateText, 'text-[var(--arcade-yellow)] mb-2 italic block', 1);
            await new Promise(r => setTimeout(r, 500));
            await printTypewriterVi(\`> \${cur.demonstrateCommand}\`, 'text-white mb-2 block', 1);
            if (cur.demonstrateOutput) {
                await printTypewriterVi(cur.demonstrateOutput, 'text-slate-400 mb-4 block', 1);
            } else {
                await new Promise(r => setTimeout(r, 500));
            }
        } else {
            // Split presentation: print on a new line
            await printTypewriter(cur.demonstrateText, 'text-[var(--arcade-yellow)] mb-2 mt-4 italic block', 1);
            await new Promise(r => setTimeout(r, 500));
            await printTypewriter(\`player@arcade:~$ \${cur.demonstrateCommand}\`, 'text-white mb-2 font-bold block', 1);
            if (cur.demonstrateOutput) {
                // Split presentation output
                let outLines = cur.demonstrateOutput.split('\\n');
                for(let line of outLines) {
                    await printTypewriter(line, 'text-slate-400 block break-all', 1);
                }
                const spacer = document.createElement('div');
                spacer.className = 'mb-4';
                termOutput.appendChild(spacer);
            } else {
                await new Promise(r => setTimeout(r, 500));
            }
        }
        state.step = 'imitate';
        saveState();
    }
    
    if (state.step === 'imitate') {
        if (isVi) {
            viStatus.innerHTML = \`<span class="text-[var(--arcade-yellow)] animate-pulse">\${cur.imitatePrompt}</span>\`;
        } else {
            // New line layout protection
            await printTypewriter(cur.imitatePrompt, 'text-[var(--arcade-yellow)] mt-4 font-bold block', 1);
        }
    } else if (state.step === 'practice') {
        const pStep = cur.practice[state.subStep];
        if (pStep.target === 'AUTO') {
            if (isVi) {
                viStatus.innerHTML = \`<span class="text-[var(--arcade-purple)] font-bold">\${pStep.prompt}</span>\`;
            } else {
                await printTypewriter(pStep.prompt, 'text-[var(--arcade-purple)] mt-4 font-bold block', 1);
            }
            await new Promise(r => setTimeout(r, 2500));
            await handlePracticeSuccess();
            return;
        }
        if (isVi) {
            viStatus.innerHTML = \`<span class="text-[var(--arcade-purple)] font-bold">\${pStep.prompt}</span>\`;
            if (state.mod === 4 && state.concept === 2) {
                 viBuffer.innerHTML = '';
                 viBuffer.contentEditable = 'true';
             }
        } else {
            await printTypewriter(pStep.prompt, 'text-[var(--arcade-purple)] mt-4 font-bold block', 1);
        }
    }
    updatePrompt();
}

async function handlePracticeSuccess() {
    addXP(100, \`PRACTICE\`);
    const cur = CURRICULUM[state.mod][state.concept];
    
    // Check if more practice steps remain
    if (state.subStep + 1 < cur.practice.length) {
        state.subStep++;
        saveState();
        await advanceCurriculum();
        return;
    }
    
    if (cur.resume) {
        state.resumeBlocks.push(cur.resume);
        updateResumeView();
        if (!viMode) {
             const div = document.createElement('div');
             div.innerHTML = \`\\n<span class="text-slate-900 bg-[var(--arcade-yellow)] px-2 py-1 uppercase font-bold block mt-2 mb-2">[!] RESUME UNLOCKED: Exec Profile updated.</span>\\n\`;
             termOutput.appendChild(div);
             scrollToBottom();
        }
    }
    
    if (state.mod === 4 && state.concept === 3) {
        viMode = false;
        viOverlay.classList.remove('flex');
        viOverlay.classList.add('view-hidden');
        termInput.focus();
        
        termOutput.innerHTML = '';
        await printTypewriter(cur.practice[state.subStep].prompt, 'text-[var(--arcade-purple)] text-fluid-lg mt-4 font-bold block', 1);
        state.mod = 5;
        saveState();
        return;
    }
    state.concept++;
    if (!CURRICULUM[state.mod][state.concept]) {
        state.mod++;
        state.concept = 1;
    }
    state.step = 'explain';
    state.subStep = 0;
    saveState();
    
    await new Promise(r => setTimeout(r, 1000));
    await advanceCurriculum();
}

termInput.addEventListener('keydown', async (e) => {
    if (viMode || isTyping) {
        if (isTyping) e.preventDefault();
        return;
    }
    
    if (e.key === 'Enter') {
        const val = termInput.value;
        if (!val.trim()) return;
        
        termInput.value = '';
        
        const promptTxt = document.getElementById('prompt').innerText;
        const div = document.createElement('div');
        div.innerHTML = \`<br><span class="text-[var(--arcade-purple)]">\${promptTxt}</span> <span class="text-white">\${val}</span>\`;
        termOutput.appendChild(div);
        scrollToBottom();

        if (val.trim().toLowerCase() === 'exit') {
            saveState(); // auto-save
            gameStarted = false; // reset
            termOutput.innerHTML = '';
            viMode = false;
            viOverlay.classList.add('view-hidden');
            viOverlay.classList.remove('flex');
            
            // Go to start menu
            startMenu();
            return;
        }
        
        if (state.wizardStep !== 'done') {
            await handleWizardInput(val.trim());
            return;
        }
        
        if (state.mod > 4) return;
        
        const cur = CURRICULUM[state.mod][state.concept];
        if (state.step === 'imitate') {
            if (val.trim() === cur.imitateTarget) {
                addXP(50, \`IMITATE\`);
                
                // Simulate output feedback for imitate
                if(val.trim().startsWith('ls')) {
                   const res = document.createElement('div');
                   res.innerHTML = \`<span class="text-slate-400 break-words block">\${val.trim() === 'ls -a' ? '.   ..   toy.txt  blocks.txt  puzzle' : 'toy.txt  blocks.txt  puzzle'}</span>\`;
                   termOutput.appendChild(res);
                } else if(val.trim().startsWith('pwd')) {
                   const res = document.createElement('div');
                   res.innerHTML = \`<span class="text-slate-400 block break-words">/home/user\${val.includes('playground') ? '/playground' : ''}</span>\`;
                   termOutput.appendChild(res);
                }
                
                state.step = 'practice';
                saveState();
                if (state.mod === 4 && state.concept === 1) {
                    openVi('rules.txt');
                    await advanceCurriculum();
                } else {
                    await advanceCurriculum();
                }
            } else {
                const err = document.createElement('div');
                err.innerHTML = \`<span class="text-red-500 block mt-1">Incorrect. Expected: \${cur.imitateTarget}</span>\`;
                termOutput.appendChild(err);
                scrollToBottom();
            }
        } else if (state.step === 'practice') {
            const pStep = cur.practice[state.subStep];
            if (val.trim() === pStep.target) {
                // Simulate output feedback for practice
                if(pStep.output) {
                   const res = document.createElement('div');
                   res.innerHTML = \`<span class="text-slate-400 block break-words">\${pStep.output}</span>\`;
                   termOutput.appendChild(res);
                } else if(val.trim().startsWith('ls')) {
                   const res = document.createElement('div');
                   res.innerHTML = \`<span class="text-slate-400 block break-words">\${val.trim() === 'ls -a' ? '.   ..   toy.txt  blocks.txt  puzzle' : 'toy.txt  blocks.txt  puzzle'}</span>\`;
                   termOutput.appendChild(res);
                }
                
                await handlePracticeSuccess();
            } else {
                const err = document.createElement('div');
                err.innerHTML = \`<span class="text-red-500 block mt-1">Incorrect. Expected: \${pStep.target}</span>\`;
                termOutput.appendChild(err);
                scrollToBottom();
            }
        }
    }
});

function openVi(filename) {
    viMode = true;
    viInsertMode = false;
    exCommand = '';
    viTitle.innerText = filename;
    viOverlay.classList.remove('view-hidden');
    viOverlay.classList.add('flex');
    viBuffer.innerHTML = '';
    viBuffer.contentEditable = 'false';
    viStatusIndicator.innerText = 'COMMAND MODE';
    viStatusIndicator.className = 'text-slate-900 bg-[var(--arcade-green)] px-2 animate-pulse uppercase';
    viCmdline.innerText = '';
    termInput.blur();
    viBuffer.focus();
}

function updateViUI() {
    if (viInsertMode) {
        viStatusIndicator.innerText = 'INSERT MODE';
        viStatusIndicator.className = 'text-slate-900 bg-[var(--arcade-yellow)] px-2 animate-pulse uppercase';
        viCmdline.innerText = '';
    } else {
        viStatusIndicator.innerText = 'COMMAND MODE';
        viStatusIndicator.className = 'text-slate-900 bg-[var(--arcade-green)] px-2 animate-pulse uppercase';
        viCmdline.innerText = exCommand;
    }
}

viOverlay.addEventListener('keydown', (e) => {
    if (!viMode || isTyping) {
        if (viMode && isTyping) e.preventDefault();
        return; 
    }
    
    if (state.mod === 4 && state.concept === 2 && state.step === 'imitate') {
        if (e.key === 'i') {
            e.preventDefault();
            addXP(50, \`IMITATE\`);
            state.step = 'practice';
            saveState();
            viInsertMode = true;
            updateViUI();
            advanceCurriculum();
            return;
        } else {
            e.preventDefault();
            return;
        }
    }
    
    if (state.mod === 4 && state.concept === 2 && state.step === 'practice') {
        if (e.key === 'Escape') {
            e.preventDefault();
            viInsertMode = false;
            updateViUI();
            if (viBuffer.innerText.trim().length > 0) {
                handlePracticeSuccess();
            } else {
                viStatus.innerHTML = \`<span class="text-red-500 font-bold">Type something first, then press Escape!</span>\`;
            }
            return;
        }
        return;
    }

    if (state.mod === 4 && state.concept === 3 && state.step === 'imitate') {
        if (e.key === ':' && exCommand === '') {
            exCommand = ':';
            updateViUI();
            e.preventDefault();
            return;
        }
        if (exCommand.startsWith(':')) {
            e.preventDefault();
            if (e.key === 'Backspace') {
                exCommand = exCommand.slice(0, -1);
            } else if (e.key === 'Enter') {
                if (exCommand === ':wq') {
                    exCommand = '';
                    addXP(50, \`IMITATE\`);
                    state.step = 'practice';
                    saveState();
                    handlePracticeSuccess();
                } else {
                    viStatus.innerHTML = \`<span class="text-red-500 font-bold">Incorrect. Expected :wq</span>\`;
                    exCommand = '';
                }
                updateViUI();
                return;
            } else if (e.key === 'Escape') {
                exCommand = '';
            } else if (e.key.length === 1) {
                exCommand += e.key;
            }
            updateViUI();
            return;
        }
        e.preventDefault();
        return;
    }
    
    e.preventDefault();
});

function updateResumeView() {
    const rc = document.getElementById('resume-content');
    if(!rc) return;
    if (state.resumeBlocks.length === 0) {
        rc.innerText = "[SYSTEM ALERT: NO EXECUTIVE PROTOCOLS COMPLETED... TRAVERSE THE TERMINAL MODULES TO CONSTRUCT YOUR PROFILE.]";
    } else {
        const p = state.profile || { name: 'Unknown', email: 'unknown', phone: 'unknown' };
        rc.innerHTML = \`<div class="mb-6 pb-6 border-b-2 border-[var(--arcade-purple)]">
                            <h3 class="font-bold text-white uppercase text-fluid-lg">\${p.name || 'Unknown'}</h3>
                            <p class="text-[var(--arcade-yellow)]">\${p.email || 'unknown'} | \${p.phone || 'unknown'}</p>
                        </div>
                        <h3 class="font-bold text-white mb-4 uppercase">PROFESSIONAL EXPERIENCE:</h3>\` + 
                       state.resumeBlocks.map(b => \`<div class="mb-4 pl-4 border-l-2 border-[var(--arcade-green)]"><p class="text-slate-400 italic text-[14px]">"\${b}"</p></div>\`).join('');
    }
}

function generateResumeText() {
    let txt = "EXECUTIVE SYSTEM ADMINISTRATOR PROFILE\\n";
    txt += "========================================\\n\\n";
    
    const p = state.profile || { name: 'Unknown', email: 'unknown', phone: 'unknown' };
    txt += \`NAME: \${p.name || 'Unknown'}\\nEMAIL: \${p.email || 'unknown'}\\nPHONE: \${p.phone || 'unknown'}\\n\\n\`;
    txt += "----------------------------------------\\n\\n";
    if (state.resumeBlocks.length === 0) {
        txt += "NO MODULES COMPLETED YET.\\n";
    } else {
        state.resumeBlocks.forEach(b => {
            txt += "- " + b + "\\n\\n";
        });
    }
    return txt;
}

const btnExport = document.getElementById('btn-export-resume');
if (btnExport) {
    btnExport.addEventListener('click', () => {
        const blob = new Blob([generateResumeText()], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume_payload.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
}

const btnEmail = document.getElementById('btn-email-resume');
if (btnEmail) {
    btnEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const body = encodeURIComponent(generateResumeText());
        window.location.href = \`mailto:?subject=Executive Profile Payload&body=\${body}\`;
    });
}

loadState();
`;

fs.writeFileSync('public/app.js', code);
