const assignments = input.split(/\n/);

var numberContaining = 0;
var overlapping = 0;

function assignmentContainsOther(assignment1, assignment2) {
    return (assignment1.start <= assignment2.start && assignment1.end >= assignment2.end)
        || (assignment2.start <= assignment1.start && assignment2.end >= assignment1.end);
}

function assignmentsOverlap(assignment1, assignment2) {

    return (assignment1.end >= assignment2.start && assignment1.end <= assignment2.end)
        || (assignment2.end >= assignment1.start && assignment2.end <= assignment1.end);
}

assignments.forEach(assignment => {
    let numbers = assignment.match(/\d+/g);
    let firstAssignment =  { start: Number(numbers[0]), end: Number(numbers[1])};
    let secondAssignment =  { start: Number(numbers[2]), end: Number(numbers[3])};

    if(assignmentContainsOther(firstAssignment, secondAssignment)) {
        numberContaining++;
    }
    if(assignmentsOverlap(firstAssignment, secondAssignment)) {
        overlapping++;
    }
});

result1div.innerText = numberContaining;
result2div.innerText = overlapping;