import {Comparators, MyComparator} from "./comparators";

class NodeDL<T> {
    value: T;
    next?: NodeDL<T>;
    prev?: NodeDL<T>;

    constructor(value: T) {
        this.value = value;
    }

    add(value: T): void {
        if (this.next) {
            this.next.add(value);
            return;
        }
        this.next = new NodeDL<T>(value);
        this.next.prev = this;
    }

    removeByIndex(index: number): boolean {
        if (index > 0 && this.next) {
            return this.next.removeByIndex(index - 1);
        }
        return this.removeThisNode();
    }

    removeByValue(value: T): boolean {
        if (this.value === value) {
            return this.removeThisNode();
        }
        if (this.next) {
            return this.next.removeByValue(value);
        }
        console.log(`Element by value ${value} not found`);
        return false;
    }

    private removeThisNode(): boolean {
        if (this.next) {
            this.next.prev = this.prev;
            this.prev.next = this.next;
            return true;
        }
        this.prev.next = null;
        return true;
    }
    
    print(node: NodeDL<T>, accumulator: string = ''): string {
        if (node.next) return node.print(node.next, `${accumulator}${node.value} `);
        return `${accumulator}${node.value}`;
    }
}

class DSList<T> {
    root: NodeDL<T>;
    length = 0;

    constructor(value?: T) {
        if (value) this.createRoot(value);
    }

    sort(comparator: Comparators<T>): void {
        let node: NodeDL<T>;
        let tempValue: T;
        let stepMax = this.length - 1;
        let steps = 0;

        if (this.length === 1 || this.length === 0) {
            return;
        }

        while (stepMax) {
            node = this.root;
            steps = stepMax;
            while (steps) {
                if (comparator(node.value, node.next.value) === -1) {
                    tempValue = node.value;
                    node.value = node.next.value;
                    node.next.value = tempValue;
                    node = node.next
                    steps--;
                    continue;
                }
                node = node.next;
                steps--;
            }
            stepMax--;
        }
    }

    add(value: T): void {
        this.length++;
        if (this.root) {
            this.root.add(value);
            return;
        }
        this.createRoot(value);
    }

    removeByIndex(index: number): boolean {
        if (index > this.length - 1) {
            console.log(`Element by index ${index} not found`);
            return false;
        }
        if (index === 0) {
            return this.removeRoot();
        }
        this.length--;
        return this.root.removeByIndex(index);
    }

    removeByValue(value: T): boolean {
        if (this.root.value === value) {
            return this.removeRoot();
        }
        const result = this.root.removeByValue(value);
        if (result) {
            this.length--;
            return true;
        }
        return false;
    }

    toString(): string {
        if (this.length === 0) {
            return 'List is empty'
        }
        return this.root.print(this.root);
    }

    private removeRoot() {
        this.length--;
        if (this.root.next) {
            this.root.next.prev = null;
            this.root = this.root.next;
            return true;
        }
        this.root = null;
        return true;
    }

    private createRoot(value: T) {
        this.root = new NodeDL<T>(value);
    }
}

const newList = new DSList<number>(0);

for (let i = 1; i < 7000; i++) {
    newList.add(i);
}
console.log(newList.toString());
console.log(`length is ${newList.length}\n`);

newList.sort(MyComparator);

console.log(newList.toString());
console.log(`length is ${newList.length}\n`);

// const index = 5;
//
// console.log(`Removing by index ${index}`);
// console.log(newList.removeByIndex(index));
// console.log(newList.toString());
// console.log(`length is ${newList.length}\n`);
//
// const value = 12;
//
// console.log(`Removing by value ${value}`);
// console.log(newList.removeByValue(value));
// console.log(newList.toString());
// console.log(`length is ${newList.length}`);

