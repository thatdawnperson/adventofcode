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
var graph = [];
var seenNode = [];
var groupNeighbour = [];

// function traverseNode: identify the neighbours of a node recursively

function traverseNode(nodeNum) {
  var i;
  if (seenNode[nodeNum] > 0) return; // do not need to visit a place twice
  seenNode[nodeNum]++;

  // special case for the start of our walk: I am my own neighbour
  if (nodeNum === 0) {
    groupNeighbour[nodeNum] = 1;
    for (i=0; i<graph[nodeNum].length; i++) {
      groupNeighbour[graph[nodeNum][i]] = 1;
    }
  } else {

    // direct connections are neighbours

    if (groupNeighbour[graph[nodeNum][0]] > 0) {
      groupNeighbour[nodeNum] = 1;
    }
  }

  // their neighbours need to be added to the group: time for recursion!

  for (i=0; i<graph[nodeNum].length; i++) {
    groupNeighbour[graph[nodeNum][i]] = 1;
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

// start by having seen nothing, with no neighbours to anything

for (i=0; i<graph.length; i++) {
  seenNode.push(0);
  groupNeighbour.push(0);
};

// to find all disconnected groups in the graph, keep looking until
// we have every node in a group. worst case is pass through every item
var numGroups = 0;

for (j=0; j<graph.length; j++) {

// check to see if the next node is already mapped
// if not, traverse the entire graph to find the nodes connected to this node

  if (seenNode[j] === 0) {
    groupNeighbour[j] = 1;
    traverseNode(j);
    numGroups++;
  }
}
console.log("Input contains",numGroups,"groups.");
