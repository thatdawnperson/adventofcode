// Advent of Code - Day 24
//
// Given a collection of dominoes, build a list starting with a 0 size of one piece.
// The list can be of any length.
// Output: the sum of all pips in the list that has the most pips.

var i, j, maximum = 0;
var set = [];
var inUse = [];
var value = [];
var totalWeight = 0;
var totalLength = 0;
var curVal = 0;
var longest = 0;
var heaviest = 0;

// function recurseThis: find the path to the next item until we can't go any farther
// for each domino with one side having the value thisVal
//   if it's not already in the path
//    mark it as used
//     find the other side's value
//     update the length and value of the current chain, noting any local maxima
//     rinse, repeat
//    clean up after self by marking the domino as unused

function recurseThis(thisVal,thisWeight,thisLength) {
  var i;

  for (i=0; i<set[thisVal].length; i++) {	// for all dominoes having one side with this length
    var domiNum = set[thisVal][i];		// get the index into the domino set
    if (inUse[domiNum] === 0) {			// continue if it's not already in the current path ...
      inUse[domiNum]++;					// mark this domino as used
      nextWeight = thisWeight + value[domiNum];		// update path weight
      nextLength = thisLength + 1;			// update path length
      if (nextWeight > heaviest) {			// note overweight
        heaviest = nextWeight;
        console.log("Heaviest",heaviest,"at",nextLength);
      }
      if (nextLength > longest) {			// note overlength
        longest = nextLength;
        console.log("Longest",longest,"with weight",nextWeight);
      }
      if (domino[domiNum][0] === thisVal) {		// note the next value of interest
        nextVal = domino[domiNum][1];
      } else {
        nextVal = domino[domiNum][0];
      }
      recurseThis(nextVal,nextWeight,nextLength);	// find all paths that connect thence
      inUse[domiNum] = 0;				// cleanup: mark current domino as not in use
    }
  }
}

// load the dominoes

var readFile = require('utils-fs-read-file');
const fileName = "day24.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());
var domino = [];
for (i=0; i<lines.length; i++) {
  domino[i] = lines[i].split('\/');
  domino[i][0] = Number(domino[i][0]);
  domino[i][1] = Number(domino[i][1]);
  if (set[domino[i][0]])
    set[domino[i][0]].push(i);
  else
    set[domino[i][0]] = [i];
  if (set[domino[i][1]])
    set[domino[i][1]].push(i);
  else
    set[domino[i][1]] = [i];
  inUse[i] = 0;
  value[i] = domino[i][0] + domino[i][1];
}

// now we have the domino[][] array indexed by sequence, containing values
// and the set[] array indexed by value, containing indexes into domino[]

// starting at the '0' value, for each domino with one side having that value
//   find all the paths and take notes

recurseThis(curVal,totalWeight,totalLength);
