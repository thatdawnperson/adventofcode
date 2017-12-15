// Advent of Code - Day 14
//
// Sequence comparison
//
// Begin with
// - two values, A and B
//
// For 5 million comparisons (defined by the results being divisible by 4 and 8)
//   Multiply each value by its corresponding factor
//   Keep the remainder of that product divided by a common divisor
//   Compare the lowest 16 bits of both results
//   Use the results as the starting values for the next iteration
//
// Output:
//   the number of times the lowest 16 bits match

var a = 116;
var b = 299;
const dividend = 2147483647;
const lowerBits = 65535;
const judgments =   5000000;
const aFactor = 16807;
const bFactor = 48271;
var matchCount = 0;
var i, j;
var testa = [];
var testb = [];

j=0;
for (i=0; j<judgments; i++) {
  a = (a*aFactor)%dividend;
  if (a%4 === 0) {
    testa[j] = a;
    j++;
  }
}
console.log("First run took",i,"attempts");

j=0;
for (i=0; j<judgments; i++) {
  b = (b*bFactor)%dividend;
  if (b%8 === 0) {
    testb[j] = b;
    j++
  }
}
console.log("Second run took",i,"attempts");

for (i=0; i<judgments; i++) {
  if ((testa[i]&lowerBits) === (testb[i]&lowerBits)) {
    matchCount++;
  }
}
console.log("Number of matches:",matchCount);
