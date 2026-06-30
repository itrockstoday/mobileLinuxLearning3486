// Virtual File System State
const defaultVfs = {
    "home": {
        "user": {
            "documents": {},
            "downloads": {},
            "readme.txt": "Welcome to the system. Type 'help' to begin your training."
        }
    },
    "etc": {
        "config": "SYS_CORE root configuration."
    }
};

let vfs = JSON.parse(localStorage.getItem('sys_core_vfs')) || defaultVfs;
let currentPath = ['home', 'user'];
let resumeBlocks = JSON.parse(localStorage.getItem('sys_core_resume')) || [];

// UI Elements
const viewBlog = document.getElementById('view-blog');
const viewTerminal = document.getElementById('view-terminal');
const viewResume = document.getElementById('view-resume');
const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
const promptEl = document.getElementById('prompt');
const resumeContent = document.getElementById('resume-content');
const viOverlay = document.getElementById('vi-overlay');
const viBuffer = document.getElementById('vi-buffer');
const viStatus = document.getElementById('vi-status');
const navTerminal = document.getElementById('nav-terminal');

// Vi Editor State
let viMode = false;
let viInsertMode = false;
let viFilename = "";
let exCommand = "";

// Curriculum Modules (EDIP)
const curriculum = {
    1: { name: "Spatial Orientation", cmds: ["pwd", "ls", "cd"], desc: "Navigating the filesystem is exactly like walking through an unfamiliar building. pwd checks your floor marker. ls looks around the physical room. cd physically walks through a dimensional doorway.", resume: "Demonstrated proficiency in Linux filesystem hierarchies; navigated complex absolute and relative pathways and optimized data storage structures using core Bash systems administration utilities." },
    2: { name: "Environmental Generation", cmds: ["mkdir", "touch"], desc: "Creating directories is like building a physical shelter out of thin air. mkdir constructs the room. touch breathes existence into a void object.", resume: "Administered file system security and data integrity protocols by initializing critical system files and configuring fine-grained user read/write/execute permissions under CompTIA Linux+ standards." },
    3: { name: "Kinetic Relocation", cmds: ["cp", "mv", "rm"], desc: "Managing files is physical manipulation. cp physically 3D prints a clone. mv lifts the object and places it down elsewhere. rm tosses it into a molecular incinerator.", resume: "Executed system administration and lifecycle data operations, including automated bulk file migrations, replication schemas, and secure deletion protocols utilizing advanced CLI command arguments." },
    4: { name: "Neural Architecture Modification", cmds: ["vi"], desc: "Modifying configuration via VI is altering a machine's subconscious behavior. Perform precise surgery in Insert Mode, and finalize the neural override in Ex Mode.", resume: "Configured system environments and runtime variables through modal terminal text editors, specializing in VI shell stream manipulations, system configurations, and automated environment tuning." }
};

let moduleProgress = JSON.parse(localStorage.getItem('sys_core_progress')) || {
    pwd: 0, ls: 0, cd: 0, mkdir: 0, touch: 0, cp: 0, mv: 0, rm: 0, vi: 0
};

// Navigation
document.getElementById('nav-blog').onclick = () => switchView('blog');
navTerminal.onclick = () => switchView('terminal');
document.getElementById('nav-resume').onclick = () => switchView('resume');

function switchView(view) {
    viewBlog.classList.add('view-hidden');
    viewTerminal.classList.add('view-hidden');
    viewResume.classList.add('view-hidden');
    
    // Reset buttons
    document.querySelectorAll('nav button').forEach(b => {
        b.classList.remove('bg-green-900', 'text-white', 'tab-active');
    });

    const targetBtn = document.getElementById(`nav-${view}`);
    if(targetBtn) targetBtn.classList.add('tab-active');

    if (view === 'blog') viewBlog.classList.remove('view-hidden');
    if (view === 'terminal') {
        viewTerminal.classList.remove('view-hidden');
        termInput.focus();
    }
    if (view === 'resume') {
        viewResume.classList.remove('view-hidden');
        renderResume();
    }
}

// Terminal Logic
termInput.addEventListener('keydown', (e) => {
    if (viMode) {
        handleViKey(e);
        return;
    }
    
    if (e.key === 'Enter') {
        const input = termInput.value.trim();
        termInput.value = '';
        printLine(`<span class="text-white">${promptEl.textContent}</span> ${input}`);
        if (input) processCommand(input);
    }
});

// Click terminal to focus input
viewTerminal.addEventListener('click', () => {
    if(!viMode) termInput.focus();
    else {
        // We only want to refocus to text input if they are in insert mode
        if (viInsertMode) viBuffer.focus();
    }
});

function printLine(text) {
    termOutput.innerHTML += `<div class="mt-1">${text}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;
}

function getDir(pathArray) {
    let curr = vfs;
    for (let p of pathArray) {
        if (curr[p] !== undefined && typeof curr[p] === 'object') {
            curr = curr[p];
        } else {
            return null;
        }
    }
    return curr;
}

function processCommand(input) {
    const args = input.split(' ').filter(Boolean);
    if (args.length === 0) return;
    let cmd = args[0];
    
    // For module tracking to still work if they used correct casing
    trackProgress(cmd);

    switch(cmd) {
        case 'help':
            printLine(`<br><span class="text-white font-bold">--- ACTIVE NEURAL MODULES ---</span>`);
            printLine(`Module 1: Spatial Orientation (pwd, ls, cd)`);
            printLine(`Module 2: Environmental Generation (mkdir, touch)`);
            printLine(`Module 3: Kinetic Relocation (cp, mv, rm)`);
            printLine(`Module 4: Neural Modification (vi)`);
            printLine(`\nType <span class="text-white">'module [number]'</span> for tactical overview. Type <span class="text-white">'clear'</span> to wipe canvas. (Linux commands are case-sensitive)<br>`);
            break;
        case 'module':
            const modId = args[1];
            if (curriculum[modId]) {
                printLine(`<br><span class="text-white font-bold">/// MODULE ${modId}: ${curriculum[modId].name.toUpperCase()} ///</span>`);
                printLine(`ANALOGY: ${curriculum[modId].desc}`);
                printLine(`TARGET COMMANDS: ${curriculum[modId].cmds.join(', ')}<br>`);
            } else {
                printLine(`Module not found. Specify 1-4.`);
            }
            break;
        case 'clear':
            termOutput.innerHTML = '';
            break;
        case 'exit':
            switchView('blog');
            break;
        case 'pwd':
            printLine('/' + currentPath.join('/'));
            break;
        case 'ls':
            const dir = getDir(currentPath);
            if (dir) {
                const keys = Object.keys(dir);
                if (keys.length === 0) printLine('<span class="opacity-50">[Empty Sector]</span>');
                else printLine(keys.map(k => typeof dir[k] === 'object' ? `<span class="text-blue-400 font-bold">${k}/</span>` : k).join('  '));
            }
            break;
        case 'cd':
            let targetPath = args[1];
            if (!targetPath || targetPath === '~') {
                currentPath = ['home', 'user'];
            } else if (targetPath === '..') {
                if (currentPath.length > 0) currentPath.pop();
            } else {
                let tempPath = [...currentPath];
                if (targetPath.startsWith('/')) tempPath = targetPath.split('/').filter(Boolean);
                else tempPath.push(...targetPath.split('/'));
                
                if (getDir(tempPath)) {
                    currentPath = tempPath;
                } else {
                    printLine(`cd: ${targetPath}: No such sector`);
                }
            }
            promptEl.textContent = `user@sys_core:/${currentPath.join('/')}$`;
            break;
        case 'mkdir':
            if (args[1]) {
                const parent = getDir(currentPath);
                parent[args[1]] = {};
                saveState();
            } else {
                printLine(`mkdir: missing structural coordinate`);
            }
            break;
        case 'touch':
            if (args[1]) {
                const parent = getDir(currentPath);
                parent[args[1]] = "";
                saveState();
            } else {
                printLine(`touch: missing object identity`);
            }
            break;
        case 'rm':
            if (args[1]) {
                const parent = getDir(currentPath);
                if (args[1] === '-r' || args[1] === '-rf') {
                   if (args[2] && parent[args[2]]) {
                       delete parent[args[2]];
                       saveState();
                   } else {
                       printLine(`rm: missing structural target`);
                   }
                } else {
                   if (parent[args[1]]) {
                       if(typeof parent[args[1]] === 'object') {
                           printLine(`rm: cannot remove '${args[1]}': Is a structural directory`);
                       } else {
                           delete parent[args[1]];
                           saveState();
                       }
                   } else printLine(`rm: target missing`);
                }
            } else printLine(`rm: missing operand`);
            break;
        case 'cp':
        case 'mv':
            if (args[1] && args[2]) {
                const parent = getDir(currentPath);
                if (parent[args[1]] !== undefined) {
                    parent[args[2]] = JSON.parse(JSON.stringify(parent[args[1]]));
                    if(cmd === 'mv') delete parent[args[1]];
                    saveState();
                } else printLine(`${cmd}: target missing`);
            } else printLine(`${cmd}: missing coordinates`);
            break;
        case 'vi':
            if (args[1]) {
                startVi(args[1]);
            } else {
                printLine(`vi: missing configuration target`);
            }
            break;
        case 'reset':
            localStorage.removeItem('sys_core_vfs');
            localStorage.removeItem('sys_core_progress');
            localStorage.removeItem('sys_core_resume');
            location.reload();
            break;
        default:
            printLine(`bash: ${cmd}: command not found`);
    }
}

function startVi(filename) {
    viMode = true;
    viFilename = filename;
    viOverlay.classList.remove('view-hidden');
    viOverlay.classList.add('flex');
    const parent = getDir(currentPath);
    viBuffer.textContent = (typeof parent[filename] === 'string') ? parent[filename] : "";
    viInsertMode = false;
    updateViStatus();
    viBuffer.blur(); 
}

function updateViStatus() {
    if (exCommand !== "") {
        viStatus.textContent = `:${exCommand}`;
    } else {
        viStatus.textContent = viInsertMode ? "-- INSERT -- (Neural Modification Active)" : `"${viFilename}" [COMMAND MODE] - Press 'i' to insert, ':wq' to save/exit`;
    }
}

function handleViKey(e) {
    if (exCommand !== "" || e.key === ':') {
        e.preventDefault();
        if (e.key === 'Enter') {
            executeExCommand();
        } else if (e.key === 'Backspace' || e.key === 'Escape') {
            if (exCommand.length > 0 && e.key === 'Backspace') exCommand = exCommand.slice(0, -1);
            if (e.key === 'Escape' || exCommand.length === 0) exCommand = "";
        } else if (e.key.length === 1) {
            exCommand += e.key;
        }
        updateViStatus();
        return;
    }
    
    if (e.key === 'Escape') {
        e.preventDefault();
        viInsertMode = false;
        viBuffer.blur();
        updateViStatus();
        return;
    }

    if (!viInsertMode && e.key === 'i') {
        e.preventDefault();
        viInsertMode = true;
        viBuffer.focus();
        updateViStatus();
        return;
    }

    if (!viInsertMode && e.key !== 'i' && e.key !== 'Escape') {
        e.preventDefault(); // Block typing in command mode
    }
}

function executeExCommand() {
    const parent = getDir(currentPath);
    if (exCommand === 'wq' || exCommand === 'w') {
        parent[viFilename] = viBuffer.textContent;
        saveState();
        trackProgress('vi_save');
    }
    
    if (exCommand === 'wq' || exCommand === 'q' || exCommand === 'q!') {
        viMode = false;
        viOverlay.classList.remove('flex');
        viOverlay.classList.add('view-hidden');
        termInput.focus();
    }
    exCommand = "";
}

function trackProgress(cmd) {
    if (moduleProgress[cmd] !== undefined) moduleProgress[cmd]++;
    if (cmd === 'vi_save') moduleProgress.vi++;
    
    let unlocked = false;
    for (let mod in curriculum) {
        const c = curriculum[mod];
        const complete = c.cmds.every(command => moduleProgress[command] > 0);
        if (complete && !resumeBlocks.includes(c.resume)) {
            resumeBlocks.push(c.resume);
            unlocked = true;
            printLine(`\n<span class="text-black font-bold bg-[#00ff41] px-2 py-1 uppercase">[!] NEURAL LINK ESTABLISHED: Module ${mod} Complete. Exec Resume protocol updated.</span>\n`);
        }
    }
    if (unlocked) saveState();
}

function saveState() {
    localStorage.setItem('sys_core_vfs', JSON.stringify(vfs));
    localStorage.setItem('sys_core_progress', JSON.stringify(moduleProgress));
    localStorage.setItem('sys_core_resume', JSON.stringify(resumeBlocks));
}

function renderResume() {
    if (resumeBlocks.length === 0) {
        resumeContent.innerHTML = "[SYSTEM ALERT: NO EXECUTIVE PROTOCOLS COMPLETED.<br>TRAVERSE THE TERMINAL MODULES TO CONSTRUCT YOUR PROFILE.]";
    } else {
        resumeContent.innerHTML = "<span class=\"text-white font-bold\">=== EXECUTIVE SYSTEMS ADMINISTRATOR ===</span>\n\n<span class=\"text-blue-400 font-bold\">CORE COMPETENCIES SECURED:</span>\n" + resumeBlocks.map(b => "• " + b).join('\n\n');
    }
}

document.getElementById('btn-export-resume').onclick = () => {
    if (resumeBlocks.length === 0) return alert("System Error: No resume data generated yet.");
    let content = resumeContent.innerText;
    let dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sys_core_executive_resume.txt");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

// Init prompt
promptEl.textContent = `user@sys_core:/${currentPath.join('/')}$`;
