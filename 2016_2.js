// Advent of Code 2016 - Day 2
//
// Walk a 3x3 grid without falling off the edge.
// Report on the final location for each line of directions.
// 
// Input: a series of directions (UDLR)    

// load the instructions

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var steps = stream.split(/\n/).map(a => a.trim());

// the original grid and starting location from Part 1:
// const grid = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
// var loc = [ 1, 1 ];
// const gridSize = 3;

// the new grid and starting location from Part 2:
const grid = [ 
[ 'x', 'x', '1', 'x', 'x' ], 
[ 'x', '2', '3', '4', 'x' ], 
[ '5', '6', '7', '8', '9' ], 
[ 'x', 'A', 'B', 'C', 'x' ], 
[ 'x', 'x', 'D', 'x', 'x' ] 
             ];
var loc = [ 2, 0 ];
const gridSize = 5;

var i,j;

for (i=0; i<steps.length-1; i++) {
  for (j=0; j<steps[i].length; j++) {

  // move one step in the given direction unless already at the edge
  //
  // due to the grid being irregular in Part 2, check for an invalid
  // character at the grid location to identify edges

  switch (steps[i].charAt(j)) {
    case 'U':
      loc[0]--;
      if ( loc[0] < 0 ) loc[0]++;
      if ( grid[loc[0]][loc[1]] === 'x' ) loc[0]++;
      break;
    case 'D':
      loc[0]++;
      if (loc[0] > gridSize-1) loc[0]--;
      if ( grid[loc[0]][loc[1]] === 'x' ) loc[0]--;
      break;
    case 'L':
      loc[1]--;
      if (loc[1] < 0) loc[1]++;
      if ( grid[loc[0]][loc[1]] === 'x' ) loc[1]++;
      break;
    case 'R':
      loc[1]++;
      if (loc[1] > gridSize-1) loc[1]--;
      if ( grid[loc[0]][loc[1]] === 'x' ) loc[1]--;
      break;
    default:
      console.log("Invalid direction",steps[i].charAt(j));
    }
  }
  
  // at the end of the line: note current location and continue

  console.log(grid[loc[0]][loc[1]]);

}
