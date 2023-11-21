import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TArraySort, delay, randomArr } from "../../utils/utils";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import SortingList from "./sorting-list/sorting-list";
export const SortingPage: React.FC = () => {
  const [radioInput, setRadioInput] = React.useState<string>("choice");
  const [loader, setLoader] = React.useState<boolean>(false);
  const [arr, setArr] = React.useState<TArraySort[]>(randomArr(3, 8, 100));
  const [sorting, setSorting] = React.useState<Direction>()
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInput(e.target.value);
  };
  const selectionSort = async (array: TArraySort[], sorting: Direction) => {
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
    setLoader(false);
    setDisabled(false)

  };

  const bubbleSort = async (array: TArraySort[], sorting: Direction) => {
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
    setLoader(false);
    setDisabled(false)

  };

  const onClickRandomArr = () => {
    setArr(randomArr(3, 8, 100));
  };

  const onClickSort = (sorting: Direction) => {
    setSorting(sorting);
    setDisabled(true)
    setLoader(true);
    if (radioInput === "choice") {
      selectionSort(arr, sorting);
    }
    if (radioInput === "bubble") {
      bubbleSort(arr, sorting);
    }
  };
  console.log(sorting)
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <div className={style["container-button"]}>
          <fieldset className={style.fieldset}>
            <RadioInput
              label="Выбор"
              value="choice"
              checked={radioInput === "choice"}
              onChange={OnChange}
            />
            <RadioInput
              label="Пузырёк"
              value="bubble"
              checked={radioInput === "bubble"}
              onChange={OnChange}
            />
          </fieldset>
          <fieldset className={style.fieldset}>
            <Button
              type={"button"}
              sorting={Direction.Ascending}
              text="По возрастанию"
              onClick={() => onClickSort(Direction.Ascending)}
              isLoader={loader && sorting === Direction.Ascending}
              disabled={loader}
            />
            <Button
              type={"button"}
              sorting={Direction.Descending}
              text="По убыванию"
              onClick={() => onClickSort(Direction.Descending)}
              isLoader={loader && sorting === Direction.Descending}
              disabled={loader}
            />
          </fieldset>

          <Button
            type={"button"}
            text="Новый массив"
            onClick={onClickRandomArr}
            disabled={disabled}
          />
        </div>
        <SortingList arr={arr} />
      </div>
    </SolutionLayout>
  );
};
