// Advent of Code - Day 11
//
// Find the shortest path to the destination based on a series of moves
// on a hex grid.
//
// Possible directions are n, ne, se, s, sw, nw,
//
// Output:
//   the greatest number of steps away from origin in the course of the walk
//
// Logic: by moving the backtrace work inside the loop processing steps, we
//  can determine the distance from the origin at every step along the path

// pathReduce1: brute force reduce the path by removing backtracks
// n/s cancel, nw/se cancel, sw/ne cancel as return values
function pathReduce1(dir1,dir2) {
  dir1 = dir1 - dir2;
  if (dir1 < 0) {
    dir2 = -dir1;
    dir1 = 0;
  } else {
    dir2 = 0;
  }
  return [dir1,dir2];
}

// pathReduce2: reduce path by consolidating diagonal directions
// sw+se becomes s, sw+n becomes nw
// nw+s becomes sw, nw+ne becomes n
// n+se becomes ne, ne+s becomes se
function pathReduce2(dir1,dir2) {
  var common = Math.min(dir1,dir2);
  var d1 = dir1 - common;
  var d2 = dir2 - common;
  return [d1,d2,common];
}

var i;
var backtrace;
var jog;
var farthest = 0;

// read and process the path
var readFile = require('utils-fs-read-file');
var path = readFile.sync('day11.txt', 'utf8' );

// gather the path into the number of steps in each direction

var n = 0, ne = 0, se = 0, s = 0, sw = 0, nw = 0;
var steps = path.split(",");
var j;

for (j=0; j<steps.length; j++) {
  switch (steps[j]) {
    case "n":
      n++;
      break;
    case "s":
      s++;
      break;
    case "nw":
      nw++;
      break;
    case "ne":
      ne++;
      break;
    case "sw":
      sw++;
      break;
    case "se":
      se++;
      break;
    default:
      console.log("Invalid direction",steps[j]);
  }

  // remove backtraced steps

  backtrace = pathReduce1(n,s);  // n/s
  n = backtrace[0]; s = backtrace[1];
  backtrace = pathReduce1(ne,sw); // ne/sw
  ne = backtrace[0]; sw = backtrace[1];  
  backtrace = pathReduce1(nw,se); // nw/se
  nw = backtrace[0]; se = backtrace[1];  

  // turn two-step jogs into single steps
 
  jog = pathReduce2(sw,se);
  sw = jog[0]; se = jog[1]; s += jog[2];
  jog = pathReduce2(sw,n);
  sw = jog[0]; n = jog[1]; nw += jog[2];
  jog = pathReduce2(nw,s);
  nw = jog[0]; s = jog[1]; sw += jog[2];
  jog = pathReduce2(nw,ne);
  nw = jog[0]; ne = jog[1]; n += jog[2];
  jog = pathReduce2(n,se);
  n = jog[0]; se = jog[1]; ne += jog[2];
  jog = pathReduce2(ne,s);
  ne = jog[0]; s = jog[1]; se += jog[2];

  // note the number of steps from the origin
  var distance = n+nw+ne+s+sw+se;
  if (distance > farthest) farthest = distance;
}

console.log("\tFinal distance from origin is",n+nw+ne+s+sw+se);
console.log("\tFarthest distance is",farthest);
