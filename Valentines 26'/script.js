// Questions array: Personal Questions + Cryptic Clues
const questions = [
    // --- PART 1: PERSONAL QUESTIONS ---
    {
        type: "text",
        question: "When did we start dating?",
        answer: "APRIL 21ST"
    },
    {
        type: "text",
        question: "On your first birthday, what did I get you?",
        answer: "NECKLACE"
    },
    {
        type: "text",
        question: "When we first met, what was my first thought of you?",
        answer: "SHORT"
    },
    {
        type: "text",
        question: "When Luna smells stinky, what do we call it?",
        answer: "FREETOES"
    },
    {
        type: "text",
        question: "On our first date, where did we meet?",
        answer: "COFFEE BEAN"
    },
    {
        type: "text",
        question: "On our second date, what did I steal from you?",
        answer: "FRIES"
    },

    // --- PART 2: CRYPTIC CLUES (Will You Be My Valentine) ---
    {
        type: "cryptic",
        clue: "Leave fortune with sick person",
        answer: "WILL",
        length: "(4)",
        hints: {
            indicator: "with → W",
            fodder: "sick person → ILL",
            definition: "Leave fortune → WILL",
            letter: "First letter is W"
        }
    },
    {
        type: "cryptic",
        clue: "Solver heard female sheep",
        answer: "YOU",
        length: "(3)",
        hints: {
            indicator: "heard → homophone",
            fodder: "female sheep → EWE",
            definition: "Solver → YOU",
            letter: "First letter is Y"
        }
    },
    {
        type: "cryptic",
        clue: "Live broadcast of insect",
        answer: "BE",
        length: "(2)",
        hints: {
            indicator: "broadcast → homophone",
            fodder: "insect → BEE",
            definition: "Live → BE",
            letter: "First letter is B"
        }
    },
    {
        type: "cryptic",
        clue: "Belonging to setter found in stormy weather",
        answer: "MY",
        length: "(2)",
        hints: {
            indicator: "found in → hidden",
            fodder: "storMY weather",
            definition: "Belonging to setter → MY",
            letter: "First letter is M"
        }
    },
    {
        type: "cryptic",
        clue: "Sweetheart ordered nine valets",
        answer: "VALENTINE",
        length: "(9)",
        hints: {
            indicator: "ordered → anagram",
            fodder: "nine valets",
            definition: "Sweetheart → VALENTINE",
            letter: "First letter is V"
        }
    }
];

let current = 0;

// Elements
const landing = document.getElementById("landing");
const quiz = document.getElementById("quiz");
const title = document.getElementById("title");

// Main Input Area (Used for both Personal and Cryptic)
const cryptic = document.getElementById("cryptic");
const crypticClue = document.getElementById("cryptic-clue");
const enumeration = document.getElementById("enumeration");
const crypticInput = document.getElementById("cryptic-input");
const hintBtn = document.getElementById("hintBtn");

// Final Challenge Elements
const finalChallenge = document.getElementById("final-challenge");
const finalInput = document.getElementById("final-input");
const submitFinalBtn = document.getElementById("submitFinal");

// Success/Valentine Elements
const valentine = document.getElementById("valentine");
const success = document.getElementById("success");
const music = document.getElementById("bg-music");

// Hint modal
const hintModal = document.getElementById("hintModal");
const closeHint = document.getElementById("closeHint");
const hintOptions = document.querySelectorAll(".hintOption");

// NO button
const noBtn = document.getElementById("no");
const noMessages = ["Are you sure?", "Think again 😏", "Dangerous choice!", "Wrong button 💕", "Nice try 😌"];

function startQuiz() {
    landing.classList.add("hidden");
    quiz.classList.remove("hidden");
    music.volume = 0.4;
    music.play().catch(() => { });
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const q = questions[current];
    title.textContent = `Question ${current + 1}`;

    // Ensure the input area is visible
    cryptic.classList.remove("hidden");

    // Clear input and focus
    crypticInput.value = "";
    crypticInput.focus();

    if (q.type === "text") {
        // --- PERSONAL QUESTIONS ---
        // Show question text
        crypticClue.textContent = q.question;
        // Hide "hints" and "(4)" enumeration
        enumeration.style.display = "none";
        hintBtn.style.display = "none";
    } else {
        // --- CRYPTIC QUESTIONS ---
        // Show clue text
        crypticClue.textContent = q.clue;
        // Show "(4)" enumeration and Hints button
        enumeration.textContent = q.length;
        enumeration.style.display = "block";
        hintBtn.style.display = "inline-block";
    }
}

// Check Input (Used for both Personal and Cryptic)
document.getElementById("submitCryptic").onclick = () => {
    const userAns = crypticInput.value.trim().toUpperCase();
    const correctAns = questions[current].answer;

    if (userAns === correctAns) {
        next();
    } else {
        alert("❌ Wrong answer! Try again.");
        crypticInput.value = "";
        crypticInput.focus();
    }
}

function next() {
    current++;
    if (current === questions.length) {
        showFinalChallenge();
    } else {
        loadQuestion();
    }
}

// Show the final typing challenge
function showFinalChallenge() {
    quiz.classList.add("hidden");
    finalChallenge.classList.remove("hidden");
    finalInput.focus();
}

// Check the final typed phrase
submitFinalBtn.onclick = () => {
    const phrase = finalInput.value.trim().toUpperCase();

    // Checks if she typed "WILL YOU BE MY VALENTINE"
    if (phrase.includes("WILL YOU BE MY VALENTINE")) {
        finalChallenge.classList.add("hidden");
        showValentine();
    } else {
        alert("Not quite! Look at your answers again. (Will... You...)");
    }
};

function showValentine() {
    valentine.classList.remove("hidden");
}

// NO button escape - Runs away on hover, Alerts on click
noBtn.addEventListener("mouseenter", runAway);
noBtn.addEventListener("click", showMessage);

function runAway() {
    noBtn.style.left = `${Math.random() * 120 - 60}px`;
    noBtn.style.top = `${Math.random() * 120 - 60}px`;
}

function showMessage() {
    runAway();
    alert(noMessages[Math.floor(Math.random() * noMessages.length)]);
}

// YES button
document.getElementById("yes").onclick = () => {
    valentine.classList.add("hidden");
    success.classList.remove("hidden");
}

// HINTS (Only works for cryptic questions)
hintBtn.onclick = () => hintModal.classList.remove("hidden");
closeHint.onclick = () => hintModal.classList.add("hidden");

hintOptions.forEach(opt => {
    opt.onclick = () => {
        const type = opt.dataset.type;
        const q = questions[current];
        if (q.type === "cryptic") {
            alert(q.hints[type]);
            hintModal.classList.add("hidden");
        }
    }
});