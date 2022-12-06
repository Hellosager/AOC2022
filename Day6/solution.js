// thanks https://stackoverflow.com/a/35469422
function hasRepeats (str) {
    return /(.).*\1/.test(str);
}

var firstMarkerIndex = 0;
var firstMessageMarkerIndex = 0;

for(let i = 0; i < input.length; i++) {
    let potentialMarker = input.slice(i, i+4);
    let potentialMessageMarker = input.slice(i, i+14);

    if(firstMarkerIndex === 0 && !hasRepeats(potentialMarker)) {
        firstMarkerIndex = i + 4;
    }

    if(firstMessageMarkerIndex === 0 && !hasRepeats(potentialMessageMarker)) {
        firstMessageMarkerIndex = i + 14;
    }

    if(firstMarkerIndex !==0 && firstMessageMarkerIndex !== 0) {
        break;
    }
}

result1div.innerText = firstMarkerIndex;
result2div.innerText = firstMessageMarkerIndex;