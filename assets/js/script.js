var counter = 120
var score = 0
var pageContent = document.querySelector("#page-content");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector(".time");
var questionContainerEl = document.querySelector("#question-container");
var heading = document.querySelector(".heading");
var description = document.querySelector(".description");
var questionEl = document.querySelector("#question");
const answerBtnEl = document.querySelector(".ans-btns");
var buttonsEl = document.querySelector(".buttons");
var answerBtn = document.querySelector(".button");
var btnNumber = 1 
var scoresArr = [];

var startCountdown = function() {
    var interval = setInterval(function() {
        if(counter > 0) {
            timerEl.innerHTML = counter + "s Remaining!";
            counter--;
        } else {
            timerEl.innerHTML = "0s Remaining!";
            debugger;
            clearInterval(interval);
            endQuiz();
        }
    }, 1000)
};

let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startCountdown();
    console.log('started');
    startBtn.classList.add('hide');
    description.classList.add('hide');
    heading.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button);
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.querySelector("#correct-wrong"), correct);
}

function callSetQuestionFunc() {
    if (shuffledQuestions.length > currentQuestionIndex) {
        setNextQuestion();
    } else {
        console.log("done");
        console.log(score);
        endQuiz();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.remove('hide');
        element.innerText = "Correct";
        currentQuestionIndex++;
        score += 10
        console.log(score);
        callSetQuestionFunc();
    } else {
        element.classList.remove('hide');
        element.innerText = "Incorrect";
        currentQuestionIndex++;
        if (score > 0){
            debugger;
            score -= 10;
            counter -= 10;
            console.log(score);
        }
        callSetQuestionFunc();
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function resetState() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
}

function endQuiz() {
    questionContainerEl.classList.add('hide');
    heading.innerText = "Score:" + score + ", Enter your name to save your score!"
    heading.classList.remove('hide');
    var saveForm = document.createElement('form');
    var saveInput = document.createElement('input');
    var saveBtn = document.createElement('button');
    saveInput.setAttribute('type', 'text');
    saveInput.setAttribute('name', 'save-name');
    saveInput.setAttribute('placeholder', 'Enter Your Name');
    saveBtn.innerText = "save";
    saveBtn.classList.add('button');
    saveBtn.setAttribute('type', 'submit');
    saveBtn.setAttribute('id', 'save-btn');
    saveBtn.addEventListener('click', saveScore);
    saveForm.appendChild(saveInput);
    saveForm.appendChild(saveBtn);
    pageContent.appendChild(saveForm);
}

function saveScore() {
    event.preventDefault();
    debugger;
    var saveFormEl = document.querySelector('form');
    var savedName = document.querySelector("input[name='save-name']").value;
    var scoresObj ={
        name: savedName,
        score: score
    };
    scoresArr.push(scoresObj);
    console.log(scoresArr);
    saveSaveScore();
    console.log (scoresObj.name + " has a score of " + scoresObj.score);
    saveFormEl.reset();
    window.location.href = "./highscores.html";
}

function saveSaveScore() {
    debugger;
    localStorage.setItem("playerScore", JSON.stringify(scoresArr));
}

function loadScores() {
    var savedScores = localStorage.getItem("playerScore");
    if (!savedScores) {
        return false
    }
    savedScores = JSON.parse(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
        scoresArr.push(savedScores[i]);
    };
};

var questions = [
    {
        question: 'Commonly used data types DO NOT Include:',
        answers: [
            { text: 'Strings', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'Numbers', correct: false }
        ]
    },
    {
        question: 'The condition in an if/else statment is enclosed with _____.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'Curly Brackets', correct: false },
            { text: 'Parenthesis', correct: true },
            { text: 'Square Brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: [
            { text: 'Numbers and Strings', correct: false },
            { text: 'Other Arrays', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'All of The Above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        answers: [
            { text: 'Commas', correct: false },
            { text: 'Curly Brackets', correct: false },
            { text: 'Quotes', correct: true },
            { text: 'Parenthesis', correct: false }
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'Terminal/Bash', correct: false },
            { text: 'For Loops', correct: false },
            { text: 'console.log', correct: true }
        ]
    }
];

loadScores();