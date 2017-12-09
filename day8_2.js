// Advent of Code - Day 8
//
// Process a series of conditional instructions on a set of registers.
// All registers are initialized to 0.
//
// Instructions look like:
//   b inc 5 if a > 1
//   a inc 1 if b < 5
//   c dec -10 if a >= 1
//   c inc -20 if c == 10
// [register_name] [operand] [number] if [register_name] [comparator] [number]
// register_name may be any string of letters
// operand may be inc (increment) or dec (decrement)
// number may be any integer
// comparator may be any of: > < >= <= == !=
//
// Output:
//   the largest value in any register

// okay, I break into using node now because I'm tired of the big input files

var forEachLine = require('for-each-line');
const fileName = "day8.txt";
var line;
var register = [];
var i;
var highestVal = -99999999999999;

function doOperation(amount,regNum,operation) {
  if (operation === "inc") {
    register[regNum].value += amount;
    if (register[regNum].value > highestVal) { // this time we track highest value
      highestVal = register[regNum].value;     // even if it's transient
    }
  } else if (operation === "dec") {
    register[regNum].value -= amount;
    if (register[regNum].value > highestVal) { // this time we track highest value
      highestVal = register[regNum].value;     // even if it's transient
    }
  } else {
    console.log("ERROR: invalid instruction",operation);
  }
}

// grab the next instruction

forEachLine(fileName, (line) => {
  var instruction = line.split(" ");
  var reg1 = instruction[0];
  var oper = instruction[1];
  var val1 = Number(instruction[2]);
  var reg2 = instruction[4];
  var comp = instruction[5];
  var val2 = Number(instruction[6]);
  var r1 = -1;
  var r2 = -1;

  // get the register indexes for the comparison and possible operation

  for (i=0; i<register.length; i++) {
    if (register[i].name === reg1) {
      r1 = i;
    }
    if (register[i].name === reg2) {
      r2 = i;
    }
  }

  // add any missing register, initialized to 0

  if (r1 === -1) {
    r1 = register.length;

    // handle the case of the same register being used

    if (reg1 === reg2) {
      r2 = register.length;
    }
    register.push({ name: reg1, value: 0 });
  }
  if (r2 === -1) {
    r2 = register.length;
    register.push({ name: reg2, value: 0 });
  }

  // verify we have valid registers before proceeding

  if (register[r1].name != reg1) {
    console.log("ERROR: register mismatch for",r1,reg1);
  }
  if (register[r2].name != reg2) {
    console.log("ERROR: register mismatch for",r2,reg2);
  }

  // run the comparison and perform the operation if it evaluates to true
  // comparator may be any of: > < >= <= == !=

  switch (comp) {
    case ">":
      if (register[r2].value > val2) {
        doOperation(val1,r1,oper);
      }
      break;
    case "<":
      if (register[r2].value < val2) {
        doOperation(val1,r1,oper);
      }
      break;
    case ">=":
      if (register[r2].value >= val2) {
        doOperation(val1,r1,oper);
      }
      break;
    case "<=":
      if (register[r2].value <= val2) {
        doOperation(val1,r1,oper);
      }
      break;
    case "==":
      if (register[r2].value === val2) {
        doOperation(val1,r1,oper);
      }
      break;
    case "!=":
      if (register[r2].value != val2) {
        doOperation(val1,r1,oper);
      }
      break;
    default:
      console.log("ERROR: invalid comparator",comp);
  }

// when we've reached end of the file: output the value of the largest register

}).then(() => {
  console.log('Highest value is',highestVal);
});
