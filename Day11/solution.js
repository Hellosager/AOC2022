const inputPerMonkey = input.split("\n\n");
// const inputPerMonkey = demoInput.split("\n\n");

var monkeys = [];
var monkeys2 = [];

class Monkey {
    inspectTimes = 0;

    constructor(itemWorryLevels, operationMethod, operationNumber, divisibleBy, monkeyIfTrue, monkeyIfFalse) {
        this.itemWorryLevels = itemWorryLevels;
        this.operationMethod = operationMethod;
        this.operationNumber = operationNumber;
        this.divisibleBy = divisibleBy;
        this.monkeyIfTrue = monkeyIfTrue;
        this.monkeyIfFalse = monkeyIfFalse;
    }

    play(divByThree) {
        for (let item = 0; item < this.itemWorryLevels.length; item++) {
            let itemWorryLevel = divByThree ? this.itemWorryLevels[item] : this.itemWorryLevels[item] % modulo;
            let newItemWorryLevel = this.inspectItem(itemWorryLevel, divByThree);

            let newMonkey = this.test(newItemWorryLevel)
                ? monkeys[this.monkeyIfTrue]
                : monkeys[this.monkeyIfFalse];

            newMonkey.itemWorryLevels.push(newItemWorryLevel);
        }
        this.itemWorryLevels = [];
    }

    inspectItem(itemWorryLevel, divByThree) {
        this.inspectTimes++;
        let operationNumber = this.operationNumber === "old"
            ? itemWorryLevel
            : this.operationNumber;
        if (this.operationMethod === "*") {
            return divByThree
                ? Math.floor((itemWorryLevel * operationNumber) / 3)
                : itemWorryLevel * operationNumber;
        } else if (this.operationMethod === "+") {
            return divByThree
                ? Math.floor((itemWorryLevel + operationNumber) / 3)
                : itemWorryLevel + operationNumber;
        }
    }

    test(itemWorryLevel) {
        return itemWorryLevel % this.divisibleBy === 0;
    }
}

inputPerMonkey.forEach(monkeyInput => {
    let monkeyLines = monkeyInput.split(/\n/);
    let itemWorryLevels = [];
    monkeyLines[1].match(/\d+/g).forEach(number => itemWorryLevels.push(Number(number)));

    let operationMethod = monkeyLines[2].match(/\*|\+/)[0];
    var operationNumber = monkeyLines[2].match(/\d+/);
    operationNumber = operationNumber ? Number(operationNumber[0]) : "old";
    let divisibleBy = Number(monkeyLines[3].match(/\d+/)[0]);
    let monkeyIfTrue = Number(monkeyLines[4].match(/\d+/));
    let monkeyIfFalse = Number(monkeyLines[5].match(/\d+/));
    monkeys.push(new Monkey(itemWorryLevels, operationMethod, operationNumber, divisibleBy, monkeyIfTrue, monkeyIfFalse));
    monkeys2.push(new Monkey(itemWorryLevels, operationMethod, operationNumber, divisibleBy, monkeyIfTrue, monkeyIfFalse));
});

// part 1
for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => monkey.play(true));
}
let copyMonkeys = Array.from(monkeys);
copyMonkeys.sort((monkey1, monkey2) => monkey2.inspectTimes - monkey1.inspectTimes);
result1div.innerText = (copyMonkeys[0].inspectTimes * copyMonkeys[1].inspectTimes);



// part 2
class Monkey2 {
    inspectTimes = 0;

    constructor(monkeyNumber, itemWorryLevels, operationMethod, operationNumber, divisibleBy, monkeyIfTrue, monkeyIfFalse) {
        this.monkeyNumber = monkeyNumber;
        this.itemWorryLevels = itemWorryLevels;
        this.operationMethod = operationMethod;
        this.operationNumber = operationNumber;
        this.divisibleBy = divisibleBy;
        this.monkeyIfTrue = monkeyIfTrue;
        this.monkeyIfFalse = monkeyIfFalse;
    }

    play(divByThree) {
        for (let item = 0; item < this.itemWorryLevels.length; item++) {
            let itemWorryLevel = this.itemWorryLevels[item];
            let newItemWorryLevel = this.inspectItem(itemWorryLevel % modulo, divByThree).valueOf();

            let newMonkeyNumber = this.test(newItemWorryLevel)
                ? this.monkeyIfTrue
                : this.monkeyIfFalse;

            monkeys2[newMonkeyNumber].itemWorryLevels.push(newItemWorryLevel);
        }
        this.itemWorryLevels = [];
    }

    inspectItem(itemWorryLevel) {
        this.inspectTimes++;
        let operationNumber = this.operationNumber === "old"
            ? itemWorryLevel
            : this.operationNumber;
        if (this.operationMethod === "*") {
            return (itemWorryLevel) * (operationNumber)
        } else if (this.operationMethod === "+") {
            return (itemWorryLevel) + (operationNumber);
        }
    }

    test(itemWorryLevel) {
        return itemWorryLevel % this.divisibleBy === 0;
    }
}

monkeys2 = [];


inputPerMonkey.forEach(monkeyInput => {
    let monkeyLines = monkeyInput.split(/\n/);
    let itemWorryLevels = [];
    monkeyLines[1].match(/\d+/g).forEach(number => itemWorryLevels.push(Number(number)));

    let operationMethod = monkeyLines[2].match(/\*|\+/)[0];
    var operationNumber = monkeyLines[2].match(/\d+/);
    operationNumber = operationNumber ? Number(operationNumber[0]) : "old";
    let divisibleBy = Number(monkeyLines[3].match(/\d+/)[0]);
    let monkeyIfTrue = Number(monkeyLines[4].match(/\d+/));
    let monkeyIfFalse = Number(monkeyLines[5].match(/\d+/));
    monkeys2.push(new Monkey2(monkeys2.length, itemWorryLevels, operationMethod, operationNumber, divisibleBy, monkeyIfTrue, monkeyIfFalse));
});

var modulo = 1;
monkeys2.forEach(monkey => modulo *= monkey.divisibleBy);

for (let round = 0; round < 10000; round++) {
    monkeys2.forEach(monkey => monkey.play(false));
}

let copyMonkeys2 = Array.from(monkeys2);
copyMonkeys2.sort((monkey1, monkey2) => monkey2.inspectTimes - monkey1.inspectTimes);
result2div.innerText = (copyMonkeys2[0].inspectTimes * copyMonkeys2[1].inspectTimes);