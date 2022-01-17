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

var countdown = function() {
    if(counter > 0) {
        timerEl.innerHTML = counter + "s Remaining!";
        counter--;
    } else {
        timerEl.innerHTML = "0s Remaining!";
        clearInterval(counter);
        endQuiz();
    }
};

var startCountdown = function() {
    setInterval(countdown, 1000);
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
            score -= 10;
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
    clearInterval(counter);
    questionContainerEl.classList.add('hide');
    heading.innerText = "Score:" + score + ", Enter your name to save your score!"
    heading.classList.remove('hide');
    const saveForm = document.createElement('form');
    const saveInput = document.createElement('input');
    const saveBtn = document.createElement('button');
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
    const saveFormEl = document.querySelector('form');
    const savedName = document.querySelector("input[name='save-name']").value;
    const scoresObj ={
        name: savedName,
        score: score
    };
    localStorage.setItem("scores", JSON.stringify(scoresObj));
    console.log (scoresObj.name + " has a score of " + scoresObj.score);
    saveFormEl.reset();
    window.location.href = "./highscores.html";
}

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