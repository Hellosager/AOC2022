const inputByLine = input.split(/\n/);
// const inputByLine = demoInput.split(/\n/);
var heights = [];
var start;
var end;

for(let lineNumber = 0; lineNumber < inputByLine.length; lineNumber++) { // rows
    let row = [];
    for(let charIndex = 0; charIndex < inputByLine[lineNumber].length; charIndex++) { // cols
        let char = inputByLine[lineNumber].charAt(charIndex);
        if(char === 'E') { // end
            row.push('z'.charCodeAt(0));
            end = {x: charIndex, y:lineNumber};
        } else if (char === 'S') {
            row.push('a'.charCodeAt(0));
            start = {x: charIndex, y:lineNumber};
        } else {
            row.push(char.charCodeAt(0));
        }
    };

    heights.push(row);
};


function getReachableFields(x, y) {
    let reachableFields = [];
    let currentHeight = heights[y][x];
    if(x >= 1 && heights[y][x-1] <= (currentHeight+1)) {
        reachableFields.push({x:x-1, y:y});
    }
    if(x <= heights[y].length-2 && heights[y][x+1] <= (currentHeight+1)) {
        reachableFields.push({x:x+1, y:y});
    }
    if(y >= 1 && heights[y-1][x] <= (currentHeight+1)) {
        reachableFields.push({x:x, y:y-1});
    }
    if(y <= heights.length-2 && heights[y+1][x] <= (currentHeight+1)) {
        reachableFields.push({x:x, y:y+1});
    }

    return reachableFields;
}

function expandNode(currentNode, openList, closedList) {
    getReachableFields(currentNode.x, currentNode.y).forEach(successor => {
        if(closedList.find(node => successor.x === node.x && successor.y === node.y)) {

        } else {
            let cost = currentNode.value + 1;
            if(openList.find(node => successor.x === node.x && successor.y === node.y)
            && (successor.value && cost >= successor.value)) {
                // nothing
            } else {
                successor.predecessor = currentNode;
                successor.value = cost;
                if (!openList.find(node => successor.x === node.x && successor.y === node.y)) {
                    openList.push(successor);
                }
            }
        }

    });
}

function getMostValuableNode(openList) {
    var mostValuableNodeIndex = 0;

    for (var i = 0; i < openList.length ; i++) {
        if(openList[i].value < openList[mostValuableNodeIndex]) {
            mostValuableNodeIndex = i;
        }
    }

    return mostValuableNodeIndex;
}

function aStar(startNode, endNode) {
    let openList = [{x:startNode.x, y:startNode.y, value:0}];
    let closedList = [];

    do {
        let mostValuableNodeIndex = getMostValuableNode(openList);
        let currentNode = openList[mostValuableNodeIndex];
        openList.splice(mostValuableNodeIndex, 1);
        if(currentNode.x === endNode.x && currentNode.y === endNode.y) {
            return currentNode;
        }

        closedList.push(currentNode);
        expandNode(currentNode, openList, closedList);
    } while(openList.length !== 0);
}

result1div.innerText = aStar(start, end).value;


// part 2
let lowestStartSteps = 133742069;

for(let y = 0; y < heights.length; y++) {
    for(let x = 0; x < heights[y].length; x++) {
        if(heights[y][x] === 'a'.charCodeAt(0)) {
            let aStarNode = aStar({x:x, y:y}, end);
            if(aStarNode) {
                lowestStartSteps = Math.min(lowestStartSteps, aStar({x:x, y:y}, end).value);
            }
        }
    }
}

result2div.innerText = lowestStartSteps;