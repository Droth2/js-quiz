var counter = 120
var pageContent = document.querySelector("#page-content");
var timerEl = document.querySelector(".time");

var countdown = function() {
    console.log(counter);
    timerEl.innerHTML = counter + "s Remaining!";
    counter--;
    if(counter === 0) {
        endQuiz();
        clearInterval(startCountdown);
    };
};

var startCountdown = function() {
    setInterval(countdown, 1000);
};

var startQuiz = function() {
    startCountdown();
}

var buttonHandler = function() {
    var targetEl = event.target;

    if (targetEl.matches("#start-btn")) {
        startQuiz();
    }
}

pageContent.addEventListener("click", buttonHandler);