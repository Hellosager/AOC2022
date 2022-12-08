var treeRows = [];

let inputSplitByLine = input.split(/\n/);

inputSplitByLine.forEach(line => {
    let numberArray = line.match(/\d/g);
    let treeRow = [];

    numberArray.forEach(number => {
        treeRow.push(Number(number));
    })
    treeRows.push(treeRow);
})

let treeFieldLength = treeRows.length;
var treesVisible = (treeFieldLength*4) - 4;

function treeVisibleInRow(treeRow, treeCol) {
    var visibleFromLeft = true;
    var visibleFromRight = true;

    if(treeRows[treeRow][0] >= treeRows[treeRow][treeCol]) { // visible from left
        visibleFromLeft = false;
    } else if(treeRows[treeRow][treeFieldLength-1] >= treeRows[treeRow][treeCol]) {
        visibleFromRight = false;
    }

    for (let col = 1; col < treeFieldLength-1; col++) {
        if(col < treeCol) { // left of tree
            if(col < treeCol && (treeRows[treeRow][col] >= treeRows[treeRow][treeCol])) {
                visibleFromLeft = false;
            }
        } else if (col >= treeCol) { // right of tree
            if(treeRows[treeRow][col+1] >= treeRows[treeRow][treeCol]) {
                visibleFromRight = false;
            }
        }
    }

    return visibleFromLeft || visibleFromRight;

}

function treeVisibleInCol(treeRow, treeCol) {
    var visibleFromTop = true;
    var visibleFromBottom = true;

    if (treeRows[0][treeCol] >= treeRows[treeRow][treeCol]) { // visible from top
        visibleFromTop = false;
    } else if (treeRows[treeFieldLength-1][treeCol] >= treeRows[treeRow][treeCol]) { // visible from top
        visibleFromBottom = false;
    }


    for (let row = 1; row < treeFieldLength - 1; row++) {
        if (row < treeRow) { // top of tree
            if ((treeRows[row][treeCol] >= treeRows[treeRow][treeCol])) {
                visibleFromTop = false;
            }
        } else if (row >= treeRow) { // bottom of tree
            if (treeRows[row + 1][treeCol] >= treeRows[treeRow][treeCol]) {
                visibleFromBottom = false;
            }
        }
    }

    return visibleFromTop || visibleFromBottom;
}

for (let row = 1; row < treeFieldLength-1; row++) {
    for (let col = 1; col < treeFieldLength-1; col++) {
        if (treeVisibleInRow(row, col) || treeVisibleInCol(row, col)) {
            treesVisible++;
        }
    }
}


// part 2

var maxScenicScore = 0;

function getScenicScore(treeRow, treeCol) {
    console.log("checking row: " + treeRow + " col: " + treeCol);
    let treeHeight = treeRows[treeRow][treeCol];

    var scenicLeft = 0;
    var scenicTop = 0;
    var scenicRight = 0;
    var scenicBottom = 0;

    // look left
        for(let col = treeCol-1; col >= 0; col--) {
            scenicLeft++;
            if(treeRows[treeRow][col] >= treeHeight) {
                break;
            }
        }

    // look right
    for(let col = treeCol+1; col <= treeFieldLength-1; col++) {
        scenicRight++;
        if(treeRows[treeRow][col] >= treeHeight) {
            break;
        }
    }

    // look top
    for(let row = treeRow-1; row >= 0; row--) {
        scenicTop++;
        if(treeRows[row][treeCol] >= treeHeight) {
            break;
        }
    }

    // look bottom
    for(let row = treeRow+1; row <= treeFieldLength-1; row++) {
        scenicBottom++;
        if(treeRows[row][treeCol] >= treeHeight) {
            break;
        }
    }

    return scenicLeft * scenicRight * scenicTop * scenicBottom;
}


for (let row = 0; row < treeFieldLength; row++)  {
    for (let col = 0; col < treeFieldLength; col++) {
        maxScenicScore = Math.max(maxScenicScore, getScenicScore(row, col))
    }
}



result1div.innerHTML = treesVisible;
result2div.innerHTML = maxScenicScore;