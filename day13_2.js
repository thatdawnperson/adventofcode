// Advent of Code - Day 13
//
// Walk through the firewall without getting caught
//
// Input:
//   scanner locations and sizes
// Output:
//   the number of steps needed to delay before traversal without collision

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

// places with depth > 0

line = stream.split("\n");
for (j=0; j<line.length; j++) {
  var lineItems = line[j].split(" ");
  if (line[j].length < 4) break; // don't kack on an empty line
  i = Number(lineItems[0].replace(':',''));
  grid[i] = Number(lineItems[1]);
};

// fill in places with depth = 0

for (i=0; i<grid.length; i++) {
  if (grid[i] === undefined) {
    grid[i] = 0;
  }
}
// note the locations of scanners

  for (i=0; i<grid.length; i++) {
    if (grid[i] === 0) {
      scanner[i] = 0;
    } else {
      scanner[i] = 1;
    }
  }

// keep trying the trip until we get 0 cost

for (delay=0; success === 0; delay++) {
  tripCost = 0;

  // move through the grid one step at a time to the end
  // check for presence of scanner (at t=0 and t=(S-1)*2)
  // NOTE: this is a change from previous solution due to the computational
  // expense of calculating all scanner locations at every step
  
  for (i=0; i<grid.length; i++) {
    // if the current position has a scanner, note any collision
    if (scanner[i] === 1) {
      var position = (i+delay)%((grid[i]-1)*2);
      if (position === 0) {
        tripCost += i*grid[i];
        if (tripCost === 0) tripCost = -1; // catch failure at first location
        break; // don't continue the trip if there has been a collision
      }
    }
  }

  if (tripCost === 0) {
    success = 1;
    console.log("Successful trip delayed by",delay);
  }
}
