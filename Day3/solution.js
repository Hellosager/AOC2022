let rucksackContents = input.split(/\n/);

function getPointsForCharacter(character) {
    let charCode = character.charCodeAt(0);
    if(charCode >= 97 && charCode <= 122 ) { // a - z
        return charCode - 96;
    } else {
        return charCode - 38; // A - Z
    }
}

var totalScore = 0;

rucksackContents.forEach(rucksackContent => {
   let compartment1 = rucksackContent.slice(0, rucksackContent.length / 2);
   let compartment2 = rucksackContent.slice(compartment1.length, rucksackContent.length);

    var imposterCharacter;

    for (let i = 0; i < compartment1.length; i++) {
        if(compartment2.includes(compartment1[i])) {
            imposterCharacter = compartment1[i];
            break;
        }
    }

    totalScore += getPointsForCharacter(imposterCharacter);
});

result1div.innerText = totalScore;

// Part 2

function getBiggestRucksack(r1, r2, r3) {
    let maxSize = Math.max(r1.length, r2.length, r3.length);
    return [r1, r2, r3].find(r => r.length === maxSize);
}

var totalBadgeScore = 0;

for (let i  = 0; i < rucksackContents.length; i+=3) {
    let biggestRucksack = getBiggestRucksack(rucksackContents[i], rucksackContents[i+1], rucksackContents[i+2]);

    var badge;

    for (let j = 0; j < biggestRucksack.length; j++) {
        if(rucksackContents[i].includes(biggestRucksack[j])
            && rucksackContents[i+1].includes(biggestRucksack[j])
            && rucksackContents[i+2].includes(biggestRucksack[j])) {
            badge = biggestRucksack[j];
            break;
        }
    }

    totalBadgeScore += getPointsForCharacter(badge);
}

result2div.innerText = totalBadgeScore;