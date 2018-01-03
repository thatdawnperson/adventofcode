// Advent of Code 2016 - Day 4
//
// Given encrypted phrases, identify valid ones and decrypt them.
// 
// Input: lines containing alphabetic character sets shifted N
//        through a caesar cipher
//
// Part 1: sets are to be considered as occurring in single lines
// Part 2: sets are to be considered in columns, where the hundreds
//         value is used to denote numbers belonging to the same set
//         (hundreds digit is not part of the number to be considered)

// load the instructions

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());
var i,j,l,m,n, sum=0;
const aVal = 97;

for (i=0; i<lines.length-1; i++) {
  var room = lines[i];

  // count character occurrences for Part 1

  var counts = [];
  n = room.search(/\d/); // get encryption numeric value
  for (j=0; j<n; j++) {
    var index = room.charCodeAt(j)-aVal;
    if (index >=0 && index <= 26) {
      if (counts[index] === undefined) {
        counts[index]=1;
      } else {
        counts[index]++;
      }
    }
  }

  // count character occurrences against the checksum

  n = room.match(/\d+/).toString() * 1;
  j = room.search(/\d/)+4;
  valid = true;
  var c = counts.slice(); // make a copy of the counts to manipulate
  c.sort(function(a,b){return b-a});
  for (k=0; k<5; k++) {
    m = l;
    l = room.charCodeAt(j+k)-aVal;
    if (counts[l] === undefined) {
      k=5; // bad value in the checksum, this is not valid
      valid = false;
    } else if (counts[l] != c[k]) {
      k=5; // bad value in the checksum, this is not valid
      valid = false;
    }
  }
  if (valid) {
    sum += n;

// part 2: decrypt the names and look for "north pole objects"

    var decoded = '';
    for (j=0; j<room.length-10; j++) {
      var thisChar = (room.charCodeAt(j)-aVal+n)%26;
      decoded += String.fromCharCode(thisChar+aVal);
    }
    if (decoded.search("object") > -1) {
      console.log(decoded,n);
    }
  }
}

// note the sum of checksums for the Part 1 answer

console.log(sum);
