const moves = input.split(/\n/);

let rope = [{x:0, y:0}, {x:0, y:0}];
let rope = [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}];

let visitedPositions = [{x:0, y:0}];
let numberOfVisitedPositions = 1;

function moveHead(direction) {
    switch (direction) {
        case "L": rope[0].x--; break;
        case "R": rope[0].x++; break;
        case "U": rope[0].y--; break;
        case "D": rope[0].y++; break;
    }
}

function moveTail() {
    for(let knotIndex = 1; knotIndex < rope.length; knotIndex++) {
        if(!knotsAreTouching(rope[knotIndex-1], rope[knotIndex])) {
            moveKnot(rope[knotIndex-1], rope[knotIndex]);
        }
    }
}

function moveKnot(headKnot, knot) {
    var xChange = 0, yChange = 0;

    if(headKnot.x !== knot.x && headKnot.y !== knot.y) { // diagonally
        xChange = headKnot.x > knot.x ? 1 : -1;
        yChange = headKnot.y > knot.y ? 1 : -1;
    } else if(headKnot.y === knot.y) { // same row
        xChange = headKnot.x > knot.x ? 1 : -1;
    } else if (headKnot.x === knot.x) {
        yChange = headKnot.y > knot.y ? 1 : -1;
    }

    knot.x += xChange;
    knot.y += yChange;

    if(knot === rope[rope.length-1]) {
        if(!visitedPositions.find(pos => pos.x === knot.x && pos.y === knot.y)) {
            visitedPositions.push({x: knot.x, y:knot.y})
            numberOfVisitedPositions++;
        }
    }
}

function knotsAreTouching(headKnot, knot) {
    return (headKnot.x === knot.x || headKnot.x-1 === knot.x || headKnot.x+1 === knot.x)
        && (headKnot.y === knot.y || headKnot.y-1 === knot.y || headKnot.y+1 === knot.y);}

moves.forEach(move => {
    let splitMove = move.split(" ");
    let direction = splitMove[0];
    let movesToBeDone = Number(splitMove[1]);

    for (let movesDone = 0; movesDone < movesToBeDone; movesDone++) {
        moveHead(direction);
        moveTail();
    }
});


result1div.innerText = numberOfVisitedPositions;