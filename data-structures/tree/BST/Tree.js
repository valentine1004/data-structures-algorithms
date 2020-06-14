var Node = require('./Node');

class Tree {
    constructor(rootKey) {
        this.root = new Node(rootKey);
    }

    insert(key) {

        var node = new Node(key);

        var current;

        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;

            while (true) {
                if (key < current.key) {
                    if (current.leftNode === null) {
                        current.leftNode = node;
                        break;
                    } else {
                        current = current.leftNode;
                    }
                } else if (key > current.key) {
                    if (current.rightNode === null) {
                        current.rightNode = node;
                        break;
                    } else {
                        current = current.rightNode;
                    }
                } else {
                    break;
                }
            }
        }
    }

    preOrderPrint(currentNode) {
        if (currentNode !== null) {
            console.log(currentNode.key);
            this.preOrderPrint(currentNode.leftNode);
            this.preOrderPrint(currentNode.rightNode);
        }
    }

    inOrderPrint(currentNode) {
        if (currentNode !== null) {
            this.inOrderPrint(currentNode.leftNode);
            console.log(currentNode.key);
            this.inOrderPrint(currentNode.rightNode);
        }
    }

    postOrderPrint(currentNode) {
        if (currentNode !== null) {
            this.postOrderPrint(currentNode.leftNode);
            this.postOrderPrint(currentNode.rightNode);
            console.log(currentNode.key);
        }
    }

    searchNode(key) {
        var current = this.root;
        var node = null;
        while (true) {
            if (current === null) {
                break;
            }
            if (current.key === key) {
                node = current;
                break;
            }
            if (current.key > key) {
                current = current.leftNode;
            } else if (current.key < key) {
                current = current.rightNode;
            }
        }
        return node;
    }

    searchNodeAndParent(key) {
        var current = this.root;
        var node = null;
        var parent = this.root;
        while (true) {
            if (current === null) {
                break;
            }
            if (current.key === key) {
                node = current;
                break;
            }
            if (current.key > key) {
                parent = current;
                current = current.leftNode;
            } else if (current.key < key) {
                parent = current;
                current = current.rightNode;
            }
        }
        return [node, parent];
    }

    deleteNode(key) {
        let [node, parent] = this.searchNodeAndParent(key);
        if (!node.leftNode && !node.rightNode) {
            if (parent.leftNode.key === node.key) {
                parent.leftNode = null;
            }
            if (parent.rightNode.key === node.key) {
                parent.rightNode = null;
            }
        }else{
            if(node.leftNode && node.rightNode){
                if(node.key > this.root.key){
                    let currentChildNodeRight = node.rightNode;
                    while(currentChildNodeRight.leftNode !== null){
                        currentChildNodeRight = currentChildNodeRight.leftNode;
                    }
                    let [, parentCurrentChildNode] = this.searchNodeAndParent(currentChildNodeRight.key);
                    parentCurrentChildNode.leftNode = null;
                    if (parent.leftNode.key === node.key) {
                        currentChildNodeRight.leftNode = node.leftNode;
                        currentChildNodeRight.rightNode = node.rightNode;
                        parent.leftNode = currentChildNodeRight;
                    }
                    if (parent.rightNode.key === node.key) {
                        currentChildNodeRight.leftNode = node.leftNode;
                        currentChildNodeRight.rightNode = node.rightNode;
                        parent.rightNode = currentChildNodeRight;
                    }
                }else if(node.key < this.root.key){
                    let currentChildNodeLeft = node.leftNode;
                    while(currentChildNodeLeft.rightNode !== null){
                        currentChildNodeLeft = currentChildNodeLeft.rightNode;
                    }
                    let [, parentCurrentChildNode] = this.searchNodeAndParent(currentChildNodeLeft.key);
                    parentCurrentChildNode.rightNode = null;
                    if (parent.leftNode.key === node.key) {
                        currentChildNodeLeft.leftNode = node.leftNode;
                        currentChildNodeLeft.rightNode = node.rightNode;
                        parent.leftNode = currentChildNodeLeft;
                    }
                    if (parent.rightNode.key === node.key) {
                        currentChildNodeLeft.leftNode = node.leftNode;
                        currentChildNodeLeft.rightNode = node.rightNode;
                        parent.rightNode = currentChildNodeLeft;
                    }
                }
            }else if(node.leftNode || node.rightNode){
                if(node.leftNode){
                    if (parent.leftNode.key === node.key) {
                        parent.leftNode = node.leftNode;
                    }
                    if (parent.rightNode.key === node.key) {
                        parent.rightNode = node.leftNode;
                    }
                }else{
                    if (parent.leftNode.key === node.key) {
                        parent.leftNode = node.rightNode;
                    }
                    if (parent.rightNode.key === node.key) {
                        parent.rightNode = node.rightNode;
                    }
                }
            }
        }
    }
}

var myTree = new Tree(6);
myTree.insert(4);
myTree.insert(2);
myTree.insert(5);
myTree.insert(9);
myTree.insert(8);
myTree.insert(12);
myTree.insert(10);
myTree.insert(14);
myTree.insert(3);
myTree.insert(1);

// myTree.preOrderPrint(myTree.root);
// myTree.wideSearchPrint(myTree.root);
// console.log(myTree.searchNodeAndParent(3));
myTree.deleteNode(4);
console.log(myTree.searchNode(3));

