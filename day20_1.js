// Advent of Code - Day 20, part 1
//
// Find the particle that stays closest to the origin
//
// Begin with
// - a set of position, velocity, and acceleration vectors in a 3d plane
//
// Each turn, every particle gets its velocity updated then its position recalculated.
// Track the Manhattan distance to the origin for all particles: we will need some of it.
//
// Output:
//   the number of the particle which will remain closest to <0,0,0> in the long run

// main

var i,j;
var loc = [];
var spd = [];
var acc = [];
var manhattan = [];

// function to update the speed and position of a particle
// input: location, speed, acceleration as 3D items
// output: new location, new speed, Manhattan distance to origin

function moveIt(location,speed,accel) {
  var i, dist = 0;
  for (i=0; i<3; i++) {
    speed[i] += accel[i];
    location[i] += speed[i];
    dist += Math.abs(location[i]);
  }
  return {
    newloc: location,
    newspd: speed,
    newdist: dist
  };
}

// read the vectors

var readFile = require('utils-fs-read-file');
const fileName = "day20.txt";
var stream = readFile.sync(fileName, 'utf8');
line = stream.split("\n");

for (i=0; i<line.length-1; i++) {
  var tuples = line[i].trim().replace(/.=</g,'').replace(/>/g,'').split(" ");
  loc[i] = tuples[0].replace(/,$/,'').split(',');
  for (j=0; j<3; j++) loc[i][j] = loc[i][j] * 1;
  spd[i] = tuples[1].replace(/,$/,'').split(',');
  for (j=0; j<3; j++) spd[i][j] = spd[i][j] * 1;
  acc[i] = tuples[2].replace(/,$/,'').split(',');
  for (j=0; j<3; j++) acc[i][j] = acc[i][j] * 1;
  manhattan[i] = Math.abs(loc[i][0]) + Math.abs(loc[i][1]) + Math.abs(loc[i][2]);
}

// move all particles for 1000 rounds, note the particle with the minimum distance each round

for (i=0; i<1000; i++) {
  var minJ = 0;
  var minDist = 999999999;
  for (j=0; j<loc.length; j++) {
     var temp = moveIt(loc[j],spd[j],acc[j]);
     loc[j] = temp.newloc;
     spd[j] = temp.newspd;
     manhattan[j] = temp.newdist;
     if (manhattan[j] < minDist) { // find the minimum distance
       minJ = j;
       minDist = manhattan[j];
     }
  }

// lazy answer: get the answer by visual inspection of output not changing

console.log("Lowest distance",minDist,"at",minJ);
}
