// Advent of Code 2016 - Day 6
//
// Given a repeated word containing errors, find the target word
// 
// Input: lines containing the same number of characters
//
// Part 1: the word formed by using the most frequently occurring character
//         at each position
// Part 2: the word formed by using the least frequently occurring character
//         at each position

// load the instructions

var readFile = require('utils-fs-read-file');
const fileName = "input.txt";
var stream = readFile.sync(fileName, 'utf8' );
var lines = stream.split(/\n/).map(a => a.trim());
var chars = [ '','','','','','','',''];
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// get a list of characters at each position

for (i=0; i<lines.length-1; i++) {
  for (j=0; j<lines[i].length; j++) {
    chars[j] += lines[i].charAt(j);
  }
}

// find the most/least frequently occurring character in each position

var message = '';
var decoy = '';
for (i=0; i<chars.length; i++) { // for each position
  var maxChar, max = 0;
  var minChar, min = chars[i].length;
  for (j=0; j<alphabet.length; j++) { // look through the entire alphabet
    var matchCount = 0;
    for (k=0; k<chars[i].length; k++) { // look through the full string
      if (chars[i].charAt(k) === alphabet.charAt(j)) {
        matchCount++;
      }
    }
    if (matchCount>max) { // new high count?
      max = matchCount;
      maxChar = j;
    }
    if (matchCount>0 && matchCount<min) { // new low count? character must occur
      min = matchCount;
      minChar = j;
    }
  }
  decoy = decoy + alphabet.charAt(maxChar);
  message = message + alphabet.charAt(minChar);
}

// display the resulting word (both parts of the puzzle)

console.log(decoy);
console.log(message);
