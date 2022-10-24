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

    print(node: NodeDL<T>) {
        let result = `${node.value}`;
        if (node.next) result += ` ${node.print(node.next)}`;
        return result;
    }
}

class DSList<T> {
    root: NodeDL<T>;
    length = 0;

    constructor(value?: T) {
        if (value) this.createRoot(value);
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
newList.add(1);
newList.add(2);
newList.add(3);
newList.add(4);
newList.add(5);
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

