import { swap } from "../../../utils/utils";
const reverseString = (string: string): Array<string[]> => {
  const mid = Math.ceil(string.length / 2);
  const array = string.split("");
  const steps: Array<string[]> = [[...array]];
  for (let i = 0; i < mid; i++) {
    let j = string.length - 1 - i;
    if (string.length === 1) {
    } else if (i < j) {
      swap(array, i, j);
      steps.push([...array]);
    }
  }
  return steps;
};

describe("test reverse string", () => {
    it('with an even number of characters', () => {
        expect(reverseString('4321')).toEqual([['4', '3', '2', '1'], ['1', '3', '2', '4'], ['1','2', '3', '4']])
    })

    it('with an odd number of characters.', () => {
        expect(reverseString('123')).toEqual([['1', '2', '3'], ['3', '2', '1'], ])
    })

    it('with one character', () => {
        expect(reverseString('1')).toEqual([['1']])
    })

    it('empty line', () => {
        expect(reverseString('')).toEqual([[]])
    })
});
