const operations = input.split(/\n/);
var currentCycle = 0;
var regX = 1;

var signal = 0;
var signalOutput = "";

function checkForSignal() {
    if (currentCycle <= 220 && currentCycle % 40 === 20) {
        signal += (currentCycle * regX);
    }
}

function cycle() {
    currentCycle++;
    let crtPosition = currentCycle % 40 === 0
        ? 39
        : (currentCycle % 40)-1;
    signalOutput += (crtPosition >= regX-1 && crtPosition <= regX+1)
        ? "#"
        : " . ";
    if(currentCycle % 40 === 0) {
        signalOutput += "\n";
    }
}

operations.forEach(operation => {
    if (operation === "noop") {
        cycle();
        checkForSignal();
    } else {
        let regV = Number(operation.match(/-?\d+/)[0]);
        cycle();
        checkForSignal();
        cycle();
        checkForSignal();
        regX += regV;
        console.log(regX);
    }
});

result1div.innerText = signal;
result2div.innerText = signalOutput;