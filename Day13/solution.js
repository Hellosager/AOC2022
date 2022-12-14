// const inputSplitByPackagePairs = input.split(/\n\n/);
const inputSplitByPackagePairs = demoInput.split(/\n\n/);
var packagePairs = [];
inputSplitByPackagePairs.forEach(inputPackagePair => {
    let packageLines = inputPackagePair.split(/\n/);
    packagePairs.push({leftList: eval(packageLines[0]), rightList: eval(packageLines[1])});
});

var sumOfIndices = 0;

function isOrdered(leftValue, rightValue) {
    // console.log("left: " + leftValue + ", right: " + rightValue);

    // one of them is integer, try again as list
    if (Number.isInteger(leftValue) && !Number.isInteger(rightValue)) {
        return isOrdered([leftValue], rightValue);
    } else if (!Number.isInteger(leftValue) && Number.isInteger(rightValue)) {
        return isOrdered(leftValue, [rightValue]);
    }

    // both are integers, compare them
    if (Number.isInteger(leftValue) && Number.isInteger(rightValue)) {
        return leftValue <= rightValue;
    }


    // if(leftValue.length > rightValue.length) {
    //     return false;
    // } else if(leftValue.length === 0) {
    //     return true;
    // }

    // both are lists, compare each value of left with right
    // var ordered = true;
    for (let i = 0; i < (Math.max(leftValue.length, rightValue.length)); i++) {
        if(leftValue[i] === undefined && rightValue[i] !== undefined) { // left ran out first
            return true;
        } else if (leftValue[i] !== undefined && rightValue[i] === undefined) { // right ran out first
            return false;
        }

        if(leftValue[i] === rightValue[i]) {

        } else {
            // if (!isOrdered(leftValue[i], rightValue[i])) {
                return isOrdered(leftValue[i], rightValue[i]);
            // }
        }

    }

    return true;
}

for (let i = 0; i < packagePairs.length; i++) {
    {
        console.log("Checking pair " + (i+1));
        if (isOrdered(packagePairs[i].leftList, packagePairs[i].rightList)) {
            console.log("pair " + (i+1) + " is ordered.");
            sumOfIndices += i+1;
        }
    }

}

result1div.innerText = sumOfIndices;
// 5546 is too high