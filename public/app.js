let state = {
    xp: 0,
    rank: 'NOVICE',
    resumeBlocks: [],
    profile: { name: '', email: '', phone: '' },
    wizardStep: 'name', 
    mod: 1,
    concept: 1,
    step: 'explain'
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
      practicePrompt: "Awesome! Now let's look closer to find hidden toys. Try typing: ls -a",
      practiceTarget: "ls -a"
    },
    2: {
      explain: "To walk through a doorway into a different room use the cd command.",
      demonstrateText: "Watch closely as I move to the playground...",
      demonstrateCommand: "cd playground",
      demonstrateOutput: "",
      imitatePrompt: "Step into the playground! Type exactly: cd playground",
      imitateTarget: "cd playground",
      practicePrompt: "Let's go back to the home room. Type exactly: cd ..",
      practiceTarget: "cd .."
    },
    3: {
      explain: "To look at your map and see exactly what room you are standing in right now use the pwd command.",
      demonstrateText: "Watch closely as I check the map...",
      demonstrateCommand: "pwd",
      demonstrateOutput: "/home/arcade/playground",
      imitatePrompt: "Check your map! Type exactly: pwd",
      imitateTarget: "pwd",
      practicePrompt: "Navigate to the playground and check your map again to finish the module! Type: cd playground && pwd",
      practiceTarget: "cd playground && pwd",
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
      practicePrompt: "Now make a box for your tools! Type exactly: mkdir tools",
      practiceTarget: "mkdir tools"
    },
    2: {
      explain: "To make a brand new toy to put inside your box use the touch command.",
      demonstrateText: "Watch closely as I craft a toy...",
      demonstrateCommand: "touch toy.txt",
      demonstrateOutput: "",
      imitatePrompt: "Let's craft a toy named toy.txt! Type exactly: touch toy.txt",
      imitateTarget: "touch toy.txt",
      practicePrompt: "Make another toy called ball.txt inside your tools box! Type exactly: touch tools/ball.txt",
      practiceTarget: "touch tools/ball.txt"
    },
    3: {
      explain: "To put a special secret lock on your toy box so only you can open it use the chmod command.",
      demonstrateText: "Watch closely as I lock the toy...",
      demonstrateCommand: "chmod 700 toy.txt",
      demonstrateOutput: "",
      imitatePrompt: "Lock it down! Type exactly: chmod 700 toy.txt",
      imitateTarget: "chmod 700 toy.txt",
      practicePrompt: "Give everyone permission to read your toy! Type exactly: chmod 644 toy.txt",
      practiceTarget: "chmod 644 toy.txt",
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
      practicePrompt: "Copy clone.txt directly into your sandbox folder! Type exactly: cp clone.txt sandbox/",
      practiceTarget: "cp clone.txt sandbox/"
    },
    2: {
      explain: "To carry a toy down the hall into a completely different room or change its name tag use the mv command.",
      demonstrateText: "Watch closely as I move the toy...",
      demonstrateCommand: "mv clone.txt sandbox/",
      demonstrateOutput: "",
      imitatePrompt: "Move the toy! Type exactly: mv clone.txt sandbox/",
      imitateTarget: "mv clone.txt sandbox/",
      practicePrompt: "Rename your main toy to game.txt! Type exactly: mv toy.txt game.txt",
      practiceTarget: "mv toy.txt game.txt"
    },
    3: {
      explain: "To toss a toy into a magical trash can where it disappears forever use the rm command.",
      demonstrateText: "Watch closely as I toss a toy...",
      demonstrateCommand: "rm game.txt",
      demonstrateOutput: "",
      imitatePrompt: "Throw away game.txt! Type exactly: rm game.txt",
      imitateTarget: "rm game.txt",
      practicePrompt: "Destroy the whole sandbox box and everything inside it! Type exactly: rm -rf sandbox",
      practiceTarget: "rm -rf sandbox",
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
      practicePrompt: "Great! You are in Command Mode. You can look but cannot write yet. Jump to the next concept!",
      practiceTarget: "AUTO"
    },
    2: {
      explain: "To tell your crayons to start drawing new rules inside the book use the i key.",
      demonstrateText: "Watch closely as I get the crayons...",
      demonstrateCommand: "i",
      demonstrateOutput: "-- INSERT --",
      imitatePrompt: "Enter Insert Mode! Press exactly: i",
      imitateTarget: "i",
      practicePrompt: "Type your name directly into the file buffer row, then press Escape to lock your crayons away!",
      practiceTarget: "ESCAPE"
    },
    3: {
      explain: "To close your magical drawing notebook and lock your changes onto the shelf use the :wq command.",
      demonstrateText: "Watch closely as I save and exit...",
      demonstrateCommand: ":wq",
      demonstrateOutput: "rules.txt written",
      imitatePrompt: "Save and exit now! Type exactly: :wq",
      imitateTarget: ":wq",
      practicePrompt: "Incredible job! You have fully completed the arcade curriculum!",
      practiceTarget: "AUTO",
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
        div.innerHTML = `<br><span class="text-[#00ff41] bg-[#9d00ff]/30 px-2 py-1 font-bold rounded animate-pulse border border-[#9d00ff] uppercase">+${amount} XP EARNED: ${reason}</span><br>`;
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
        div.className = cssClass + ' mb-1';
        termOutput.appendChild(div);
        
        for (let i = 0; i < htmlText.length; i++) {
            div.textContent += htmlText.charAt(i);
            scrollToBottom();
            await new Promise(res => setTimeout(res, 20));
        }
        if (r < repeat - 1) {
            await new Promise(res => setTimeout(res, 400));
        }
    }
    
    isTyping = false;
    termInput.disabled = false;
    termInput.focus();
}

async function printTypewriterVi(text, cssClass = '', repeat = 1) {
    isTyping = true;
    termInput.disabled = true;
    
    for (let r = 0; r < repeat; r++) {
        const div = document.createElement('div');
        div.className = cssClass + ' mb-1';
        viBuffer.appendChild(div);
        
        for (let i = 0; i < text.length; i++) {
            div.textContent += text.charAt(i);
            await new Promise(res => setTimeout(res, 20));
        }
        if (r < repeat - 1) {
            await new Promise(res => setTimeout(res, 400));
        }
    }
    isTyping = false;
    termInput.disabled = false;
    viBuffer.focus();
}

function loadState() {
    const s = localStorage.getItem('arcade_state_v3');
    if (s) {
        state = JSON.parse(s);
    } else {
        state.wizardStep = 'name';
    }
    updateRank();
    updateResumeView();
}

function saveState() {
    localStorage.setItem('arcade_state_v3', JSON.stringify(state));
}

function updatePrompt() {
    if (state.wizardStep !== 'done') {
        document.getElementById('prompt').innerText = `setup@wizard:~$`;
    } else {
        document.getElementById('prompt').innerText = `player@arcade:~$`;
    }
}

let gameStarted = false;
['blog', 'terminal', 'resume'].forEach(view => {
    document.getElementById(`nav-${view}`).addEventListener('click', (e) => {
        document.querySelectorAll('section').forEach(s => s.classList.add('view-hidden'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('tab-active'));
        
        document.getElementById(`view-${view}`).classList.remove('view-hidden');
        e.target.classList.add('tab-active');
        
        if (view === 'terminal') {
            termInput.focus();
            scrollToBottom();
            
            if (!gameStarted) {
                gameStarted = true;
                if (state.wizardStep !== 'done') {
                    startWizard();
                } else {
                    advanceCurriculum(true);
                }
            }
        }
    });
});

async function startWizard() {
    termOutput.innerHTML = '';
    state.wizardStep = 'name';
    await printTypewriter("=== SYSTEM INITIALIZATION ===", 'text-[#9d00ff] text-fluid-lg text-center tracking-widest drop-shadow-[0_0_5px_rgba(157,0,255,1)] block', 1);
    await printTypewriter("CONTACT CAPTURE WIZARD", 'text-[#ffb000] text-center block mb-4', 1);
    await printTypewriter("Welcome to the Arcade! Let's set up your profile.", 'text-[#00ff41] block mb-2', 1);
    await printTypewriter("(Type skip at any time to use a sample profile)", 'text-[#c5c6c7] block mb-4 italic', 1);
    await printTypewriter("Enter your Full Name:", 'text-[#ffb000]', 1);
    updatePrompt();
}

async function handleWizardInput(val) {
    if (val.toLowerCase() === 'skip') {
        state.profile = { name: 'Alex Hacker', email: 'alex@arcade.net', phone: '555-0199' };
        await printTypewriter("[!] Setup bypassed. Loading sample profile...", 'text-[#ffb000] mt-2', 1);
        await finishWizard();
        return;
    }

    if (state.wizardStep === 'name') {
        state.profile.name = val;
        state.wizardStep = 'email';
        await printTypewriter("Enter your Email Address:", 'text-[#ffb000] mt-2', 1);
    } else if (state.wizardStep === 'email') {
        state.profile.email = val;
        state.wizardStep = 'phone';
        await printTypewriter("Enter your Phone Number:", 'text-[#ffb000] mt-2', 1);
    } else if (state.wizardStep === 'phone') {
        state.profile.phone = val;
        await printTypewriter("[✓] Profile saved successfully!", 'text-[#00ff41] mt-2', 1);
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
        await printTypewriter("Curriculum complete! Check your Exec Resume.", 'text-[#00ff41] text-fluid-lg', 1);
        return;
    }

    const cur = CURRICULUM[state.mod][state.concept];
    const isVi = viMode;
    
    if (state.step === 'explain') {
        if (isVi) {
            viBuffer.innerHTML = '';
            viBuffer.contentEditable = 'false';
            await printTypewriterVi(cur.explain, 'text-[#00ff41] mb-2 font-bold', 3);
        } else {
            if (!isResuming) {
                termOutput.innerHTML = '';
                await printTypewriter(`--- MODULE ${state.mod} : CONCEPT ${state.concept} ---`, 'text-[#9d00ff] mb-4 font-bold', 1);
            }
            await printTypewriter(cur.explain, 'text-[#00ff41] mb-2 font-bold', 3);
        }
        state.step = 'demonstrate';
        saveState();
    }

    if (state.step === 'demonstrate') {
        if (isVi) {
            await printTypewriterVi(cur.demonstrateText, 'text-[#ffb000] mb-2 italic', 1);
            await new Promise(r => setTimeout(r, 500));
            await printTypewriterVi(`> ${cur.demonstrateCommand}`, 'text-white mb-2', 1);
            if (cur.demonstrateOutput) {
                await printTypewriterVi(cur.demonstrateOutput, 'text-[#c5c6c7] mb-4', 1);
            } else {
                await new Promise(r => setTimeout(r, 500));
            }
        } else {
            await printTypewriter(cur.demonstrateText, 'text-[#ffb000] mb-2 mt-4 italic', 1);
            await new Promise(r => setTimeout(r, 500));
            await printTypewriter(`player@arcade:~$ ${cur.demonstrateCommand}`, 'text-white mb-2 font-bold', 1);
            if (cur.demonstrateOutput) {
                await printTypewriter(cur.demonstrateOutput, 'text-[#c5c6c7] mb-4', 1);
            } else {
                await new Promise(r => setTimeout(r, 500));
            }
        }
        state.step = 'imitate';
        saveState();
    }
    
    if (state.step === 'imitate') {
        if (isVi) {
            viStatus.innerHTML = `<span class="text-[#ffb000] animate-pulse">${cur.imitatePrompt}</span>`;
        } else {
            await printTypewriter(cur.imitatePrompt, 'text-[#ffb000] mt-4 font-bold', 1);
        }
    } else if (state.step === 'practice') {
        if (cur.practiceTarget === 'AUTO') {
            if (isVi) {
                viStatus.innerHTML = `<span class="text-[#9d00ff] font-bold">${cur.practicePrompt}</span>`;
            } else {
                await printTypewriter(cur.practicePrompt, 'text-[#9d00ff] mt-4 font-bold', 1);
            }
            await new Promise(r => setTimeout(r, 2500));
            await handlePracticeSuccess();
            return;
        }
        if (isVi) {
            viStatus.innerHTML = `<span class="text-[#9d00ff] font-bold">${cur.practicePrompt}</span>`;
            if (state.mod === 4 && state.concept === 2) {
                 viBuffer.innerHTML = '';
                 viBuffer.contentEditable = 'true';
                 viBuffer.focus();
            }
        } else {
            await printTypewriter(cur.practicePrompt, 'text-[#9d00ff] mt-4 font-bold', 1);
        }
    }
    updatePrompt();
}

async function handlePracticeSuccess() {
    addXP(100, `PRACTICE`);
    
    const cur = CURRICULUM[state.mod][state.concept];
    if (cur.resume) {
        state.resumeBlocks.push(cur.resume);
        updateResumeView();
        if (!viMode) {
             const div = document.createElement('div');
             div.innerHTML = `\n<span class="text-black bg-[#ffb000] px-2 py-1 uppercase font-bold">[!] RESUME UNLOCKED: Exec Profile updated.</span>\n`;
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
        await printTypewriter(cur.practicePrompt, 'text-[#9d00ff] text-fluid-lg mt-4 font-bold', 1);
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
        div.innerHTML = `<br><span class="text-[#9d00ff]">${promptTxt}</span> <span class="text-white">${val}</span>`;
        termOutput.appendChild(div);
        scrollToBottom();
        
        if (state.wizardStep !== 'done') {
            await handleWizardInput(val.trim());
            return;
        }
        
        if (state.mod > 4) return;
        
        const cur = CURRICULUM[state.mod][state.concept];
        if (state.step === 'imitate') {
            if (val.trim() === cur.imitateTarget) {
                addXP(50, `IMITATE`);
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
                err.innerHTML = `<span class="text-red-500">Incorrect. Expected: ${cur.imitateTarget}</span>`;
                termOutput.appendChild(err);
                scrollToBottom();
            }
        } else if (state.step === 'practice') {
            if (val.trim() === cur.practiceTarget) {
                await handlePracticeSuccess();
            } else {
                const err = document.createElement('div');
                err.innerHTML = `<span class="text-red-500">Incorrect. Expected: ${cur.practiceTarget}</span>`;
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
    viStatusIndicator.className = 'text-black bg-[#00ff41] px-2 animate-pulse uppercase';
    viCmdline.innerText = '';
    termInput.blur();
    viBuffer.focus();
}

function updateViUI() {
    if (viInsertMode) {
        viStatusIndicator.innerText = 'INSERT MODE';
        viStatusIndicator.className = 'text-black bg-[#ffb000] px-2 animate-pulse uppercase';
        viCmdline.innerText = '';
    } else {
        viStatusIndicator.innerText = 'COMMAND MODE';
        viStatusIndicator.className = 'text-black bg-[#00ff41] px-2 animate-pulse uppercase';
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
            addXP(50, `IMITATE`);
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
                viStatus.innerHTML = `<span class="text-red-500 font-bold">Type something first, then press Escape!</span>`;
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
                    addXP(50, `IMITATE`);
                    state.step = 'practice'; // practice is AUTO
                    saveState();
                    handlePracticeSuccess();
                } else {
                    viStatus.innerHTML = `<span class="text-red-500 font-bold">Incorrect. Expected :wq</span>`;
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
    if (state.resumeBlocks.length === 0) {
        rc.innerText = "[SYSTEM ALERT: NO EXECUTIVE PROTOCOLS COMPLETED... TRAVERSE THE TERMINAL MODULES TO CONSTRUCT YOUR PROFILE.]";
    } else {
        const p = state.profile || { name: 'Unknown', email: 'unknown', phone: 'unknown' };
        rc.innerHTML = `<div class="mb-6 pb-6 border-b-2 border-[#9d00ff]">
                            <h3 class="font-bold text-white uppercase text-fluid-lg">${p.name || 'Unknown'}</h3>
                            <p class="text-[#ffb000]">${p.email || 'unknown'} | ${p.phone || 'unknown'}</p>
                        </div>
                        <h3 class="font-bold text-white mb-4 uppercase">PROFESSIONAL EXPERIENCE:</h3>` + 
                       state.resumeBlocks.map(b => `<div class="mb-4 pl-4 border-l-2 border-[#00ff41]"><p class="text-[#c5c6c7] italic text-[14px]">"${b}"</p></div>`).join('');
    }
}

function generateResumeText() {
    let txt = "EXECUTIVE SYSTEM ADMINISTRATOR PROFILE\n";
    txt += "========================================\n\n";
    
    const p = state.profile || { name: 'Unknown', email: 'unknown', phone: 'unknown' };
    txt += `NAME: ${p.name || 'Unknown'}\nEMAIL: ${p.email || 'unknown'}\nPHONE: ${p.phone || 'unknown'}\n\n`;
    txt += "----------------------------------------\n\n";

    if (state.resumeBlocks.length === 0) {
        txt += "NO MODULES COMPLETED YET.\n";
    } else {
        state.resumeBlocks.forEach(b => {
            txt += "- " + b + "\n\n";
        });
    }
    return txt;
}

document.getElementById('btn-export-resume').addEventListener('click', () => {
    const blob = new Blob([generateResumeText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume_payload.txt';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('btn-email-resume').addEventListener('click', (e) => {
    e.preventDefault();
    const body = encodeURIComponent(generateResumeText());
    window.location.href = `mailto:?subject=Executive Profile Payload&body=${body}`;
});

loadState();
