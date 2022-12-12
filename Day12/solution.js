// const inputByLine = input.split(/\n/);
const inputByLine = demoInput.split(/\n/);
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
    let currentHeight = heights[x][y];
    if(x >= 1 && heights[x-1][y] <= (currentHeight+1)) {
        reachableFields.push({x:x-1, y:y});
    }
    if(x <= heights[x][y].length-2 && heights[x+1][y] <= (currentHeight+1)) {
        reachableFields.push({x:x+1, y:y});
    }
    if(y >= 1 && heights[x][y-1] <= (currentHeight+1)) {
        reachableFields.push({x:x, y:y-1});
    }
    if(y <= heights.length-2 && heights[x][y+1] <= (currentHeight+1)) {
        reachableFields.push({x:x, y:y+1});
    }

    return reachableFields;
}

function containsEnd(reachableFields) {
    reachableFields.forEach(field => {
       if(field.x === end.x && field.y === end.y) {
           return true;
       }
    });
     return false;
}

// TBD
function getFieldValue(x, y, depth) {
    let reachableFields = getReachableFields(x, y);
    if(containsEnd(reachableFields)) { // we can reach the end, go for it
        return depth;
    } else {
        let lowestValue = 13374206900000000;
        for(let field of reachableFields) {
            let fieldValue = getFieldValue(field.x, field.y, depth+1);
            Math.min(lowestValue, fieldValue);
        }
        return lowestValue;
    }


}


getFieldValue(start.x, start.y, 1);