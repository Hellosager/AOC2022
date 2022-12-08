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
                // console.log("Tree " + treeRow + " " + treeCol + " is visible in row");
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
                // console.log("Tree " + treeRow + " " + treeCol + " is visible in row");
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

result1div.innerHTML = treesVisible;