const target = 361527;
//const target = 123;
var max = 0, horiz = 0, vert=0, dir = 4;

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
  if (i+1===target) {
    console.log(i+1,horiz,vert,Math.abs(horiz)+Math.abs(vert));
  }
}
