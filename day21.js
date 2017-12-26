// Advent of Code - Day 21
//
// Pattern detection and replacement
//
// Begin with a set of rules (your input) that turn 2x2 grids into trigrams and 
// trigrams into 4x4 grids. # represents "on" and . represents "off".
//
// Each turn, break the grid into 2x2 or 3x3 sub-parts and convert each square.
// If the grid size is even, use the 2x2 rules.
// 2x2 rules turn a section into 3x3.
// 3x3 rules turn a section into 4x4.
// An input pattern may need to be rotated or flipped to match a rule.
// The output pattern for a rule is NOT flipped, regardless of whether the input was.
//
// The starting grid is always the 3x3 pattern .#./..#/###
//
// Output:
//   the number of "on" bits after 5 iterations
//   the number of "on" bits after 18 iterations

var i, j, loop;
var grid = [];
var m = [];
var result = [];

// function findMatch: find the rule that matches the input (any rotation or reflection)
// return the rule number
// using separate functions for a 2x2 and a 3x3 grid input to handle the rotations

function findMatch2(i) {
  var n;
  for (n=0; n<6; n++) {
 // direct match
    if (m[n][0] === i[0] && m[n][1] === i[1]) return n;
 // flip along vertical
    if (m[n][1] === i[0] && m[n][0] === i[1]) return n;
 // flip along horizontal
    if (m[n][0].charAt(0) === i[0].charAt(1) && m[n][0].charAt(1) === i[0].charAt(0) &&
        m[n][1].charAt(0) === i[1].charAt(1) && m[n][1].charAt(1) === i[1].charAt(0)) return n;
 // rotate left
    if (m[n][0].charAt(0) === i[1].charAt(0) && m[n][0].charAt(1) === i[0].charAt(0) &&
        m[n][1].charAt(0) === i[1].charAt(1) && m[n][1].charAt(1) === i[0].charAt(1)) return n;
 // rotate 180 degrees
    if (m[n][0].charAt(0) === i[1].charAt(1) && m[n][0].charAt(1) === i[1].charAt(0) &&
        m[n][1].charAt(0) === i[0].charAt(1) && m[n][1].charAt(1) === i[0].charAt(0)) return n;
 // rotate right
    if (m[n][0].charAt(0) === i[0].charAt(1) && m[n][0].charAt(1) === i[1].charAt(1) &&
        m[n][1].charAt(0) === i[0].charAt(0) && m[n][1].charAt(1) === i[1].charAt(0)) return n;
  }
console.log("Could not find a match for",i);
}

function findMatch3(i) {
  var n;
  for (n=6; n<m.length; n++) {
    if (m[n][1].charAt(1) === i[1].charAt(1)) { // all transformations keep the middle
    // direct match
    if (m[n][0] === i[0] && m[n][1] === i[1] && m[n][2] === i[2]) return n;
    // flip along vertical
    if (m[n][2] === i[0] && m[n][1] === i[1] && m[n][0] === i[2]) return n;
    // flip along horizontal
    if (m[n][0].charAt(0) === i[0].charAt(2) && m[n][0].charAt(1) === i[0].charAt(1) && m[n][0].charAt(2) === i[0].charAt(0) &&
        m[n][1].charAt(0) === i[1].charAt(2) && m[n][1].charAt(2) === i[1].charAt(0) &&
        m[n][2].charAt(0) === i[2].charAt(2) && m[n][2].charAt(1) === i[2].charAt(1) && m[n][2].charAt(2) === i[2].charAt(0)) return n;
    // rotate left
    if (m[n][0].charAt(0) === i[2].charAt(2) && m[n][0].charAt(1) === i[1].charAt(2) && m[n][0].charAt(2) === i[0].charAt(2) &&
        m[n][1].charAt(0) === i[2].charAt(1) && m[n][1].charAt(2) === i[0].charAt(1) &&
        m[n][2].charAt(0) === i[2].charAt(0) && m[n][2].charAt(1) === i[1].charAt(0) && m[n][2].charAt(2) === i[0].charAt(0)) return n;
    // rotate 180 degrees
    if (m[n][0].charAt(0) === i[2].charAt(2) && m[n][0].charAt(1) === i[2].charAt(1) && m[n][0].charAt(2) === i[2].charAt(0) &&
        m[n][1].charAt(0) === i[1].charAt(2) && m[n][1].charAt(2) === i[1].charAt(0) &&
        m[n][2].charAt(0) === i[0].charAt(2) && m[n][2].charAt(1) === i[0].charAt(1) && m[n][2].charAt(2) === i[0].charAt(0)) return n;
    // rotate right
    if (m[n][0].charAt(0) === i[0].charAt(2) && m[n][0].charAt(1) === i[1].charAt(2) && m[n][0].charAt(2) === i[2].charAt(2) &&
        m[n][1].charAt(0) === i[0].charAt(1) && m[n][1].charAt(2) === i[2].charAt(1) &&
        m[n][2].charAt(0) === i[0].charAt(0) && m[n][2].charAt(1) === i[1].charAt(0) && m[n][2].charAt(2) === i[2].charAt(0)) return n;
    }
  }
  console.log("FAILURE: did not match",i);
}

// read the rules

var readFile = require('utils-fs-read-file');
const fileName = "day21.txt";
var stream = readFile.sync(fileName, 'utf8');
line = stream.split("\n");

for (i=0; i<line.length-1; i++) {
  var rule = line[i].trim().split(" => ");
  m[i] = rule[0].split('/');
  result[i] = rule[1].split('/');
}

var input = [ '.#.', '..#', '###' ]; // always start with this pattern
var output = [];
var inSize;

for (loop=0; loop<18; loop++) {

  // break the current grid into 2x2 or 3x3 sections and operate on each section

  inSize = input.length;
  if (inSize%2 === 0) { // 2x2 sections
    output = [];
    for (i=0; i<inSize; i+=2) {  // next line of 2x2 grids
      var intermediate = [];
      for (j=0; j<inSize; j+=2) { // next 2x2 grid in this pair of lines
        grid = [];
        grid.push(input[i].substr(j,2));
        grid.push(input[i+1].substr(j,2));
        intermediate.push(findMatch2(grid));  // get the matching output for this grid
      }
      j=0;
      output[i/2*3] = result[intermediate[j]][0];  // construct 3 lines from the result
      output[i/2*3+1] = result[intermediate[j]][1];
      output[i/2*3+2] = result[intermediate[j]][2];
      for (j=1; j<intermediate.length; j++) {
        output[i/2*3] += result[intermediate[j]][0];
        output[i/2*3+1] += result[intermediate[j]][1];
        output[i/2*3+2] += result[intermediate[j]][2];
      }
    }
    input = [];
    input = output;
  } else { // 3x3 sections
    output = [];
    for (i=0; i<inSize; i+=3) { // next line of 3x3 grids
      var intermediate = [];
      for (j=0; j<inSize; j+=3) { // next 3x3 grid in this triplet of lines
        grid = [];
        grid.push(input[i].substr(j,3));
        grid.push(input[i+1].substr(j,3));
        grid.push(input[i+2].substr(j,3));
        intermediate.push(findMatch3(grid));  // get the matching output for this grid
      }
      j=0;
      output[i/3*4] = result[intermediate[j]][0];  // construct 4 lines from the result
      output[i/3*4+1] = result[intermediate[j]][1];
      output[i/3*4+2] = result[intermediate[j]][2];
      output[i/3*4+3] = result[intermediate[j]][3];
      for (j=1; j<intermediate.length; j++) {
        output[i/3*4] += result[intermediate[j]][0];
        output[i/3*4+1] += result[intermediate[j]][1];
        output[i/3*4+2] += result[intermediate[j]][2];
        output[i/3*4+3] += result[intermediate[j]][3];
      }
    }
    input = [];
    input = output;
    }

// display the result
  var charCount = 0;
  for (i=0; i<input.length; i++) {
    charCount += input[i].replace(/\./g,"").length;
  }
console.log("Round",loop,"result has",charCount,"bits turned on");
}
