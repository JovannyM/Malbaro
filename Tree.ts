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
    
    remove(element: T) {
        if(this.value === element) {
            if(this.left) {
                if(this.right) {
                    this.value = this.left.removeAndReturnMax();
                    return true;
                }
                this.root.right = this.left
                return true;
            }
            if(this.right) {
                if(this.root) {
                    this.root.right = this.right;
                    this.right.root = this.root;
                }
                this.value = this.right.value;
                this.right = null;
                return true;
            }
            if(this.root) {
                if(this.root.left.value === element) {
                    this.root.left = null;
                    return true;
                }
                this.root.right = null;
                return true;
            }
            
        }
        if(this.left && this.value > element) {
            return this.left.remove(element);            
        }
        if(this.right && this.value < element) {
            return this.right.remove(element);
        }            
        return false; 
    }

    removeAndReturnMax(): T {
        if(this.right) return this.right.removeAndReturnMax();
        if(this.left) {
            this.root.left = this.left;
            this.left.root = this.root;
            return this.value;
        }
        this.root.left = null;
        return this.value;
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
    
    remove(value: T): void {
        if(this.root) {
            if(this.root.left || this.root.right) {
                console.log(this.root.remove(value));
                return;
            }
            if(this.root.value === value) {
                this.root = null;
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
MyTree.add(10);
MyTree.add(5);
MyTree.add(20);
MyTree.add(17);
MyTree.add(18);
MyTree.add(16);
MyTree.add(3);
MyTree.add(7);
// MyTree.add(2);
// MyTree.add(4);
// MyTree.add(8);
// MyTree.add(3);

MyTree.remove(44);

MyTree.print();