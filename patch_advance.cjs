const fs = require('fs');
let code = fs.readFileSync('public/app.js', 'utf8');

const newAdvance = `async function advanceCurriculum(isResuming = false) {
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
                await printTypewriter(\`--- MODULE \${state.mod} : CONCEPT \${state.concept} ---\`, 'text-[#9d00ff] mb-4 font-bold', 1);
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
            await printTypewriterVi(\`> \${cur.demonstrateCommand}\`, 'text-white mb-2', 1);
            if (cur.demonstrateOutput) {
                await printTypewriterVi(cur.demonstrateOutput, 'text-[#c5c6c7] mb-4', 1);
            } else {
                await new Promise(r => setTimeout(r, 500));
            }
        } else {
            await printTypewriter(cur.demonstrateText, 'text-[#ffb000] mb-2 mt-4 italic', 1);
            await new Promise(r => setTimeout(r, 500));
            await printTypewriter(\`player@arcade:~$ \${cur.demonstrateCommand}\`, 'text-white mb-2 font-bold', 1);
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
            viStatus.innerHTML = \`<span class="text-[#ffb000] animate-pulse">\${cur.imitatePrompt}</span>\`;
        } else {
            await printTypewriter(cur.imitatePrompt, 'text-[#ffb000] mt-4 font-bold', 1);
        }
    } else if (state.step === 'practice') {
        if (cur.practiceTarget === 'AUTO') {
            if (isVi) {
                viStatus.innerHTML = \`<span class="text-[#9d00ff] font-bold">\${cur.practicePrompt}</span>\`;
            } else {
                await printTypewriter(cur.practicePrompt, 'text-[#9d00ff] mt-4 font-bold', 1);
            }
            await new Promise(r => setTimeout(r, 2500));
            await handlePracticeSuccess();
            return;
        }
        if (isVi) {
            viStatus.innerHTML = \`<span class="text-[#9d00ff] font-bold">\${cur.practicePrompt}</span>\`;
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
}`;

code = code.replace(/async function advanceCurriculum[\s\S]*?updatePrompt\(\);\n\}/, newAdvance);
fs.writeFileSync('public/app.js', code);
console.log("Patched advanceCurriculum");
