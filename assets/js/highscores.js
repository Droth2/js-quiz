var scoresContainerEl = document.querySelector("#scores-container");
var savedScores = localStorage.getItem("playerScore");
var numberCounter = 1

function loadScores() {
    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {
        createScoreEl(savedScores[i]);
    }
};

function createScoreEl(scoresObj) {
    var score = document.createElement("div");
    score.classList.add("player-score");
    score.textContent = numberCounter + ". " + scoresObj.name + " - " + scoresObj.score;
    scoresContainerEl.appendChild(score);
}

loadScores();