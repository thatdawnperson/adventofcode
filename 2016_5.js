// Advent of Code 2016 - Day 5
// 
// Run a whole lot of md5 checksums to get ones starting with 00000
// 
// Input: a character string to use as a starting point
//
// Part 1: add sequentially increasing numbers until 8 hashes are found
// Part 2: as above, but place the 7th character in the (6th char) position
//         (unless it's alredy been filled) until all 8 positions have been filled

var md5 = require('md5');
const seed = 'ojvtpuvg';
var hash, n=-1;
// part 1: var pw = '';
var pw = 'xxxxxxxx';
var temp;
var i,s;

// loop to get the first hash value

hash = md5(seed);
while (hash.substr(0,5) != "00000") {
  n++;
  hash = md5(seed+n);
}

// part 1: pw += hash.charAt(5);
// part 2: determine if this is a valid hash we can use

i = hash.charAt(5) * 1;
if (i>-1 && i<8) {
  s = hash.charAt(6);
  if (pw.charAt(i) === 'x') {
    temp = pw.slice(0,i) + s + pw.slice(i+1);
    pw = '';
    pw = temp.concat('');
  }
}

console.log(hash,n,i,s,temp,pw);

// part 1: fill the hash with the next 7 matches
// while (pw.length < 8) {

// part 2: more complex logic to fill the hash string

while (pw.includes('x')) {
  n++;
  hash = md5(seed+n);
  while (hash.substr(0,5) != "00000") {
    n++;
    hash = md5(seed+n);
  }
// part 1: pw += hash.charAt(5);
  i = hash.charAt(5) * 1;
  if (i>-1 && i<8) {
    s = hash.charAt(6);
    if (pw.charAt(i) === 'x') {
      temp = pw.slice(0,i) + s + pw.slice(i+1);
      pw = '';
      pw = temp.concat('');
    }
  }
console.log(hash,n,pw);
}

console.log(pw);
