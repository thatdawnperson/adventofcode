// Advent of Code - Day 14
//
// Building on the hash in day10, calculate the bit pattern for a series of related hashes
//
// Begin with
// - a hash string
//
// For each of 128 rows:
//   Add the row number to the hash string (e.g. hash-0)
//   Compute the hash for that row
//
// Output:
//   the number of "on" bits for the entire grid
//   the number of regions (connected areas with "on" bits)

const listSize = 256;
const gridSize = 128;
// test data was: // const keyString = "flqrgnkx";
const keyString = "vbqugkhl";
var bitCount = 0;
const grid = [];

// function to build the hash input based on the string provided (from Day 10)
function buildHash(inString) {
  var i;
  var hashOut = [];
  for (i=0; i<inString.length; i++) {
    hashOut.push(inString.charCodeAt(i));
  }
  hashOut.push(17); hashOut.push(31); hashOut.push(73); hashOut.push(47); hashOut.push(23);
  return hashOut;
}

// function to swap to items in the global array 'list' (from Day 10)
function swapTwo(i,j) {
  var temp = list[i%listSize];
  list[i%listSize] = list[j%listSize];
  list[j%listSize] = temp;
}

// function to run one round of the hash (from Day 10)
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

// function to fill a contiguous region of the grid with num, starting at [a][b]
function fillRegion(a,b,num) {
  grid[a][b] = num;			// fill this space
  if (a>0 && grid[a-1][b] === -1) {	// check to the left
    fillRegion(a-1,b,num);
  }
  if (a<gridSize-1 && grid[a+1][b] === -1) { // check to the right
    fillRegion(a+1,b,num);
  }
  if (b>0 && grid[a][b-1] === -1) { // check directly above
    fillRegion(a,b-1,num);
  }
  if (b<gridSize-1 && grid[a][b+1] === -1) { // check directly below
    fillRegion(a,b+1,num);
  }
}

// main

// initialize the grid

var m,n;
for (m=0; m<gridSize; m++) {
  grid[m] = [];
  for (n=0; n<gridSize; n++) {
    grid[m][n] = 0;
  }
}

// run the hash on all rows for the key string

var count;
for (count=0; count<gridSize; count++) {

  // always initialize these between runs

  var position = 0;
  var skipLength = 0;

  // populate the list

  var list = [];
  var i;
  for (i=0; i<listSize; i++) list.push(i);

  // build the hash

  var inputString = keyString + "-" + count;
  var hashInput = buildHash(inputString);

  // run the algorithm 64 times

  for (i=0; i<64; i++) runHash();

  // compute the dense hash: XOR each 16-element block and store as binary

  var finalHash = '';
  for (i=0; i<16; i++) {
    var j;
    var thisChar = list[i*16];
    for (j=1; j<16; j++) {
      thisChar = thisChar ^ list[i*16+j];
    }

    // record the bits with left padding of 0 as necessary

    var charString = Number(thisChar).toString(2);
    while (charString.length < 8) {
      charString = '0' + charString;
    }
    finalHash = finalHash + charString;
  }

  // record all the bits

  for (i=0; i<finalHash.length; i++) {
    if (finalHash.charAt(i) != '0') {
      grid[count][i] = -1;
      bitCount++;
    }
  }
}
console.log("Total bits is",bitCount);

// calculate regions

var regionCount = 0;
for (m=0; m<gridSize; m++) {
  for (n=0; n<gridSize; n++) {
    if (grid[m][n] === -1) { // found a new region
      regionCount++;
      fillRegion(m,n,regionCount);
    }
  }
}

console.log("Number of regions is",regionCount);

