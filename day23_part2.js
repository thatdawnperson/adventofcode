// Advent of Code Day 23
//
// Find the value of 'h' when the code finishes executing.
//
// I came to this solution by examining the program and its output, 
// changing the program and seeing the effects of those changes.
//
// The code step counts by 17 from the initial value of register B
// to the initial value of register C (inclusive). The register H
// stores the number of non-prime numbers found in the count.
//
// Part of the key to determining the condition is noting register H
// can only be incremented when B is equal to D * E.
//
// Rather than optimize the input (program), I am writing my own
// non-prime number finder. It needs to examine numbers based on this
// code:
// 
// set b 93
// set c b
// jnz a 2
// jnz 1 5
// mul b 100
// sub b -100000
// set c b
// sub c -17000
// 
// When A=1, B=109300 and C=126300: this is what we need to find
// When A=0, B=93 and C=93: H is set to 1 because 93 = 3 * 31
//
// Some example testing, recording when H changed with different values of C:
// { a: 0, b: 93, c: 263, d: 93, e: 93, f: 0, g: 0, h: 1 }
// { a: 0, b: 110, c: 263, d: 110, e: 110, f: 0, g: 0, h: 2 }
// { a: 0, b: 144, c: 263, d: 144, e: 144, f: 0, g: 0, h: 3 }
// { a: 0, b: 161, c: 263, d: 161, e: 161, f: 0, g: 0, h: 4 }
// { a: 0, b: 178, c: 263, d: 178, e: 178, f: 0, g: 0, h: 5 }
// { a: 0, b: 195, c: 263, d: 195, e: 195, f: 0, g: 0, h: 6 }
// { a: 0, b: 212, c: 263, d: 212, e: 212, f: 0, g: 0, h: 7 }
// { a: 0, b: 246, c: 263, d: 246, e: 246, f: 0, g: 0, h: 8 }
//
// 93, 110, 144, 161, 178, 195, 212, and 246 are all non-prime.
// 127 and 263 are prime.
//
// This program finds the number of non-prime numbers between 109300 and 126300
// when step counting by 17. The end points both matter.
//

const low = 93 * 100 + 100000;
const high = low + 17000;
const step = 17;
var isPrime = require('is-prime');
var i, nonPrimes = 0;

for (i=low; i<=high; i+=step) {
  if (!isPrime(i))
    nonPrimes++;
}

console.log(nonPrimes);

