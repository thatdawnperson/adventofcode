const csp = require('js-csp');
const instructions = "set i 31\nset a 1\nmul p 17\njgz p p\nmul a 2\nadd i -1\njgz i -2\nadd a -1\nset i 127\nset p 464\nmul p 8505\nmod p a\nmul p 129749\nadd p 12345\nmod p a\nset b p\nmod b 10000\nsnd b\nadd i -1\njgz i -9\njgz a 3\nrcv b\njgz b -1\nset f 0\nset i 126\nrcv a\nrcv b\nset p a\nmul p -1\nadd p b\njgz p 4\nsnd a\nset a b\njgz 1 3\nsnd b\nset f 1\nadd i -1\njgz i -11\nsnd a\njgz f -16\njgz a -19";
const program = instructions.split(/\n/).map(a => a.trim().split(/\s+/));

function * prog (p, inbox, outbox) {
  const data = { p };
  const get = regVal => regVal.match(/\d/) ? +regVal : (data[regVal] || 0);
  var i;
  var sent = 0;
  for (i = 0; i < program.length; i++) {
    const progLine = program[i];
    switch (progLine[0]) {
      case 'snd': // send to the brother and track that we're sending
        sent++;
        const lastSent = get(progLine[1]);
        if (p === 1) console.log("Program", p, "sent", lastSent, "total", sent);
        yield csp.put(outbox, lastSent);
        break;
      case 'rcv': // receive from the brother if there's anything to catch
        const  lastRcv = yield csp.take(inbox);
        data[progLine[1]] = lastRcv;
        break;
      case 'set': // set register to value
        data[progLine[1]] = get(progLine[2]);
        break;
      case 'add': // add value to register
        data[progLine[1]] += get(progLine[2]);
        break;
      case 'mul': // multiply register by value
        data[progLine[1]] *= get(progLine[2]);
        break;
      case 'mod': // modulus of register with value
        data[progLine[1]] %= get(progLine[2]);
        break;
      case 'jgz': // change program counter if register > 0
        if (get(progLine[1]) > 0) {
          i--;
          i += get(progLine[2]);
        }
        break;
       default:
         break;
    }
  }
}

const m0 = csp.chan(99999999);
const m1 = csp.chan(99999999);
csp.go(function * () { yield * prog(0, m0, m1) });
csp.go(function * () { yield * prog(1, m1, m0) });
