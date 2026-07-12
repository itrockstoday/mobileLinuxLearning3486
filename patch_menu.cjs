const fs = require('fs');
let code = fs.readFileSync('public/app.js', 'utf8');

const menuFunc = `
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
    await printTypewriter("Enter choice (1, 2, or 3):", 'text-[var(--arcade-yellow)] mt-4', 1);
    updatePrompt();
}
`;

code = code.replace("async function startWizard() {", menuFunc + "\nasync function startWizard() {");

const handleWizardInputNew = `
async function handleWizardInput(val) {
    if (state.wizardStep === 'menu') {
        if (val === '1') {
            localStorage.removeItem('arcade_state_v3');
            state = {
                xp: 0, rank: 'NOVICE', resumeBlocks: [], profile: { name: '', email: '', phone: '' },
                wizardStep: 'name', mod: 1, concept: 1, step: 'explain'
            };
            updateRank();
            updateResumeView();
            startWizard();
        } else if (val === '2') {
            const hasSave = localStorage.getItem('arcade_state_v3') !== null;
            if (hasSave) {
                const s = localStorage.getItem('arcade_state_v3');
                state = JSON.parse(s);
                updateRank();
                updateResumeView();
                if (state.wizardStep !== 'done') {
                    startWizard();
                } else {
                    advanceCurriculum(true);
                }
            } else {
                await printTypewriter("No save file exists. Enter choice:", 'text-red-500 mt-2', 1);
            }
        } else if (val === '3') {
            localStorage.removeItem('arcade_state_v3');
            state = {
                xp: 0, rank: 'NOVICE', resumeBlocks: [], profile: { name: '', email: '', phone: '' },
                wizardStep: 'menu', mod: 1, concept: 1, step: 'explain'
            };
            updateRank();
            updateResumeView();
            await printTypewriter("Profile deleted. Refreshing menu...", 'text-red-500 mt-2', 1);
            await new Promise(r => setTimeout(r, 1000));
            startMenu();
        } else {
            await printTypewriter("Invalid choice. Please enter 1, 2, or 3.", 'text-red-500 mt-2', 1);
        }
        return;
    }
`;

code = code.replace("async function handleWizardInput(val) {", handleWizardInputNew);

const gameStartedNew = `
            if (!gameStarted) {
                gameStarted = true;
                startMenu();
            }
`;

code = code.replace(/if \(!gameStarted\) \{[\s\S]*?\}\s*\}/m, gameStartedNew.trim());

const exitHandler = `
        const val = termInput.value;
        if (!val.trim()) return;
        
        termInput.value = '';
        
        if (val.trim().toLowerCase() === 'exit') {
            saveState();
            viMode = false;
            viOverlay.classList.add('view-hidden');
            viOverlay.classList.remove('flex');
            startMenu();
            return;
        }
`;

code = code.replace(/const val = termInput\.value;\s*if \(!val\.trim\(\)\) return;\s*termInput\.value = '';/, exitHandler);

const updatePromptNew = `
function updatePrompt() {
    if (state.wizardStep === 'menu') {
        document.getElementById('prompt').innerText = \`arcade@menu:~$\`;
    } else if (state.wizardStep !== 'done') {
        document.getElementById('prompt').innerText = \`setup@wizard:~$\`;
    } else {
        document.getElementById('prompt').innerText = \`player@arcade:~$\`;
    }
}
`;

code = code.replace(/function updatePrompt\(\) \{[\s\S]*?\}/, updatePromptNew);

fs.writeFileSync('public/app.js', code);
