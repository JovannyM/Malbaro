type Comparator<T> = (current: T, value: T) => 1|0|-1;

class TreeNode<T> {
    value: T;
    root?: TreeNode<T>
    left?: TreeNode<T>;
    right?: TreeNode<T>;

    constructor(value: T) {
        this.value = value;
    }

    add(value: T, comparator: Comparator<T>) {
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
    comparator: Comparator<T>;
    root?: TreeNode<T>

    constructor(comparator: Comparator<T>) {
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
}

const MyComparator = <T extends string|number>(current: T , value: T ): -1|0|1 => {
    if(current < value) return 1;
    if(current > value) return -1;
    return 0;
}

const MyTree = new Tree<number>(MyComparator);
MyTree.add(50);
MyTree.add(25);
MyTree.add(100);
MyTree.add(10);
MyTree.add(30);
MyTree.add(31);

MyTree.remove(30);

MyTree.print();