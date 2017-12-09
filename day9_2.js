// Advent of Code - Day 9
//
// Process a stream of input and provide a final tally of characters in garbage
//
// Any character immediately following ! is ignored. (do not count)
// Any input beginning with < and ending with > is ignored.
//
// Assumptions:
//   garbage is always terminated
//
// Output:
//   the total number of non-ignored characters found in garbage groups 

var inGarbage = 0; // we are not in a garbage section <>
var seenBang = 0; // the previous character is not !
var total = 0; // total score


// read and process the stream

var readFile = require('utils-fs-read-file');
var stream = readFile.sync('day9.txt', 'utf8' );

var i;
  for (i=0; i<stream.length; i++) {
    var thisChar = stream.charAt(i);

    if (seenBang > 0) {  // ignore this and the character after !
      seenBang = 0;
    } else {
      switch(thisChar) {
        case '!':
          seenBang = 1;  // ignore the next character
          break;
        case '>':
          if (inGarbage > 0) {  // terminate garbage if current state is garbage
            inGarbage = 0;
          }
          break;
        case '<':
          if (inGarbage > 0) { // if already inside garbage, count
            total++;
          }
          inGarbage = 1;  // start or continue garbage state
          break;
        default:
          if (inGarbage > 0) { // if already inside garbage, count
            total++;
          }
      }
    }
  }
  console.log("Total for stream is",total);
