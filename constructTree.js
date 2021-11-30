var TreeModel = require('TreeModel.js');
var tree = new TreeModel();
    
// Constructing a tree
// Create root node and first children
let root = tree.parse({value: 5, cost:0, children: [{value: 2, cost:0}, {value: 3, cost:0}, {value: 4, cost: 0}]});

// Traverse tree for each node and create its children
root.walk(function (node) {
    // Halt the traversal by returning false
    if (node !== root) {
        if (node.model.value - 3 >= 0) {
            let child = tree.parse({value: node.model.value - 3, cost:0});
            node.addChild(child);
        }
        if (node.model.value - 2 >= 0) {
            let child = tree.parse({value: node.model.value - 2, cost:0});
            node.addChild(child);
        }
        if (node.model.value - 1 >= 0) {
            let child = tree.parse({value: node.model.value - 1, cost:0});
            node.addChild(child);
        }    
    }
});

console.log(root.model);