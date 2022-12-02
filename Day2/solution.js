const myShapes = {
    'X':'A',
    'Y':'B',
    'Z':'C'
}

const shapes = {
    'A': { // Rock
        points: 1,
        winsAgainst: 'C',
        losesAgainst: 'B'
    },
    'B': { // Paper
        points: 2,
        winsAgainst: 'A',
        losesAgainst: 'C'
    },
    'C': { // Scissors
        points: 3,
        winsAgainst: 'B',
        losesAgainst: 'A'
    }
}


function isWin(enemyChoice, myChoice) {
    return shapes[enemyChoice].losesAgainst === myChoice;
}

function isDraw(enemyChoice, myChoice) {
    return enemyChoice === myChoice;
}

function isLose(enemyChoice, myChoice) {
    return shapes[enemyChoice].winsAgainst === myChoice;
}

function calculateRound(enemyChoice, myChoice) {
    let matchResultPoints = isWin(enemyChoice, myChoice)
        ? 6
        : isDraw(enemyChoice, myChoice) ? 3 : 0;

    return matchResultPoints + shapes[myChoice].points;
}

var myScore = 0;

var rounds = input.split(/\n/);
rounds.forEach(round => {
    let playedShapes = round.match(/\w/g);
    let enemyChoice = playedShapes[0];
    let myChoice = myShapes[playedShapes[1]];
    myScore += calculateRound(enemyChoice, myChoice);
});

result1div.innerText = myScore;

// secon part
var myScriptedScore = 0;

function determineMyChoice(enemyChoice, intendedResult) {
    if(intendedResult === 'X') { // lose
        return shapes[enemyChoice].winsAgainst;
    } else if(intendedResult === 'Y') { // draw
        return enemyChoice;
    } else if(intendedResult === 'Z') { // win
        return shapes[enemyChoice].losesAgainst;
    }
}

rounds.forEach(round => {
    let roundMapping = round.match(/\w/g);
    let enemyChoice = roundMapping[0];
    let myChoice = determineMyChoice(enemyChoice, roundMapping[1]);
    myScriptedScore += calculateRound(enemyChoice, myChoice);
});

result2div.innerText = myScriptedScore;


