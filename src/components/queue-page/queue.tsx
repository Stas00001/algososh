interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const removedItem = this.container[this.head];
    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
    return removedItem;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;
  getContainer = () => this.container
  getHead = () => this.head;
  getTail = () => this.tail;
  getSize = () => this.length
  clear = () => {
    this.container = []
    this.length = 0;
    this.head = 0;
    this.tail = 0
};
}

export default Queue;
