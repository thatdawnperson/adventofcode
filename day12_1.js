// Advent of Code - Day 12
//
// Count the number of items that are or connect to the item with number 0.
//
// Puzzle hint:
//   the text used the phrase "traveling salesman"

var readFile = require('utils-fs-read-file');
const fileName = "day12.txt";
var stream = readFile.sync(fileName, 'utf8' );
var line;
var i,j;
var count = 0;
var graph = [];
var seenNode = [];
var zeroNeighbour = [];

// function traverseNode: identify the neighbours of a node recursively

function traverseNode(nodeNum) {
  var i;
  if (seenNode[nodeNum] > 0) return; // do not need to visit a place twice
  seenNode[nodeNum]++;
  
  // direct connections are neighbours

  if (zeroNeighbour[graph[nodeNum][0]] > 0) {
    zeroNeighbour[nodeNum] = 1;
  }

  // their neighbours need to be added to the group: time for recursion!

  for (i=0; i<graph[nodeNum].length; i++) {
    zeroNeighbour[graph[nodeNum][i]] = 1;
    traverseNode(graph[nodeNum][i]);
  }
}

// main

// build the graph

line = stream.split("\n");
for (j=0; j<line.length; j++) {
  var lineItems = line[j].split(" ");
  var neighbour = [];
  if (lineItems.length>1) {
    for (i=2; i<lineItems.length; i++) {
      var k = Number(lineItems[i].replace(',',''));
      neighbour[i-2] = k;
    }
    graph[Number(lineItems[0])] = neighbour;
  }
};

// start by having seen nothing, with no neighbours to Zero

for (i=0; i<graph.length; i++) {
  seenNode.push(0);
  zeroNeighbour.push(0);
};
zeroNeighbour[0] = 1;

// traverse the entire graph to find the nodes connected to node 0

traverseNode(0);

// count the result

for (i=0; i<zeroNeighbour.length; i++) {
  if (zeroNeighbour[i] > 0) {
    count++;
  }
}
console.log(count,"neighbours counted");
