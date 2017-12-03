const targetno = 361527;
const target = 80;
var max = 0, horiz = 0, vert=0, dir = 4;
var pos1 = 5, pos2 = 5;
const values = [
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

for (i=1; i<=target; i++) {
  if (dir > 3) {
    dir = 0;
    max++;
  }
  if (dir === 0) {
    horiz++;
    if (Math.abs(horiz) === max) {
      dir++;
    }
  }
  else if (dir === 1) {
    vert++;
    if (Math.abs(vert) === max) {
      dir++;
    }
  }
  else if (dir === 2) {
    horiz--;
    if (Math.abs(horiz) === max) {
      dir++;
    }
  }
  else if (dir === 3) {
    vert--;
    if (Math.abs(vert) === max) {
      dir++;
    }
  }
  var position1 = pos1+horiz;
  var position2 = pos2+vert;
  var x,y;
  for (x=-1; x<=1; x++) {
    for (y=-1; y<=1; y++) {
      if ((x!=0) || (y!=0)) {
        values[position1][position2] += values[position1+x][position2+y];
      }
    }
  }
  if (values[position1][position2] > targetno) {
    console.log(values[position1][position2]);
    break;
  }
}
