// Advent of Code - Day 10
//
// Reorder a list of items by repeatedly reversing a subset of elements.
// Treat the list as circular (the next item after the end is the start).
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
var list = [];
const hashInput = [83,0,193,1,254,237,187,40,88,27,2,255,149,29,42,100];
var position = 0;
var skipLength = 0;


// function to swap to items in the global array 'list'
function swapTwo(i,j) {
  var temp = list[i%listSize];
  list[i%listSize] = list[j%listSize];
  list[j%listSize] = temp;
}

// populate the list

var i;
for (i=0; i<listSize; i++) list.push(i);

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

// print the solution: the first two numbers multiplied by each other
console.log(list[0]*list[1]);

