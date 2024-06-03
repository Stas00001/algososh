import { Await } from "react-router-dom";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/element-states";
import { TArraySort } from "../../../utils/utils";
import { swap } from "../../../utils/utils";
import { delay } from "../../../utils/utils";
const setArr = jest.fn();
jest.setTimeout(30000);

const selectionSort = async (
  array: TArraySort[],
  setArr: any,
  sorting: Direction
) => {
  if (array.length > 1) {
    for (let i = 0; i < array.length; i++) {
      let indexMin = i;

      for (let j = i + 1; j < array.length; j++) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setArr([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (array[j].num < array[indexMin].num) {
            indexMin = j;
            swap(array, j, indexMin);
            setArr([...array]);
          }
        }
        if (sorting === Direction.Descending) {
          if (array[j].num > array[indexMin].num) {
            indexMin = j;
            swap(array, j, indexMin);
            setArr([...array]);
          }
        }
        array[i].color = ElementStates.Default;
        array[j].color = ElementStates.Default;
        setArr([...array]);
      }
      array[indexMin].color = ElementStates.Modified;
      swap(array, i, indexMin);
      setArr([...array]);
    }
  }
};

const bubbleSort = async (
  array: TArraySort[],
  setArr: any,
  sorting: Direction
) => {
  if (array.length > 1) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].color = ElementStates.Changing;
        array[j + 1].color = ElementStates.Changing;
        setArr([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (array[j].num > array[j + 1].num) {
            swap(array, j + 1, j);
          }
        }
        if (sorting === Direction.Descending) {
          if (array[j].num < array[j + 1].num) {
            swap(array, j, j + 1);
          }
        }
        array[j].color = ElementStates.Default;
        array[j + 1].color = ElementStates.Default;
        setArr([...array]);
      }
      array[array.length - i - 1].color = ElementStates.Modified;
      setArr([...array]);
    }
    setArr([...array]);
  }
};

describe("test sorting ascending", () => {
  it("empty array selectionSort", async () => {
    await selectionSort([], setArr, Direction.Ascending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("empty array bubbleSort", async () => {
    await bubbleSort([], setArr, Direction.Ascending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it("with one element selectionSort", async () => {
    await selectionSort(
      [{ num: 1, color: ElementStates.Default }],
      setArr,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("with one element bubbleSort", async () => {
    await bubbleSort(
      [{ num: 1, color: ElementStates.Default }],
      setArr,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("with some elements", async () => {
    await selectionSort(
      [
        { num: 0, color: ElementStates.Modified },
        { num: 4, color: ElementStates.Modified },
        { num: 3, color: ElementStates.Modified },
        { num: 8, color: ElementStates.Modified },
        { num: 6, color: ElementStates.Modified },
      ],
      setArr,
      Direction.Ascending
    );

    expect(setArr).toHaveBeenLastCalledWith([
      { num: 0, color: ElementStates.Modified },
      { num: 3, color: ElementStates.Modified },
      { num: 4, color: ElementStates.Modified },
      { num: 6, color: ElementStates.Modified },
      { num: 8, color: ElementStates.Modified }
    ]);
  });

  it("with some elements", async () => {
    await bubbleSort(
      [
        { num: 0, color: ElementStates.Modified },
        { num: 4, color: ElementStates.Modified },
        { num: 3, color: ElementStates.Modified },
        { num: 8, color: ElementStates.Modified },
        { num: 6, color: ElementStates.Modified },
      ],
      setArr,
      Direction.Ascending
    );
    expect(setArr).toHaveBeenLastCalledWith([
      { num: 0, color: ElementStates.Modified },
      { num: 3, color: ElementStates.Modified },
      { num: 4, color: ElementStates.Modified },
      { num: 6, color: ElementStates.Modified },
      { num: 8, color: ElementStates.Modified }
    ]);
  });
});

describe("test sorting descending", () => {
  it("empty array selectionSort descending", async () => {
    await selectionSort([], setArr, Direction.Descending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("empty array bubbleSort descending", async () => {
    await bubbleSort([], setArr, Direction.Descending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("with one element selectionSort", async () => {
    await selectionSort(
      [{ num: 1, color: ElementStates.Default }],
      setArr,
      Direction.Descending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("with one element bubbleSort", async () => {
    await bubbleSort(
      [{ num: 1, color: ElementStates.Default }],
      setArr,
      Direction.Descending
    );
    expect(setArr).toHaveBeenCalledTimes(0);
  });
  it("with some elements", async () => {
    await selectionSort(
      [
        { num: 0, color: ElementStates.Modified },
        { num: 4, color: ElementStates.Modified },
        { num: 3, color: ElementStates.Modified },
        { num: 8, color: ElementStates.Modified },
        { num: 6, color: ElementStates.Modified },
      ],
      setArr,
      Direction.Descending
    );

    expect(setArr).toHaveBeenLastCalledWith([
        { num: 8, color: ElementStates.Modified },
        { num: 6, color: ElementStates.Modified },
        { num: 4, color: ElementStates.Modified },
        { num: 3, color: ElementStates.Modified },
        { num: 0, color: ElementStates.Modified }
    ]);
  });

  it("with some elements", async () => {
    await bubbleSort(
      [
        { num: 0, color: ElementStates.Modified },
        { num: 4, color: ElementStates.Modified },
        { num: 3, color: ElementStates.Modified },
        { num: 8, color: ElementStates.Modified },
        { num: 6, color: ElementStates.Modified },
      ],
      setArr,
      Direction.Descending
    );
    expect(setArr).toHaveBeenLastCalledWith([
      { num: 8, color: ElementStates.Modified },
      { num: 6, color: ElementStates.Modified },
      { num: 4, color: ElementStates.Modified },
      { num: 3, color: ElementStates.Modified },
      { num: 0, color: ElementStates.Modified }
    ]);
  });
});
