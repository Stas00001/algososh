export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (index: number) => void;
  returnList: () => T[]
  getSize: () => number
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  size: number;
  private tail: Node<T> | null;
  constructor(elements?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements?.length) {
      elements?.forEach((item) => {
        this.append(item);
      });
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex: number = 0;
        let prev: Node<T> | null = null;

        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++;
        }
        prev!.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }
  deleteByIndex = (index: number) => {
    let curr: Node<T> | null = this.head;
    let previous = curr;
    if (previous && curr) {
      if (curr === this.head) {
        this.head = this.head.next;
      } else if (curr === this.tail) {
        previous.next = null;
        this.tail = previous;
      } else {
        previous.next = curr.next;
      }
    }
    this.size--;
  };

  append(element: T) {
    const node: Node<T> | null = new Node(element);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.size++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
    return this;
  }
  prepend = (element: T) => {
    const node = new Node(element);
    if (!this.head || !this.tail) {
      this.head = node;
      this.head.next = null;
      this.tail = node;
    }
    node.next = this.head;
    this.head = node;
  };
  deleteHead = () => {
    if (!this.head) {
      return null;
    }
    const node: Node<T> | null = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    return node;
  };
  deleteTail = () => {
    if (!this.tail) {
      return null;
    }
    let node = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node;
    }
    let curr : Node<T> | null = this.head;
    while (curr?.next) {
      if (!curr?.next.next) {
        this.tail = curr;
        curr.next = null;
      } else {
        curr = curr.next;
      }
    }
    this.size--;
  };
  returnList = () => {
    let curr : Node<T> | null = this.head;
    let res: T[] = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  };
  getSize = () => this.size;
}

export default LinkedList;
