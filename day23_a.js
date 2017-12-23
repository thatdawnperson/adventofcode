// Advent of Code - Day 23
//
// Execute a series of instructions and note number of mul instructions
//
// Instructions:
//   set <x> <y> -- set register x to y
//   sub <x> <y> -- subtract y from register x
//   mul <x> <y> -- multiply register x by y
//   jnz <x> <y> -- if register x is not 0, jump to offset y

// Begin with
// - a list of instructions
//
// Output:
//   the number of times the 'mul' instruction is called


// load the program's instruction set, initialize all registers

var readFile = require('utils-fs-read-file');
const fileName = "day23.txt";
var stream = readFile.sync(fileName, 'utf8' );
const program = stream.split(/\n/).map(a => a.trim().split(/\s+/));
const registers = { a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0 };

// inline function: return the value of a register or the number given
const get = regVal => regVal.match(/\d/) ? +regVal : (registers[regVal] || 0);

mulCount=0;
var i;

// walk through the program line by line

for (i = 0; i < program.length; i++) {
  const progLine = program[i]; // <instruction>, <register>, <value or register>
  switch (progLine[0]) {
  case 'set': 			// set register to value
    registers[progLine[1]] = get(progLine[2]);
    break;
  case 'sub': 			// subtract value from register
    registers[progLine[1]] -= get(progLine[2]);
    break;
  case 'mul': 			// multiply register by value
    registers[progLine[1]] *= get(progLine[2]);
    mulCount++;
    break;
  case 'jnz': 			// change program counter if register nonzero
    if (get(progLine[1]) != 0) {
      i--;
      i += get(progLine[2]);
    }
    break;
  default:
    console.log("Illegal instruction",progLine[0],"at",i);
    break;
  }
}

// display the final count

console.log("Total multiplications",mulCount);
