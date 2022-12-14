import {Comparators, MyComparator} from "./comparators";

class TreeNode<T> {
    value: T;
    root?: TreeNode<T>
    left?: TreeNode<T>;
    right?: TreeNode<T>;

    constructor(value: T) {
        this.value = value;
    }
    
    revert() {
        if (this.left && this.right) {
            const tempNode = this.left;
            this.left = this.right;
            this.right = tempNode;
            this.left.revert();
            this.right.revert();
            return;
        }
        if(this.left) {
            this.right = this.left;
            this.left = null;
            this.right.revert();
            return;
        }
        if(this.right) {
            this.left = this.right;
            this.right = null;
            this.left.revert();
        }
    }

    add(value: T, comparator: Comparators<T>) {
        const result = comparator(this.value, value);
        if(result === -1) {
            if(this.left) {
                this.left.add(value, comparator);
                return;
            }
            this.left = new TreeNode<T>(value);
            this.left.root = this;
            return;
        }
        if(result === 0 || result === 1) {
            if(this.right) {
                this.right.add(value, comparator);
                return;
            }
            this.right = new TreeNode<T>(value);
            this.right.root = this;
            return;
        }
    }
    
    print(position: string) {
        console.log(position, ' ', this.value.toString());
        if(this.left)  this.left.print('left:');
        if(this.right) this.right.print('right:');
    }
}

class Tree<T> {
    comparator: Comparators<T>;
    root?: TreeNode<T>

    constructor(comparator: Comparators<T>) {
        this.comparator = comparator;
    }

    add(value: T) {
        if (this.root) {
            this.root.add(value, this.comparator);
            return;
        }
        this.root = new TreeNode<T>(value);
    }
    
    print() {
        if(this.root) {
            this.root.print('root:');
            return;
        }
        console.log('Tree is empty');        
    }
    
    findNodeByValue(value: T): TreeNode<T> | null {
        let node: TreeNode<T> = this.root;
        while(node.value !== value) {
            if(node.right && value > node.value) {
                node = node.right;
                continue;
            }
            if(node.left && value < node.value) {
                node = node.left;
                continue;
            }
            return null;
        }
        return node;    
    }
    
    remove(value: T): void {
        if(this.root) {
            let nodeForRemoving = this.findNodeByValue(value);
            if(nodeForRemoving) {
                if(nodeForRemoving.left && nodeForRemoving.right) {
                    let node = nodeForRemoving.left;
                    while (true) {
                        if(node.right) {
                            node = node.right;
                            continue;
                        }
                        if (node.left) {
                            nodeForRemoving.value = node.value;
                            node.root.right = node.left;
                            break;
                        }
                        if(node.root.right && node.root.right.value === node.value) {
                            nodeForRemoving.value = node.value;
                            node.root.right = null;
                            break
                        } else {
                            nodeForRemoving.value = node.value;
                            node.root.left = null;
                            break
                        }
                    }
                    console.log(true);
                    return;
                }
                
                
                if(nodeForRemoving.right) {
                    if(nodeForRemoving.root) {
                        nodeForRemoving.root.right = nodeForRemoving.right;
                        nodeForRemoving.right.root = nodeForRemoving.root;
                        console.log(true);
                        return;
                    }
                    this.root = this.root.right;
                    console.log(true);
                    return;
                }
                
                
                if(nodeForRemoving.left) {
                    if(nodeForRemoving.root) {
                        nodeForRemoving.root.left = nodeForRemoving.left;
                        nodeForRemoving.left.root = nodeForRemoving.root;
                        console.log(true);
                        return;
                    }
                    this.root = this.root.left;
                    console.log(true);
                    return;
                }

                if(nodeForRemoving.root.right && nodeForRemoving.root.right.value === value) {
                    nodeForRemoving.root.right = null;
                    return;
                }
                else nodeForRemoving.root.left = null;                
                console.log(true);
                return;               
            }
            console.log('Element not found');
            return;
        }
        console.log('Tree is empty');
    }
    
    revert() {
        if(this.root) this.root.revert();
    }
}

const MyTree = new Tree<number>(MyComparator);
MyTree.add(50);
MyTree.add(25);
MyTree.add(100);
MyTree.add(10);
MyTree.add(30);

MyTree.revert();

MyTree.print();