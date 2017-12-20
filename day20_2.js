// Advent of Code - Day 20, part 2
//
// Find the number of particles left after removing all collisions
//
// Begin with
// - a set of position, velocity, and acceleration vectors in a 3d plane
//
// Each turn, every particle gets its velocity updated then its position recalculated.
// Any particles at the same location are destroyed and not counted in the next run.
//
// Output:
//   the number of the particles which will remain in the long run

// main

var i,j;
var loc = [];
var spd = [];
var acc = [];
var boom = 0;

// function to update the speed and position of a particle
// input: location, speed, acceleration as 3D items
// output: new location, new speed

function moveIt(location,speed,accel) {
  var i;
  for (i=0; i<3; i++) {
    speed[i] += accel[i];
    location[i] += speed[i];
  }
  return {
    newloc: location,
    newspd: speed,
  };
}

// function to destroy any particles the same location as the current one
// input: particle index number
// output: the number of particles removed
// tricky part: two particles next to each other in the array may be colocated
// less tricky part: hold on to the thing we're checking against until we're done

function collisionDetect(index) {
  var k, destroyed = 0;
  if (index < 0 || index >= loc.length) return 0; // don't fall off the end
  for (k=index+1; k<loc.length; k++) {
    if (loc[index][0] === loc[k][0]) {
      if (loc[index][1] === loc[k][1]) {
        if (loc[index][2] === loc[k][2]) {
          loc.splice(k,1);  // remove the detected collision
          spd.splice(k,1);  // for all three vector spaces
          acc.splice(k,1);
          destroyed++;
          k--; // move the index back by one so we don't skip any collisions
        }
      }
    }
  }
  if (destroyed > 0) { // remove the particle if anything collided with it
    loc.splice(index,1);
    spd.splice(index,1);
    acc.splice(index,1);
    destroyed++
  }
  return destroyed;
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
}

// handle any collisions before anything moves

for (j=0; j<loc.length; j++) {
  if ((boom = collisionDetect(j)) > 0) {
    console.log("Collision(s) detected (",boom,") at",j,"at initial condition");
    j -= boom; // tricky part: step back far enough that we don't miss anything
  }
}

// move and check for collisions

for (i=0; i<1000; i++) {
  for (j=0; j<loc.length; j++) { // first move the particles simultaneously
     var temp = moveIt(loc[j],spd[j],acc[j]);
     loc[j] = temp.newloc;
     spd[j] = temp.newspd;
  }
  for (j=0; j<loc.length; j++) { // now find all collisions
     if ((boom = collisionDetect(j)) > 0) {
       console.log("Collision(s) detected (",boom,") at",j,"in round",i);
       j -= boom+1; // move back if collisions were found
    }
  }
}

// how many particles are left?
console.log("Particles remaining:",loc.length);
