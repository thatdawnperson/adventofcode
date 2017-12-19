// Advent of Code - Day 18
//
// Execute a series of instructions and note the first value recovered.
//
// Instructions:
//   set <x> <y> -- set register x to y
//   add <x> <y> -- add y to register x
//   mul <x> <y> -- multiply register x by y
//   mod <x> <y> -- set register x to x%y
//   snd <x> -- store (play) the value of register x
//   rcv <x> -- if register x is not zero, recover the last snd of register x
//   jgz <x> <y> -- if register x is greater than 0, jump to offset y

var readFile = require('utils-fs-read-file');
const fileName = "day18.txt";
var stream = readFile.sync(fileName, 'utf8' );
var line;
var i,j;
var count = 0;
var program = [];
var arg1 = [];
var arg2 = [];
var register = [];
var regVal = [];
var storage = [];
var sendCount = 0;
var lastSent;
// main

// load the program's instruction set, initialize all registers

line = stream.split("\n");
for (j=0; j<line.length; j++) {
  var lineItems = line[j].split(" ");
  if (lineItems.length < 2) break; // handle end of input gracefully
  program[j] = lineItems[0];  // store the instruction
  var argument = lineItems[1];
  arg1[j] = argument;  // store the first argument, always a register
  if (register.indexOf(argument) < 0) { // create the register if it doesn't exist
    register.push(argument);
    regVal.push(0);
  }
  if (lineItems.length > 2) { // if there is a second argument, store it
    var argument = lineItems[2];
    arg2[j] = Number(argument); // if it's a number, store the value
    if (!Number.isInteger(arg2[j])) { // else it's a register
      arg2[j] = argument;
      if (register.indexOf(argument) < 0) { // create the register if it doesn't exist
        register.push(argument);
        regVal.push(0);
      }
    }
  } else {
    arg2[j] = 0; // we won't use this value but want to avoid errors in evaluation below
  }
}

// run until the first of jumping off either end or completing a rcv instruction

for (count=0; count>=-1 && count <program.length; count++) {
  var argument1 = register.indexOf(arg1[count]); // location of the register to use
  var argument2 = arg2[count]; // value to use
  if (Number.isInteger(arg2[count])) {
    argument2 = Number(argument2);
  } else {
    argument2 = regVal[register.indexOf(argument2)];
  }

  switch (program[count]) {
    case 'snd':
      storage[argument1] = regVal[argument1];
      lastSent = regVal[argument1];
      sendCount++;
      break;
    case 'rcv':
      if (regVal[argument1] === 0) {
//        console.log("RCV with zero value: do nothing");
      } else {
        console.log("RCV",lastSent);
        count=program.length+1;
      }
      break;
    case 'jgz':
      if (regVal[argument1] > 0) {
        count += argument2-1;
      }
      break;
    case 'set':
      regVal[argument1] = argument2;
      break;
    case 'add':
      regVal[argument1] += argument2;
      break;
    case 'mul':
      regVal[argument1] *= argument2;
      break;
    case 'mod':
      regVal[argument1] %= argument2;
      break;
    default:
      console.log("Invalid instruction",program[count],"at",count);
  }
}
console.log("Program terminated at",count);
