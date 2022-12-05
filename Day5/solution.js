const inputSplitByLine = input.split(/\n/).filter(line => line !== "");
var crateStacks9000 = [[],[],[],[],[],[],[],[],[]];
var crateStacks9001 = [[],[],[],[],[],[],[],[],[]];

let stackInitialized = false;

function crateMover9000Move (line) {
    let numbers = line.match(/\d+/g);
    for(let crate = 0; crate < Number(numbers[0]); crate++) {
        let movingCrate = crateStacks9000[Number(numbers[1]-1)].pop();
        crateStacks9000[Number(numbers[2]-1)].push(movingCrate);
    }
}

function crateMover9001Move (line) {
    let numbers = line.match(/\d+/g);
    let quantity = Number(numbers[0]);
    let fromStack = Number(numbers[1])-1;
    let toStack = Number(numbers[2])-1;

    let movingCrates = crateStacks9001[fromStack].slice(-quantity);
    crateStacks9001[fromStack] = crateStacks9001[fromStack].slice(0, -quantity);
    crateStacks9001[toStack] = crateStacks9001[toStack].concat(movingCrates);
}

inputSplitByLine.forEach(line => {
    if(!stackInitialized && /\d/.test(line)) {
        stackInitialized = true;
        crateStacks9000.forEach(stack => {
            stack.reverse();
        });
        crateStacks9001.forEach(stack => {
            stack.reverse();
        });
    }
    if(!stackInitialized) {
        for(let stack = 0; stack < crateStacks9000.length; stack++) {
            let stackCharacter = line.charAt(1+(stack*4))
            if(/\w/.test(stackCharacter)) {
                crateStacks9000[stack].push(stackCharacter);
                crateStacks9001[stack].push(stackCharacter);
            }
        }
    } else if(!/move/.test(line)) {
        // skip stack index line and empty line
    } else { // moving
        crateMover9000Move(line);
        crateMover9001Move(line);
    }
});

var topCrates9000 = "";
for(let stack = 0; stack < crateStacks9000.length; stack++) {
    topCrates9000 += crateStacks9000[stack][crateStacks9000[stack].length-1];
}
result1div.innerText = topCrates9000;

var topCrates9001 = "";
for(let stack = 0; stack < crateStacks9001.length; stack++) {
    topCrates9001 += crateStacks9001[stack][crateStacks9001[stack].length-1];
}

result2div.innerText = topCrates9001;