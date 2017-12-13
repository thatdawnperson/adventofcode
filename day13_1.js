// Advent of Code - Day 13
//
// Walk through the firewall and note how badly burned we get
//
// Input:
//   scanner locations and sizes
// Output:
//   cost of traversal (based on collisions)

var readFile = require('utils-fs-read-file');
const fileName = "day13.txt";
var stream = readFile.sync(fileName, 'utf8' );
var line;
var i,j;
var grid = [];
var scanner = [];
var dir = [];
var tripCost = 0;
var success = 0;
var delay;

// main

// build the grid

// input: places with scanner depth > 0

line = stream.split("\n");
for (j=0; j<line.length; j++) {
  var lineItems = line[j].split(" ");
  if (line[j].length < 4) break; // don't kack on an empty line
  i = Number(lineItems[0].replace(':',''));
  grid[i] = Number(lineItems[1]);
};

// fill in places with no scanner (depth = 0)

for (i=0; i<grid.length; i++) {
  if (grid[i] === undefined) {
    grid[i] = 0;
  }
}

// place scanners at top ready to move down

for (i=0; i<grid.length; i++) {
  if (grid[i] === 0) {
    scanner[i] = -1;
  } else {
    scanner[i] = 0;
    dir[i] = 1;
  }
}

// move through the grid one step at a time to the end
// record position, then advance scanner
  
var layer = 0; // travelling on the top layer of the grid
  
for (i=0; i<grid.length; i++) {

  // if the current position has a scanner, note any collision

  if (scanner[i] === layer) {
    var cost = i*grid[i];
    tripCost += cost;
  }

 // advance the scanner for all locations in the grid

  for (j=0; j<grid.length; j++) {
    if (grid[j] > 0) {
      if (scanner[j] >= grid[j]-1) {
        dir[j] = -1;
      }
      if (scanner[j] <= 0) {
        dir[j] = 1;
      }
      scanner[j] += dir[j];
    }
  }
}
console.log("Total cost of trip:",tripCost);
