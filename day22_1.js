// Advent of Code - Day 22
//
// Walk an infinite grid, changing the state at each position.
// Each turn ("burst of activity") in the problem statement:
//   When starting with . (clean node), turn right.
//   When starting with # (infected node), turn left.
//   Flip the state of the node, then move one step in the direction the carrier is facing.
//
// Input:
//   a square grid containing all currently infected nodes, e.g.
//     ..#
//     #..
//     ...
//   the carrier starts in the centre, facing "up"
//
// Output:
//   the number of infections that were caused in 10000 turns
//   
//

var line = [];
var hPos, vPos, hDir, vDir;
var infected = 0;
var cleaned = 0;
var i,j;
const maxBursts = 10000;
const unclean = '#';
const clean = '.';

// function changeBit: change the specific character in a string to the given value
// returns the new string

function changeBit(oldString,pos,newVal) {
  if (pos < oldString.length) {
    return oldString.substring(0,pos) + newVal + oldString.substring(pos+1);
  } else {
    return oldString.substring(0,pos-1) + newVal;
  }
}

// function expandGrid: add one layer around the entire grid
// returns the new grid

function expandGrid(grid) {
  var insert = clean.repeat(grid[0].length); // new line is all clean
  grid.push(insert); // add to end
  grid.splice(0,0,insert); // add to beginning
  for (j=0; j<grid.length; j++) {
    grid[j] = "." + grid[j] + "."; // add space at either end of every line
  }
  return grid;
}

// read the map

var readFile = require('utils-fs-read-file');
const fileName = "day22.txt";
var stream = readFile.sync(fileName, 'utf8');
line = stream.split("\n");
line.pop(); // remove the empty line at the end
console.log(line);

// find the starting location (centre of the current grid)

hPos = (line.length-1)/2;
vPos = (line[hPos].length-1)/2;
hDir = -1; // going up (-1) not down (1)
vDir = 0; // going neither left (-1) nor right (1)

// note current state, turn, change state, move

for (i=0; i<maxBursts; i++) {
  var curLine = line[hPos];
  switch (curLine.charAt(vPos)) {
    case clean:  // landed on a clean node: left turn, infect

      // turn left
      if (hDir < 0) {
        hDir = 0; vDir = -1;
      } else if (hDir > 0) {
        hDir = 0; vDir = 1;
      } else if (vDir < 0) {
        vDir = 0; hDir = 1;
      } else {
        vDir = 0; hDir = -1;
      }

      // infect the node
      line[hPos] = changeBit(curLine,vPos,unclean);
      infected++;
      break;

    case unclean:  // landed on an infected node: right turn, clean

      // turn right
      if (hDir < 0) {
        hDir = 0; vDir = 1;
      } else if (hDir > 0) {
        hDir = 0; vDir = -1;
      } else if (vDir < 0) {
        vDir = 0; hDir = -1;
      } else {
        vDir = 0; hDir = 1;
      }

      // clean the node
      line[hPos] = changeBit(curLine,vPos,clean);
      cleaned++;
      break;

  }

  // move to new position

  hPos += hDir;
  vPos += vDir;

  // expand the grid if we're about to fall off

  if (hPos < 0 || vPos < 0 || hPos >= line.length || vPos >= line.length ) {
    line = expandGrid(line);
    hPos++;
    vPos++;
  }
}

console.log(line);
console.log("Total nodes cleaned:",cleaned);
console.log("Total nodes infected:",infected);
