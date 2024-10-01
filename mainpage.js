var score = 50;
var diceNumber = -1;
var bet = 0;
var guessNumber = -1;
var lowOrHigh = "low";
var isGameStart = false;
var gameStartTime = 0;
var gameEndTime = 0;
var elapsedEpochTime = 0;
var leaderBoard = [["John", "00:35:100"],
["Josh", "00:40:500"],
["James", "00:45:100"],
["Jane", "00:50:100"],
["Jin", "00:55:100"],
["Jaws", "00:57:100"]]


function whenLoadMainpage() {
    if (isDarkMode()) {
        toggleDarkModeWebpage();
    }

    document.getElementById("score").innerHTML = score;
}


function checkBet() {
    bet = parseFloat((document.getElementById("numberInput").value));
    if (bet > score) {
        document.getElementById("messageText1").innerHTML = "Your bet is bigger than your score."
        return false;
    }
    else if (isNaN(bet) || bet <= 0) {
        document.getElementById("messageText1").innerHTML = "Please bet.";
        return false;
    }
    else {
        document.getElementById("bet").innerHTML = bet;
        return true;
    }
}


function checkLowOrHigh() {
    lowOrHigh = document.getElementById("lowHigh").innerHTML;
    if (lowOrHigh == "high" || lowOrHigh == "low") {
        return true;
    }
    else {
        document.getElementById("messageText1").innerHTML = "Select low or high.";
        return false;
    }
}


function checkGuessNumber() {
    guessNumber = (document.getElementById("guessNumberInput").innerHTML);
    if (guessNumber > 0 && guessNumber < 7) {
        return true;
    }
    else {
        document.getElementById("messageText1").innerHTML = "Guess dice number.";
        return false;
    }
}


function timerStart() {
    if (!isGameStart) {
        gameStartTime = new Date().getTime();
        isGameStart = true;
    }
}


function timerEnd() {
    if (isGameStart) {
        gameEndTime = new Date().getTime();
    }
}


function beforeRoll() {
    clearMessageWindow();
    if (checkBet() && checkLowOrHigh() && checkGuessNumber()) {
        diceRoll();
    }
}


function diceRoll() {
    timerStart();
    var diceRunningTime = 3000;
    const startTime = new Date().getTime();

    // var diceNumber = -1;
    document.getElementById("rollButton").disabled = true;
    var myInterval = setInterval(() => {
        if (new Date().getTime() - startTime > diceRunningTime) {
            clearInterval(myInterval);
            document.getElementById("rollButton").disabled = false;
        }

        diceImageChange(diceRandom(6));
    }, 150);

    diceNumber = diceRandom(6) + 1;
    setTimeout(diceImageChange, diceRunningTime + 200, diceNumber - 1);
    setTimeout(messageAfterRoll, diceRunningTime + 250, diceNumber);

}


function messageAfterRoll(diceNumber) {
    document.getElementById("messageText1").innerHTML = "It is " + "<strong>" + diceNumber + "</strong>" + " !!!";
    winOrLose(diceNumber, guessNumber, lowOrHigh);
}


function winOrLose(diceNumber, guessNumber, lowOrHigh) {
    var lowHightResult = lowHighCheck(lowOrHigh, diceNumber);
    var diceNumberResult = diceNumberCheck(diceNumber, guessNumber);
    if (!lowHightResult && !diceNumberResult) {
        document.getElementById("messageText4").innerHTML = "Both wrong!!! -" + bet + " point(s)";
        score = parseFloat(score) - parseFloat(bet);
        document.getElementById("score").innerHTML = score;
    }
    scoreCheck();
}


function lowHighCheck(lowOrHigh, diceNumber) {
    if (diceNumber < 4 && lowOrHigh == "low") {
        document.getElementById("messageText2").innerHTML = "Low!!! You got it right! +" + bet + " point(s)";
        score = parseFloat(score) + parseFloat(bet);
        document.getElementById("score").innerHTML = score;
        return true;
    }
    else if (diceNumber > 3 && lowOrHigh == "high") {
        document.getElementById("messageText2").innerHTML = "High!!! You got it right! +" + bet + " point(s)";
        score = parseFloat(score) + parseFloat(bet);
        document.getElementById("score").innerHTML = score;
        return true;
    }
    else {
        document.getElementById("messageText2").innerHTML = "Your guess on low or high is wrong."
        false;
    }
}


function diceNumberCheck(diceNumber, guessNumber) {
    if (diceNumber == guessNumber) {
        document.getElementById("messageText3").innerHTML = diceNumber + "!!! You got it right! +" + bet + " point(s)";
        score = parseFloat(score) + parseFloat(bet);
        document.getElementById("score").innerHTML = score;
        return true;
    }
    else {
        document.getElementById("messageText3").innerHTML = "Your guess " + guessNumber + " is wrong.";
        return false;
    }
}


function scoreCheck() {
    if (score >= 300) {
        timerEnd();
        setTimeout(alert, 500, "You win!!! It takes " + elapsedTimeConvertor())
        setTimeout(resetGame, 700);
        setTimeout(canUpdateleaderBoard, 800);
        setTimeout(warningGamblingAddiction, 900);
    }
    if (score <= 0) {
        setTimeout(alert, 500, "You lose. Please restart.")
        setTimeout(resetGame, 700);
    }
}


function warningGamblingAddiction() {
    alert("You probably gambled a lot to get here. Just in case, I would like to introduce you to the Gambling Addiction Help Center site.");
    window.open("https://trafalgarresidence.com/gambling-addiction-treatment/");
}

function canUpdateleaderBoard() {
    if (canMyNameOnLeaderBoard(elapsedTimeConvertor())) {
        let playerName = prompt("Please Enter Your name: ", "");
        let recordArray = [playerName, elapsedTimeConvertor()];
        let newRocordArray = loadLeaderBoardStorage(leaderBoard);
        let updatedArray = updateLeaderBoardArray(newRocordArray, recordArray);
        updateLeaderBoardStorage(updatedArray);
    }
}


function resetGame() {
    score = 50;
    document.getElementById("score").innerHTML = score;
    clearMessageWindow();
    isGameStart = false;
}


function elapsedTimeConvertor() {
    elapsedEpochTime = gameEndTime - gameStartTime;
    let minutes = Math.floor(elapsedEpochTime / (60 * 1000));
    let seconds = ((elapsedEpochTime % (60 * 1000)) / 1000).toFixed(0);
    let milliseconds = elapsedEpochTime % 1000;
    return (("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + ":" + ("0" + milliseconds).slice(-3));
}


function diceImageChange(diceNumber) {
    var diceImages = ["images/dice_1.png", "images/dice_2.png", "images/dice_3.png", "images/dice_4.png", "images/dice_5.png", "images/dice_6.png"];
    document.getElementById("dice").src = diceImages[diceNumber];
}


function diceRandom(num) {
    return Math.floor(Math.random() * num);
}


function roll(bet) {
    document.getElementById("bet").innerHTML = bet;
}


function lowHigh(lowOrHighValue) {
    document.getElementById("lowHigh").innerHTML = lowOrHighValue;
}


function guessNumberInput(number) {
    document.getElementById("guessNumberInput").innerHTML = number;
}


function clearMessageWindow() {
    document.getElementById("messageText1").innerHTML = "";
    document.getElementById("messageText2").innerHTML = "";
    document.getElementById("messageText3").innerHTML = "";
    document.getElementById("messageText4").innerHTML = "";
    document.getElementById("messageText5").innerHTML = "";
}





// Below is about leaderboard
function canMyNameOnLeaderBoard(recordString) {
    return (normalTimeToMillisecond(leaderBoard[5][1]) >= normalTimeToMillisecond(recordString))
}


function updateLeaderBoardArray(originalArray, recordArray) {
    for (let i = 0; i < 6; i++) {
        if (normalTimeToMillisecond(originalArray[i][1]) >= normalTimeToMillisecond(recordArray[1])) {
            let newIndex = i;
            let tempBetter = recordArray;
            while (newIndex < 6) {
                let tempWorse = originalArray[newIndex];
                originalArray[newIndex] = tempBetter;
                tempBetter = tempWorse;
                newIndex++;
            }
            return originalArray;
        }
    }
    return originalArray;
}


function normalTimeToMillisecond(normal) {
    let time = normal.split(":");
    time = (parseFloat(time[0]) * 60 * 1000) + (parseFloat(time[1]) * 1000) + (parseFloat(time[2]));

    return time;
}


function updateLeaderBoardStorage(arrayData) {
    let stringifiedArray = arrayToString(arrayData)
    localStorage.setItem("leaderBoard", stringifiedArray);
}

function stringToArray(data) {
    return JSON.parse(data)
}

function arrayToString(array) {
    return JSON.stringify(array);
}


function loadLeaderBoardStorage(oldLeaderBoardArray) {
    let leaderBoardArray = localStorage.getItem("leaderBoard");
    let newLeaderBoardArray = oldLeaderBoardArray;

    if (leaderBoardArray != null) {
        newLeaderBoardArray = stringToArray(leaderBoardArray);
    }

    return newLeaderBoardArray;
}

function whenLoadLeaderBoard() {
    if (isDarkMode()) {
        toggleDarkModeWebpage();
    }

    let LeaderBoardPageArray = loadLeaderBoardStorage(leaderBoard);

    document.getElementById("row0_col0").innerHTML = LeaderBoardPageArray[0][0];
    document.getElementById("row0_col1").innerHTML = LeaderBoardPageArray[0][1];

    document.getElementById("row1_col0").innerHTML = LeaderBoardPageArray[1][0];
    document.getElementById("row1_col1").innerHTML = LeaderBoardPageArray[1][1];

    document.getElementById("row2_col0").innerHTML = LeaderBoardPageArray[2][0];
    document.getElementById("row2_col1").innerHTML = LeaderBoardPageArray[2][1];

    document.getElementById("row3_col0").innerHTML = LeaderBoardPageArray[3][0];
    document.getElementById("row3_col1").innerHTML = LeaderBoardPageArray[3][1];

    document.getElementById("row4_col0").innerHTML = LeaderBoardPageArray[4][0];
    document.getElementById("row4_col1").innerHTML = LeaderBoardPageArray[4][1];

    document.getElementById("row5_col0").innerHTML = LeaderBoardPageArray[5][0];
    document.getElementById("row5_col1").innerHTML = LeaderBoardPageArray[5][1];
}


function whenLoadAboutUs() {
    if (isDarkMode()) {
        toggleDarkModeWebpage();
    }
}




// dark-mode
function toggleDarkMode() {
    if (isDarkMode()) {
        sessionStorage.setItem("darkMode", "false");
    }
    else {
        sessionStorage.setItem("darkMode", "true")
    }

    const body = document.body;
    body.classList.toggle('dark-mode');
}


function toggleDarkModeWebpage() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}


function isDarkMode() {
    let isDarkMode = sessionStorage.getItem("darkMode");
    if (isDarkMode == null) {
        sessionStorage.setItem("darkMode", "false");
        return false;
    }
    else if (isDarkMode == "true") {
        return true;
    }
    else {
        return false;
    }
}



