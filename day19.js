// Advent of Code - Day 19
//
// Walk along a twisty maze, collectiing letters
//
// Input:
//   a path with one route from start to end, e.g.
//      |          
//      |  +--+    
//      A  |  C    
//  F---|----E|--+ 
//      |  |  |  D 
//      +B-+  +--+ 
//
// Output:
//   the letters that were seen along the way, e.g. ABCDEF
//   the length of the path walked
//
// Assumption:
//   direction changes only occur at a '+'


var line = [];
var hPos, vPos, hDir, vDir;
var letters = "";
var path = [];
var tripLength = 0;
var done = false;

// main

// read the map

var readFile = require('utils-fs-read-file');
const fileName = "day19.txt";
var stream = readFile.sync(fileName, 'utf8');
line = stream.split("\n");

// find the starting location (assume it is on the top line)

hPos = 0;
vPos = line[hPos].indexOf("|");
if (hPos < 0) console.log("Cannot find the start.");
hDir = 1; // going down (1) not up (-1)
vDir = 0; // neither left (-1) nor right (1)

// move, record, check direction

while (!done) {
  hPos += hDir; // move horizontally if required
  vPos += vDir; // move vertically if required
  tripLength++;
  var curLine = line[hPos];
  switch (curLine.charAt(vPos)) {
    case "|":
      // nothing to do, we're following the path even if it looks like a crossing
      break;
    case "-":
      // nothing to do, we're following the path even if it looks like a crossing
      break;
    case "+": // change direction: assume it's always a 90 degree turn
      if (hDir != 0) {
        hDir = 0;
        if (curLine.charAt(vPos-1) != " ") { // path goes left now
          vDir = -1;
        } else {
          vDir = 1; // or right
        }
      } else {
        vDir = 0;
        curLine = line[hPos-1]; // look up
        if (curLine.charAt(vPos) != " ") { // path goes up now
          hDir = -1;
        } else {
          hDir = 1; // or down
        }
      }
      break;
    case " ": // end of the path
      done = true;
      break;
    default: // record a letter
      letters = letters.concat(curLine.charAt(vPos));
      break;
  }
}

console.log("Total length of trip:",tripLength);
console.log("Letters we saw along the way",letters);
