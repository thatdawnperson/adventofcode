// Advent of Code - Day 10
//
// Building on the "hash" in day10_1, create a more robust hash function.
//
// Begin with
// - a list of numbers from 0 to 255,
// - a current position which begins at 0 (the first element in the list),
// - a skip size (which starts at 0), and
// - a sequence of lengths (your puzzle input).
//
// For each length:
// Reverse the order of that length of elements in the list, starting with the element at the current position.
// Move the current position forward by that length plus the skip size.
// Increase the skip size by one.
//
// Lengths larger than the size of the list are invalid.
//
// Output:
//   the product of the first two numbers in the final list

const listSize = 256;
const inputStrings = [
 "",
 "AoC 2017",
 "1,2,3",
 "1,2,4",
 "83,0,193,1,254,237,187,40,88,27,2,255,149,29,42,100"
]

// function to build the hash input based on the string provided
// always add to the end of the sequence: 17, 31, 73, 47, 23
function buildHash(inString) {
  var i;
  var hashOut = [];
  for (i=0; i<inString.length; i++) {
    hashOut.push(inString.charCodeAt(i));
  }
  hashOut.push(17);
  hashOut.push(31);
  hashOut.push(73);
  hashOut.push(47);
  hashOut.push(23);
  return hashOut;
}

// function to swap to items in the global array 'list'
function swapTwo(i,j) {
  var temp = list[i%listSize];
  list[i%listSize] = list[j%listSize];
  list[j%listSize] = temp;
}

// function to run one round of the hash
function runHash() {
  var i;
  // process each element of the input array
  for (i=0; i<hashInput.length; i++) {
    var j;
    // swap elements
    for (j=0; j<hashInput[i]/2; j++) {
      swapTwo(position+j,position+hashInput[i]-j-1);
    }
    // move forward in the list
    position += hashInput[i]+skipLength;
    // increase the skip length for the next round
    skipLength++;
  }
}

// run the hash on all input strings, including provided test input
var count;
for (count=0; count<inputStrings.length; count++) {
  // always initialize these between runs
  var position = 0;
  var skipLength = 0;
  // populate the list
  var list = [];
  var i;
  for (i=0; i<listSize; i++) list.push(i);

  // build the hash
  var hashInput = buildHash(inputStrings[count]);

  // run the algorithm 64 times
  for (i=0; i<64; i++) runHash();

  // compute the dense hash: XOR each 16-element block and display as hex
  var finalHash = '';
  for (i=0; i<16; i++) {
    var j;
    var thisChar = list[i*16];
    for (j=1; j<16; j++) {
      thisChar = thisChar ^ list[i*16+j];
    }
    finalHash = finalHash + Number(thisChar).toString(16);
  }

  // print the solution
  console.log(inputStrings[count],"becomes",finalHash);
}
