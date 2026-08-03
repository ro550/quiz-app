
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");

const startBtn = document.getElementById("start-btn");
const lastScore = document.getElementById("last-score");

const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const timer = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".option-btn");

const finalScore = document.getElementById("final-score");
const finalPercentage = document.getElementById("final-percentage");
const finalGrade = document.getElementById("final-grade");
const finalMessage = document.getElementById("final-message");

const reviewBtn = document.getElementById("review-btn");
const restartBtn = document.getElementById("restart-btn");

const reviewContainer = document.getElementById("review-container");
const backToResultsBtn = document.getElementById("back-to-results-btn");

console.log(quizQuestions);

//App State (Grouped)
const quiz = {
    currentIndex: 0,
    score: 0,
    answers: [],
    timeLeft: 15,
    timerId: null,
    isAnswered: false
};

function showScreen(screen) {
    [startScreen, quizScreen, resultsScreen, reviewScreen].forEach(screen => screen.classList.add("hidden"));
    screen.classList.remove("hidden");
}

function init () {
    console.log("App Initialized");
    const saved = localStorage.getItem("lastQuizScore");
    if (saved) {
      const data = JSON.parse(saved);
      lastScore.textContent = `Your last score: ${data.score}/${data.total} on ${data.date}`;
    }

    startBtn.addEventListener("click", startQuiz);
    optionButtons.forEach(btn => {
        btn.addEventListener("click", () => handleAnswer(Number(btn.dataset.index)));
    });

    reviewBtn.addEventListener("click", showReview);
    restartBtn.addEventListener("click", restartQuiz);
    backToResultsBtn.addEventListener("click", () => showScreen(resultsScreen)); 
}

function startQuiz() {
    quiz.currentIndex = 0;
    quiz.score = 0;
    quiz.answers = [];
    showScreen(quizScreen);
    loadQuestion();
}

function restartQuiz() {
    startQuiz();
}

function loadQuestion() {
    startTimer();
    quiz.isAnswered = false;
    const qstn = quizQuestions[quiz.currentIndex];
    console.log("Loading Question", quiz.currentIndex, qstn);
    questionText.textContent = qstn.question;

    optionButtons.forEach((btn, index) => {
        btn.textContent = qstn.options[index];
        btn.className = "option-btn"; // reset any correct/wrong styling from last question
        btn.disabled = false;
    });

    questionCounter.textContent = `Question ${quiz.currentIndex + 1} of ${quizQuestions.length}` ;
    scoreDisplay.textContent = `Score: ${quiz.score}` ;
    updateProgressBar();

}

function updateProgressBar() {
    const percent = (quiz.currentIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${percent}%`;
}

function startTimer() {
    clearInterval(quiz.timerId); //Clears the old timer first
    quiz.timeLeft = 15;
    timer.textContent = quiz.timeLeft;

    quiz.timerId = setInterval (() => {
        quiz.timeLeft--;
        timer.textContent = quiz.timeLeft;
        console.log(`Time left: ${quiz.timeLeft}`);

        if (quiz.timeLeft <= 0 ) {
            clearInterval(quiz.timerId);
            handleAnswer(null); // The user ran out of time, no answer selected
        }
    }, 1000);
}

function handleAnswer (selectedIndex) {
    if (quiz.isAnswered) return;
    quiz.isAnswered = true;
    clearInterval(quiz.timerId);

    const qstn = quizQuestions[quiz.currentIndex];
    const isCorrect = selectedIndex === qstn.correct;
    console.log(`Selected: ${selectedIndex} | Correct: ${qstn.correct} | isCorrect: ${isCorrect}`);

    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        if(index === qstn.correct) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    if (isCorrect) {
      quiz.score++;
      scoreDisplay.textContent = `Score: ${quiz.score}`;
    }

    quiz.answers.push({
        question: qstn.question,
        options: qstn.options,
        selectedIndex: selectedIndex,
        correctIndex: qstn.correct,
        isCorrect: isCorrect
    });

    setTimeout(nextQuestion, 1500);
}

function nextQuestion () {
    quiz.currentIndex++;
    console.log("nextQuestion, currentIndex is now:", quiz.currentIndex , "total:", quizQuestions.length);
    if (quiz.currentIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    progressBar.style.width = "100%";
 
    const total = quizQuestions.length;
    const percentage = Math.round((quiz.score / total) * 100);
    const grade = getGrade(percentage);
    console.log(`Final: ${quiz.score}/${total} = ${percentage}% Grade: ${grade}`);
 
    finalScore.textContent = `You got ${quiz.score} out of ${total}`;
    finalPercentage.textContent = `${percentage}%`;
    finalGrade.textContent = `Grade: ${grade}`;
    finalMessage.textContent = getMessage(grade);
 
    saveScore(quiz.score, total);
    showScreen(resultsScreen);
}

function getGrade(percentage) {
    if (percentage >= 75) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
}

function getMessage(grade) {
    const messages = {
        A: "Excellent work!",
        B: "Great job!",
        C: "Good effort!",
        D: "You can do better, keep practicing!",
        F: "Keep practicing!"
    };
    return messages[grade];
}

function saveScore(score, total) {
    const data = {
        score: score,
        total: total,
        date: new Date().toLocaleDateString()
    };
    localStorage.setItem("lastQuizScore", JSON.stringify(data));
}

function showReview() {
    reviewContainer.innerHTML = "";

    quiz.answers.forEach((answer, index) =>{
        const card = document.createElement("div");
        card.className = "review-card";

        const question = document.createElement("p");
        question.className = "review-question";
        question.textContent = `${index + 1}. ${answer.question}`;
        card.appendChild(question);

        answer.options.forEach((optionText, index) => {
           const option = document.createElement("p");
           option.className = "review-option";
           option.textContent = optionText;
           if (index === answer.correctIndex) {
            option.classList.add("correct");
           } else if (index === answer.selectedIndex) {
            option.classList.add("wrong");
           }
           card.appendChild(option);
        });

        reviewContainer.appendChild(card);
    });

    showScreen(reviewScreen);
}

init();