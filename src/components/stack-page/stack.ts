interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  returnStack: () => T[];
  clear: () => void;
  getSize: () => number;
}

class Stack<T> implements IStack<T> {
  private stack: T[] = [];
  private count: number;

  constructor() {
    this.stack = [];
    this.count = 0;
  }
  push = (item: T): void => {
    this.stack.push(item);
  };

  pop = (): void => {
   this.stack.pop()
  };

  clear = (): void => {
    this.stack = [];
  };
  getSize = () => this.stack.length;

  get peek(): T {
    return this.stack[this.stack.length - 1];
  }

  returnStack = (): T[] => {
    return this.stack;
  };
}

export default Stack;
