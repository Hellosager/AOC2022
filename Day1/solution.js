var inputStringByElf = input.split(/\n\n/);
var totals = [];

inputStringByElf.forEach(inputStringForElf => {
   let numbersForElf = inputStringForElf.match(/\d+/g);
   let sum = numbersForElf.reduce((a, b) => Number(a) + Number(b), 0);
   totals.push(sum);
});

totals = totals.sort(function (a, b) {
    return a - b;
});

result1div.innerText = totals[totals.length-1];
result2div.innerText = totals[totals.length-3] + totals[totals.length-2] + totals[totals.length-1];