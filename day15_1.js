// Advent of Code - Day 15
//
// Sequence comparison
//
// Begin with
// - two values, A and B
//
// For 40 million iterations
//   Multiply each value by its corresponding factor
//   Keep the remainder of that product divided by a common divisor
//   Compare the lowest 16 bits of both results
//   Use the full results as the starting values for the next iteration
//
// Output:
//   the number of times the lowest 16 bits match

// we need to use a library for big integer math
var crunch = require('number-crunch');

var a = 116;
var b = 299;
const dividend = 2147483647;
const lowerBits = 65536;
const iterations = 40000000;
const aFactor = 16807;
const bFactor = 48271;
var matchCount = 0;
var i;

for (i=0; i<iterations; i++) {
  a = ( a * aFactor ) % dividend;
  b = ( b * bFactor ) % dividend;
  if ((a % lowerBits) === (b % lowerBits)) {
    matchCount++;
  }
}
console.log("Number of matches:",matchCount);
