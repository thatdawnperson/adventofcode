// Advent of Code - Day 6
//
// Find the point in a block redistribution cycle where the distribution
// of blocks is identical to one we've seen before. Stop at this point and
// report the count of cycles.
//

// puzzle input
const bank = [ 10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6 ];

// use a function to check the array of redistribution results

function checkDuplicate(array) { // find duplicate value in array
  if (array.length < 2) { // there are no duplicates among one item
    return 0;
  }
  var i, j;
  for (i=0; i<array.length-1; i++) {
      j = array.length-1;  // we only need to check the most recently added item
      if (array[i] === array[j]) {
        console.log("We have seen ",array[i]," at ",i," and ",j," which is a loop of size ",j-i);
        return j;
    }
  }
  return 0; // end of loop: no match
}

var result = [ bank.toString() ];
var i, block;

for (i=0; checkDuplicate(result)===0; i++) {  // stop config is a repeat

  var lpos, pos, largest = 0;
  for (pos=0; pos<bank.length; pos++) {  // find the largest value
    if (bank[pos] > largest) {
      largest = bank[pos];
      lpos = pos;
    }
  }

bank[lpos] = 0;  // we will redistribute from the largest bucket, so zero it
  for (pos=lpos; largest>0; largest--) {  // redistribute the blocks
    pos++;
    if (pos>=bank.length) {
      pos = 0;
    }
    bank[pos] += 1;
  }

  result.push(bank.toString()); // store redistribution result

}
