var counter = 120
var score = 0
var pageContent = document.querySelector("#page-content");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector(".time");
var heading = document.querySelector(".heading");
var buttonsEl = document.querySelector(".buttons");
var answerBtn = document.querySelector(".button");

var countdown = function() {
    timerEl.innerHTML = counter + "s Remaining!";
    counter--;
    if(counter === 0) {
        clearInterval(counter);
        endQuiz();
    };
};

var startCountdown = function() {
    setInterval(countdown, 1000);
};

var startQuiz = function() {
    startCountdown();
    question1();
}

var question1 = function () {
    // hiding description and start button and adding new question 
    var description = document.querySelector(".description");
    description.className = "hide";
    var startBtnEl = document.querySelector("#start-btn");
    startBtnEl.className = "hide";
    heading.innerHTML = questions[0].question;
    questions[0].answers.forEach(answers => {
        const ansButton = document.createElement('button');
        ansButton.innerText = answers.text;
        ansButton.className = 'button';
        if (answers.correct) {
            ansButton.dataset.correct = answers.correct
        };
        buttonsEl.appendChild(ansButton);
    });
    
    // when button is clicked answer is saved and next question appears 
    
};

var answer = function(e) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    if (correct) {
        score += 10;
        console.log(score);
        trueAction();
        question2();
    } else {
        falseAction();
        question2();
    }
}

var buttonHandler = function() {
    var targetEl = event.target;

    if (targetEl.matches("#start-btn")) {
        startQuiz();
    } else if (targetEl.matches(".button")) {
        answer();
    }
}  

var trueAction = function() {
    console.log("you got it right");
    const trueStatment = document.createElement("section");
    trueStatment.className = 'tf';
    trueStatment.innerHTML = "<h3 class='tf-words'>Correct</h3>";
    pageContent.appendChild(trueStatment);
};

var falseAction = function() {
    console.log("you got it wrong");
    const falseStatment = document.createElement("section");
    falseStatment.className = 'tf';
    falseStatment.innerHTML = "<h3 class='tf-words'>Incorrect</h3>";
    pageContent.appendChild(falseStatment);
};

var question2 = function() {
    console.log("starting question2");
};

pageContent.addEventListener("click", buttonHandler);

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