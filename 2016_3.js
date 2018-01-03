// Advent of Code 2016 - Day 3
//
// Given sets of three numbers, identify possible triangles (a+b>c).
// 
// Input: lines containing three integers
// Part 1: sets are to be considered as occurring in single lines
//         (not included in this program, same comparison but for all
//          numbers on one line instead of gathering sets from 3 lines)
// Part 2: sets are to be considered in columns, where the hundreds
//         value is used to denote numbers belonging to the same set
//         (hundreds digit is not part of the number to be considered)

// load the instructions

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());

var i,j=0,k;
var n=0;
var values = [ [], [], [] ];

for (i=0; i<lines.length-1; i++) {
  var vals = lines[i].split(/\s+/).map(a => parseInt(a)); // get numbers
  for (k=0; k<3; k++) {
    values[j].push(vals[k]);
  }
  j++;

  // 3 lines gives us 3 sets of numbers to parse

  if (j===3) {
    for (k=0; k<3; k++) {
      var s0,s1,s2;
      s0 = values[0][k]; s1 = values[1][k]; s2 = values[2][k];

      // a triangle has all sets of 3 sides meet A+B > C

      if ((s0+s1 > s2) && (s0+s2 > s1) && (s1+s2 > s0)) {
        n++;
      }
    }
    values = [ [], [], [] ];
    j=0;
  }
}

// note the number of triangles

console.log(n);
