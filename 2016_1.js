// Advent of Code 2016 - Day 1
//
// Find the Manhattan Distance of a walk (part 1).
// Find the first location that's visited twice (part 2).
// Careful: a location is visited if the path crosses it.
// Input: a series of turns and steps (e.g. L3, R1)

// load the path

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var steps = stream.split(/,/).map(a => a.trim());

var dir = [ -1, 0 ];  // start by facing north
var loc = [ 0, 0 ];   // at the origin
var i, j, dist = 0;
var visited = [ [ loc[0], loc[1] ] ];

for (i=0; i<steps.length; i++) {
  var move = 0 + steps[i].substr(1);

  // turn

  switch (steps[i].charAt(0)) {
    case 'L':                      // left turn
      if (dir[0] === -1) {
        dir[0] = 0;                // from N to W
        dir[1] = -1;
      } else if (dir[0] === 1) {
        dir[0] = 0;                // from S to E
        dir[1] = 1;
      } else if (dir[1] === -1) {
        dir[0] = 1;                // from W to S
        dir[1] = 0;
      } else {
        dir[0] = -1                // from E to N
        dir[1] = 0;
      }
      break;
    case 'R':                      // right turn
      if (dir[0] === -1) {
        dir[0] = 0;                // from N to E
        dir[1] = 1;
      } else if (dir[0] === 1) {
        dir[0] = 0;                // from S to W
        dir[1] = -1;
      } else if (dir[1] === -1) {
        dir[0] = -1;               // from W to N
        dir[1] = 0;
      } else {
        dir[0] = 1                 // from E to S
        dir[1] = 0;
      }
      break;
    default: // always validate input and note when it's bad
      console.log("Invalid direction",steps[i]);
    }
  
  // move in the given direction by the given number of steps
  // note all locations passed through, so take it step by step

  for (j=0; j<move; j++) {
    loc[0] = loc[0] + dir[0];
    loc[1] = loc[1] + dir[1];
    visited.push([ loc[0], loc[1] ]);
  }

  // note current distance from origin

  dist = Math.abs(loc[0]) + Math.abs(loc[1]);

}

// Part 1: distance from the origin at the end

console.log("Final distance",dist);

// Part 2: look for the first recurrence of a revisited location

for (i=0; i<visited.length; i++) {
  for (j=0; j<i; j++) {
    if (visited[i][0] === visited[j][0] && visited[i][1] === visited[j][1]) {
      console.log("Visited",visited[i],"twice at distance",Math.abs(visited[i][0]) + Math.abs(visited[i][1]));
      i=visited.length; j=i;  // terminate the loop early
    }
  }
}
