// const inputSplitByPackagePairs = input.split(/\n\n/);
const inputSplitByPackagePairs = demoInput.split(/\n\n/);
var packagePairs = [];
inputSplitByPackagePairs.forEach(inputPackagePair => {
   let packageLines = inputPackagePair.split(/\n/);
    packagePairs.push({leftList:eval(packageLines[0]), rightList:eval(packageLines[1])});
});

