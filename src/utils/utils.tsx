import { ElementStates } from "../types/element-states";
export type TArray = {
  value?: string | undefined;
  color: ElementStates;
};

export type TArraySort = {
  num: number;
  color: ElementStates;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const swap = (
  arr: TArray[] | TArraySort[] | string[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
export const getRandomNum = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
export const randomArr = (
  minLength: number,
  maxLength: number,
  max: number
) => {
  return [...new Array(getRandomNum(minLength, maxLength))].map(() => {
    return {
      num: Math.round(Math.random() * max),
      color: ElementStates.Default,
    };
  });
};


