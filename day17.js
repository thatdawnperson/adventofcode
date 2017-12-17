// Advent of Code - Day 17
//
// Create a spin lock on a circular buffer. At each cycle, step forward N times then
// insert the next value (0, 1, 2, etc.). Continue for the given number of insertionsi
// (2017 in the first puzzle, 50m in the second puzzle).
//
// Input:
//   N (step size)
// Output:
//   first puzzle: the value at the position after the final insertion.
//   second puzzle: the value at the position after the location of 0.
//

var buffer = [0];
const stepSize = 335;
const maxSteps = 2017;
var i;
var position = 0;

// first problem:

// build the buffer

for (i=1; i<=maxSteps; i++) {
  position = (position + stepSize) % buffer.length + 1;
  buffer.splice(position,0,i);
}

// report the value of interest

position = buffer.indexOf(maxSteps);
console.log(buffer[position+1]);

// second problem: do it without building the buffer, for a lot more steps

const newMaxSteps = 50000000;
var valueOfInterest = 1;

// track the building of the buffer only at the first position
// (the position of 0 will never move: it remains at the front)

for (i=1; i<=newMaxSteps; i++) {
  position = (position + stepSize) % i + 1;
  if (position === 1) {
    valueOfInterest = i;
    console.log(valueOfInterest);
  }
}

