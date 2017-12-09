// Advent of Code - Day 9
//
// Process a stream of input and provide a final tally of groups found in the file.
//
// Any character immediately following ! is ignored.
// Any input beginning with < and ending with > is ignored.
// The character { starts a group.
// The character } ends the most recently opened unclosed group.
// Groups can be nested: they score their nesting depth during the count.
//
// Assumptions:
//   groups are always terminated
//   garbage is always terminated
//
// Output:
//   the tally of groups found

var depth = 0; // current recursion depth, starts at 0
var inGarbage = 0; // we are not in a garbage section <>
var seenBang = 0; // the previous character is not !
var total = 0; // total score


// read and process the stream

var readFile = require('utils-fs-read-file');
var stream = readFile.sync('day9.txt', 'utf8' );

var i;
  for (i=0; i<stream.length; i++) {
    var thisChar = stream.charAt(i);

    if (seenBang > 0) {  // ignore the character after !
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
          inGarbage = 1;  // start or continue garbage state
          break;
        case '{':
          if (inGarbage === 0) {
            depth++;  // increase depth of nesting
          }
          break;
        case '}':
          if (inGarbage === 0) {
            total += depth;  // note the depth of the terminated group
            depth--;  // reduce depth one level
          }
          break;
        default:
      }
    }
  }
  console.log("Total for stream is",total);
