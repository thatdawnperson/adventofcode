// Advent of Code 2016 - Day 7
//
// Find the number of character strings that match a pattern
// 
// Input: lines containing the same number of characters
//
// Part 1: If there is a character string of the form ABBA (not AAAA) between
//         [], it does not match. Elsif there is an ABBA outside [], it matches.
// Part 2: Match if there is a character string of the form ABA outside [] and
//         a corresponding string of the form BAB (same characters) inside.

// load the "addresses"

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());

// walk through each string

var i,j,TLScount=0;
var SSLcount=0;
for (i=0; i<lines.length; i++) {
  var square = false;
  var validTLS = false;
  var addr = lines[i];
  var abaMatch = [];
  var babMatch = [];
  for (j=0; j<addr.length; j++) {

    // code for Part 1: ABBA outside [], no ABBA inside []

    if (j<addr.length-3) {
      if (addr.charAt(j) === addr.charAt(j+3) && addr.charAt(j+1) === addr.charAt(j+2) && addr.charAt(j) != addr.charAt(j+1)) {
        if (square) { // match inside [] makes this address invalid, exit check
          validTLS = false;
          j=addr.length-1;
        } else { // match outside [] makes this address valid ... so far
          validTLS = true;
        }
      }
    }

    // code for Part 2: ABA outside [] that matches BAB inside [] (check at end)

    if (addr.charAt(j) === addr.charAt(j+2) && addr.charAt(j) != addr.charAt(j+1)) {
      if (square) {
      var tempString = addr.charAt(j+1) + addr.charAt(j); // store AB
        babMatch.push(tempString);
      } else {
        var tempString = addr.charAt(j) + addr.charAt(j+1); // store AB
        abaMatch.push(tempString);
      }
    }

    // common code for both: note [] state

    if (addr.charAt(j) === '[')
      square = true;
    if (addr.charAt(j) === ']')
      square = false;
  }

  // record matches rules? increment the corresponding count

  if (validTLS) { // Part 1 condition
    TLScount++;
  }

  for (j=0; j<abaMatch.length; j++) { // Part 2 code and condition
    for (k=0; k<babMatch.length; k++) {
      if (abaMatch[j] === babMatch[k]) {
        SSLcount++;
        j=abaMatch.length;
        k=babMatch.length;
      }
    }
  }
}

console.log("TLS supported by",TLScount);
console.log("SSL supported by",SSLcount);
