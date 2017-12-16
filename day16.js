// Advent of Code - Day 13
//
// Observe and record the dance of the items. There are a total of 16 items (a-p).
//
// Input:
//   a sequence of moves
//   e.g. s2,x5/15,pf/a => spin the last two items to the front,
//                         swap the items at positions 5 and 15,
//                         swap the items with values 'f' and 'a'.
// Output:
//   the final positions of all items (first after one round, then after 1b rounds)
//
// Trick:
//   the pattern repeats long before a billion moves

var readFile = require('utils-fs-read-file');
const fileName = "day16.txt";
var stream = readFile.sync(fileName, 'utf8' );
const firstValue = "abcdefghijklmnop";
var queue = firstValue;
var numLoops = 1000000000;

// function spin: move the last <size> items from the end of the queue to the front

function spin(size) {
  var part1 = queue.substr(queue.length-size);
  var part2 = queue.substr(0,queue.length-size);
  return part1.concat(part2);
}

// function exchange: swap the items at positions l1 and l2

function exchange(l1,l2) {
  if (l1 === l2) return;
  return partner(queue.charAt(l1),queue.charAt(l2));
}

// function partner: swap the items with values p1 and p2

function partner(p1,p2) {
  if (p1 === p2) return;
  var tempString = queue.replace(p1,"XX");
  tempString = tempString.replace(p2,p1);
  tempString = tempString.replace("XX",p2);
  return tempString;
}

// main

var moves = stream.split(',');
var i, cycle;
var loopSize = 0;

for (cycle=0; cycle<numLoops; cycle++) {
  for (i=0; i<moves.length; i++) {
    var thisMove = moves[i].trim();
    switch (thisMove.charAt(0)) {
      case 's':
        queue = spin(Number(thisMove.substr(1)));
        break;
      case 'x':
        var swap = thisMove.substr(1).split('/');
        queue = exchange(Number(swap[0]),Number(swap[1]));
        break;
      case 'p':
        var swap = thisMove.substr(1).split('/');
        queue = partner(swap[0],swap[1]);
        break;
      default:
        console.log("Invalid move",thisMove);
    }
  }

// print the result of the first cycle

  if (cycle === 0) console.log(queue);

// find the repetition in the cycle and advance as close to the end as possible

  if (queue === "abcdefghijklmnop" && loopSize === 0) {
    console.log("The cycle repeats at cycle",cycle);
    for (loopSize = cycle+1; cycle<numLoops; cycle+= loopSize) { } // advance to near the end
    cycle -= loopSize; // but not past it
  }
}

// print the result of the final cycle
console.log(queue);
