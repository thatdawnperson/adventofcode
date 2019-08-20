// Advent of Code 2016 - Day 8
//
// Find the pixels on a display
// 
// Input: a series of instructions to turn on and move pixels
//
//    rect AxB: turn on all pixels in top left rectangle: A cols/B rows
//    rotate row y=A by B: shift all pixels in row A right by B
//    rotate column x=A by B: shift all pixels in column A down by B
//    shifting will wrap around the row or column
//
// Part 1: Count the number of pixels turned on at the end of the move set.
// Part 2: Manually read the grid to identify the characters. Not coding this.

// initialize the grid

var grid = [
'..................................................',
'..................................................',
'..................................................',
'..................................................',
'..................................................',
'..................................................'
];

// load the instructions

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());
var i, j, rows, cols;
const gridCols = 50;
const gridRows = 6;

// process all instructions in the order they occur

for (i=0; i<lines.length; i++) {
  switch (lines[i].substr(0,4)) {

    // new rectangle

    case 'rect':
      var rect = lines[i].match(/\d+/g);
      cols = rect[0] * 1;
      var tempStr = '#';
      tempStr = tempStr.repeat(cols);
      rows = rect[1] * 1;
      for (j=0; j<rows; j++) {
        var newLine = tempStr + grid[j].substr(cols);
        grid[j] = newLine;
      }
      break;

    // rotation

    case 'rota':
      var rect = lines[i].match(/\d+/g);
      switch(lines[i].substr(7,3)) {

        // move a row along (single string), with wraparound

        case 'row':
          rows = rect[0] * 1;
          cols = rect[1] * 1;
          var tempStr = grid[rows].substr(gridCols-cols) + grid[rows].substr(0,gridCols-cols);
          grid[rows] = tempStr;
          break;

        // move a column along (same position in all strings), with wraparound

        case 'col':
          rows = rect[1] * 1;
          cols = rect[0] * 1;
          var toReplace = [];
          for (j=0; j<gridRows; j++) {
            toReplace[(j+rows)%gridRows] = grid[j].charAt(cols);
          }
          for (j=0; j<gridRows; j++) {
            var tempStr = grid[j].substr(0,cols) + toReplace[j] + grid[j].substr(cols+1);
            grid[j] = tempStr;
          }
          break;
        default:
          console.log("Invalid instruction",lines[i]);
      }
      break;
    default:
      console.log("Invalid instruction",lines[i],"at",i);
  }
}

// all instructions have been processed: print the final bit count for Part 1

// print the grid for Part 2

var bitCount = 0;
for (i=0; i<gridRows; i++) {
  for (j=0; j<gridCols; j++) {
    if (grid[i].charAt(j) === '#') {
      bitCount++;
    }
  }
}
console.log(bitCount);

// print the grid for Part 2

console.log(grid);
