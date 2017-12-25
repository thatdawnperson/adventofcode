// Advent of Code - Day 25
//
// Run a Turing machine for a set number of steps and report the checksum.
// 

// Representation of the map that was given as input:
// current state and digit:
//    digit to write
//    direction to move (-1 for left, 1 for right)
//    new state
//    change to checksum resulting from this move

const turn = {
a0: [1, 1, 'b', 1],
a1: [0, -1, 'b', -1],
b0: [0, 1, 'c', 0],
b1: [1, -1, 'b', 0],
c0: [1, 1, 'd', 1],
c1: [0, -1, 'a', -1],
d0: [1, -1, 'e', 1],
d1: [1, -1, 'f', 0],
e0: [1, -1, 'a', 1],
e1: [0, -1, 'd', -1],
f0: [1, 1, 'a', 1],
f1: [1, -1, 'e', 0]
}
var tape = [ 0 ];
var pos = 0;
var curState = 'a';
var checkSum = 0;
const maxTurns = 12586542; // number of steps to take before reporting
var i;
var action;

for (i=0; i<maxTurns; i++) {
  action = curState + tape[pos];

  // write
  tape[pos] = turn[action][0];

  // move
  move = turn[action][1];
  if (pos+move < 0) {
    tape.unshift(0); // add to the beginning
    pos++; // don't fall off
  } else if (pos+move >= tape.length) {
    tape.push(0); // or the end
  }
  pos += move;

  // set new state
  curState = turn[action][2];

  // update the checksum
  checkSum += turn[action][3];

// watch it run
if (i%100000 === 0) console.log("at step",i);
}
console.log(checkSum);

checkSum = 0;
for (i in tape) checkSum+=tape[i];
console.log(checkSum);
