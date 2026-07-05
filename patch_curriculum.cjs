const fs = require('fs');

let appJs = fs.readFileSync('public/app.js', 'utf8');

const newCurriculum = `const CURRICULUM = {
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
};`;

appJs = appJs.replace(/const CURRICULUM = \{[\s\S]*?\n\};\n/, newCurriculum + '\n');
fs.writeFileSync('public/app.js', appJs);
console.log("Patched CURRICULUM");
