const pathPerLine  = input.split("\n\n")[0].split("\n");
const pathInstructions  = input.split("\n\n")[1].match(/\d+|R|L/g);

const rowLength = pathPerLine[0].length;
const columnHeight = pathPerLine.length;

var x = pathPerLine[0].indexOf("."); // add +1 at end
var y = 0; // add +1 at end

var direction = 0;

function determineNextField() {
    switch (direction) {
        case 0: // right
            if(x+1 < rowLength && pathPerLine[y].charAt(x+1) !== " ") {
                return {x: x+1, y:y};
            } else {
                let leftestDot = pathPerLine[y].indexOf(".");
                let leftestNumberSign = pathPerLine[y].indexOf("#");
                return {x: Math.min(leftestDot, leftestNumberSign), y:y};
            }
        case 1: // down
            if(y+1 < columnHeight && pathPerLine[y+1].charAt(x) !== " ") {
                return {x: x, y:y+1};
            } else {
                for(let i = y; i >= 0; i--) {
                    if(i === 0 || pathPerLine[i-1].charAt(x) === " ") {
                        return {x: x, y:i};
                    }
                }
            }
            break;
        case 2: // left
            if(x-1 >= 0 && pathPerLine[y].charAt(x-1) !== " ") {
                return {x: x-1, y:y};
            } else {
                let rightestDot = pathPerLine[y].lastIndexOf(".");
                let rightestNumberSign = pathPerLine[y].lastIndexOf("#");
                return {x: Math.max(rightestDot, rightestNumberSign), y:y};
            }
        case 3: // up
            if(y-1 >= 0 && pathPerLine[y-1].charAt(x) !== " ") {
                return {x: x, y:y-1};
            } else {
                for(let i = y; i < columnHeight; i++) {
                    if(i === (columnHeight-1) || pathPerLine[i+1].charAt(x) === " ") {
                        return {x: x, y:i};
                    }
                }
            }
    }
}

function doSteps(steps) {
    for (let i = 0; i < steps; i++) {
        let nextField = determineNextField();
        if(pathPerLine[nextField.y].charAt(nextField.x) === "#") {
            break;
        } else {
            x = nextField.x;
            y = nextField.y;
            console.log("moved to: " + (x+1) + " " + (y+1));
            if(pathPerLine[y].charAt(x) === " " || pathPerLine[y].charAt(x) === "#") {
                throw Error;
            }
        }
    }
}

pathInstructions.forEach(instruction => {
    console.log(instruction);
   if(instruction === "R") {
       direction++;
       if(direction === 4) {
           direction = 0;
       }
   } else if(instruction === "L") {
       direction--;
       if(direction === -1) {
           direction = 3;
       }
   } else { // Number instead
       let steps = Number(instruction);
       doSteps(steps);
   }
});

result1div.innerText = (1000 * (y+1) + 4 * (x+1) + direction);

