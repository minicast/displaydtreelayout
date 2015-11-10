const React = require('react');
const ReactDOM = require('react-dom');
const bolformula = require('bolformula');
const DisplayDtree = require('./DisplayDtree.js');

const jsonTree = bolformula.getD3(bolformula.parser.parse('(p&q)'));
// console.log(JSON.stringify(jsonTree));

ReactDOM.render(
  <DisplayDtree jsonTree='[{"content":"and","children":[{"content":"p","children":[]},{"content":"q","children":[]}]}]'
    depth='2' leafs='2'
    atomWidth='40' edgeDepth='40'
  />,
  document.getElementById('DisplayDtreeContainer')
);

/*
let keyParsed = bolformula.parser.parse('(p&q)')
var treeData = bolformula.getD3(keyParsed);

var treeLeafs = bolformula.getD3leafs(keyParsed);
var leafWidth = 40;

var treeDepth = bolformula.getD3depth(keyParsed);
var edgeDepth = 40;

var el = document.getElementById("statistics");
el.innerHTML = 'syntax tree depth: ' + treeDepth + ' &nbsp; &nbsp; ' + 'syntax tree branching factor: ' + treeLeafs;
*/
