import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormField } from "../../hooks/useFormField";
import LinkedList from "./list";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay, getRandomNum } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
type FormStateType = {
  val: string;
  valIndex: string;
};
type TElementStates = {
  modifiedIndex: number;
  changingIndex: number;
};
const initialFormState: FormStateType = {
  val: "",
  valIndex: "",
};
const randomArr = Array.from({ length: getRandomNum(3, 8) }, () =>
  String(getRandomNum(0, 100))
);
enum Location {
  top = "top",
  bottom = "bottom",
}
export const ListPage: React.FC = () => {
  const { values, onChange } = useFormField<FormStateType>(initialFormState);
  const [loader, setLoader] = React.useState({
    addHead: false,
    deleteHead: false,
    addTail: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });
  const list = React.useMemo(() => new LinkedList(randomArr), []);
  const [arr, setArr] = React.useState(list.returnList());
  const [circleIndex, setCircleIndex] = React.useState(-1);
  const [currentElement, setCurrentElement] = React.useState("");
  const [circleLocation, setCircleLocation] = React.useState<
    Location | undefined
  >();
  const [typeElementStates, setTypeElementStates] = React.useState({
    modifiedIndex: -1,
    changingIndex: -1,
  });
  const addButtonHead = async () => {
    setLoader({ ...loader, addHead: true });
    setCurrentElement(values.val);
    setCircleLocation(Location.top);
    setCircleIndex(0);
    await delay(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    list.prepend(values.val);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: 0 });
    setArr(list.returnList());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    values.val = "";
    setLoader({ ...loader, addHead: false });
  };

  const deleteButtonHead = async () => {
    setLoader({ ...loader, deleteHead: true });
    setCurrentElement(arr[0]);
    setCircleLocation(Location.bottom);
    setCircleIndex(0);
    arr.splice(0, 1, "");
    await delay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setCircleIndex(-1);
    setArr(list.returnList());

    setLoader({ ...loader, deleteHead: false });
  };
  const addButtonTail = async () => {
    setLoader({ ...loader, addTail: true });
    setCurrentElement(values.val);
    setCircleLocation(Location.top);
    setCircleIndex(list.getSize());
    await delay(SHORT_DELAY_IN_MS);
    list.append(values.val);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: arr.length });
    setCircleIndex(-1);
    setArr(list.returnList());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    values.val = "";
    setLoader({ ...loader, addTail: false });
  };
  const deleteButtonTail = async () => {
    setLoader({ ...loader, deleteTail: true });
    setCurrentElement(arr[arr.length - 1]);
    setCircleLocation(Location.bottom);
    setCircleIndex(arr.length - 1);
    setArr((arr) => [...arr.slice(0, arr.length - 1), ""]);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setCircleIndex(-1);
    setArr(list.returnList());
    setLoader({ ...loader, deleteTail: false });
  };

  const addButtonIndex = async () => {
    setLoader({ ...loader, addByIndex: true });
    let currentElementIndex = -1;
    let index = Number(values.valIndex);
    while (currentElementIndex <= index) {
      setCurrentElement(values.val);
      setCircleLocation(Location.top);
      setCircleIndex(currentElementIndex - 1);
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex - 1,
      });
      setCurrentElement(values.val);
      setCircleLocation(Location.top);
      setCircleIndex(currentElementIndex);
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    list.insertAt(values.val, index);
    setCircleIndex(-1);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: index });
    setArr(list.returnList());
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, modifiedIndex: -1 });
    setArr(list.returnList());
    values.val = "";
    values.valIndex = "";
    setLoader({ ...loader, addByIndex: false });
  };
  const deleteButtonIndex = async () => {
    setLoader({ ...loader, deleteByIndex: true });
    let index = Number(values.valIndex);
    let currentElementIndex = 0;
    while (currentElementIndex <= index) {
      setTypeElementStates({
        ...typeElementStates,
        changingIndex: currentElementIndex,
      });
      await delay(SHORT_DELAY_IN_MS);
      currentElementIndex++;
    }
    setCurrentElement(arr[index]);
    setCircleLocation(Location.bottom);
    setCircleIndex(index);
    setArr((arr) => [...arr.slice(0, index), "", ...arr.slice(index + 1)]);
    await delay(SHORT_DELAY_IN_MS);
    setTypeElementStates({ ...typeElementStates, changingIndex: -1 });
    setCircleIndex(-1);
    list.deleteByIndex(index);
    setArr(list.returnList());
    values.valIndex = "";
    setLoader({ ...loader, deleteByIndex: false });
  };
  const showHead = (index: number) => {
    return circleIndex === index && circleLocation === Location.top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : undefined;
  };

  const showTail = (index: number) => {
    return circleIndex === index && circleLocation === Location.bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === arr.length - 1 ? (
      "tail"
    ) : undefined;
  };

  const getLetterState = (
    index: number,
    typeElementStates: TElementStates
  ): ElementStates => {
    if (typeElementStates.modifiedIndex === index) {
      return ElementStates.Modified;
    }
    if (typeElementStates.changingIndex >= index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };
  const onChangeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={style.container}>
        <form onSubmit={onChangeForm} className={style.form}>
          <Input
            maxLength={4}
            isLimitText={true}
            name="val"
            value={values.val}
            onChange={onChange}
            extraClass={style.input}
          ></Input>
          <Button
            type={"button"}
            text="Добавить в head"
            onClick={() => {
              addButtonHead();
            }}
            isLoader={loader.addHead}
            disabled={!values.val}
          ></Button>
          <Button
            type={"button"}
            text="Добавить в tail"
            onClick={() => {
              addButtonTail();
            }}
            isLoader={loader.addTail}
            disabled={!values.val}
          ></Button>
          <Button
            type={"button"}
            text="Удалить из head"
            onClick={() => {
              deleteButtonHead();
            }}
            isLoader={loader.deleteHead}
            disabled={arr.length === 0}
          ></Button>
          <Button
            type={"button"}
            text="Удалить из tail"
            onClick={() => {
              deleteButtonTail();
            }}
            isLoader={loader.deleteTail}
            disabled={arr.length === 0}
          ></Button>
        </form>
        <form onSubmit={onChangeForm} className={style.form}>
          <Input
            isLimitText={false}
            name="valIndex"
            value={values.valIndex}
            onChange={onChange}
            extraClass={style.input}
            type="number"
            min="0"
            max={arr.length - 1}
          ></Input>
          <Button
            type={"button"}
            text="Добавить по индексу"
            isLoader={loader.addByIndex}
            extraClass={style.button}
            onClick={() => {
              addButtonIndex();
            }}
            disabled={
              !values.val ||
              !values.valIndex ||
              Number(values.valIndex) > arr.length - 1
            }
          ></Button>
          <Button
            type={"button"}
            text="Удалить по индексу"
            isLoader={loader.deleteByIndex}
            onClick={() => {
              deleteButtonIndex();
            }}
            disabled={
              !values.valIndex || Number(values.valIndex) > arr.length - 1
            }
            extraClass={style.button}
          ></Button>
        </form>
        <ul className={style.list}>
          {arr &&
            arr?.map((item, index) => {
              return (
                <li key={index} className={style["list-item"]}>
                  <Circle
                    letter={item}
                    head={showHead(index)}
                    tail={showTail(index)}
                    state={getLetterState(index, typeElementStates)}
                    index={index}
                  />
                  {index !== arr?.length - 1 && <ArrowIcon />}
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
