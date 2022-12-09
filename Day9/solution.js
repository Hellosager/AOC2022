const moves = input.split(/\n/);

let head = {x: 0, y: 0};
let tail = {x: 0, y: 0};
let visitedPositions = [{x:0, y:0}];
let numberOfVisitedPositions = 1;

function moveHead(direction) {
    switch (direction) {
        case "L": head.x--; break;
        case "R": head.x++; break;
        case "U": head.y--; break;
        case "D": head.y++;
    }
}

function headTouchesTail() {
    return (head.x === tail.x || head.x-1 === tail.x || head.x+1 === tail.x)
        && (head.y === tail.y || head.y-1 === tail.y || head.y+1 === tail.y)
}

moves.forEach(move => {
    let splitMove = move.split(" ");
    let direction = splitMove[0];
    let movesToBeDone = splitMove[1];

    for (let movesDone = 0; movesDone < movesToBeDone; movesDone++) {
        let oldHeadPosition = {x:head.x, y:head.y};
        moveHead(direction);
        if(!headTouchesTail()) {
            tail = oldHeadPosition;
            if(!visitedPositions.find(position => position.x === tail.x && position.y === tail.y)) {
                visitedPositions.push(oldHeadPosition);
                numberOfVisitedPositions++;
            }
        }
    }
})

result1div.innerText = numberOfVisitedPositions;