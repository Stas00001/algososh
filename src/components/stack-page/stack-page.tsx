import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormField } from "../../hooks/useFormField";
import Stack from "./stack";
import { ElementStates } from "../../types/element-states";
import { TArraySort, delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import StackList from "./stack-list/stack-list";
type FormStateType = {
  num: string;
};
type TLoader = {
  add: boolean;
  delete: boolean;
  clear: boolean;
};
const initialFormState: FormStateType = {
  num: "",
};

export const StackPage: React.FC = () => {
  const { values, onChange } = useFormField<FormStateType>(initialFormState);
  const [loader, setLoader] = React.useState<TLoader>({
    add: false,
    delete: false,
    clear: false,
  });
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [arr, setArr] = React.useState<TArraySort[]>([]);
  const [stack] = React.useState(new Stack<TArraySort>());

  const addButton = async () => {
    if (values.num) {
      setDisabled(true);
      setLoader({ ...loader, add: true });
      stack.push({ num: Number(values.num), color: ElementStates.Changing });
      setArr([...stack.returnStack()]);
      values.num = "";
      await delay(SHORT_DELAY_IN_MS);
      stack.peek.color = ElementStates.Default;
      setArr([...stack.returnStack()]);
      setLoader({ ...loader, add: false });
      setDisabled(false);
    }
  };

  const deleteButton = async () => {
    setDisabled(true);
    setLoader({ ...loader, delete: true });
    stack.peek.color = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.returnStack()]);
    setLoader({ ...loader, delete: false });
    setDisabled(false);
  };

  const clearButton = () => {
    setDisabled(true);
    setLoader({ ...loader, clear: true });
    stack.clear();
    setArr([...stack.returnStack()]);
    setLoader({ ...loader, clear: false });
    setDisabled(false);
  };
  console.log(arr);
  return (
    <SolutionLayout title="Стек">
      <div className={style.container}>
        <div className={style.form}>
          <Input
            maxLength={4}
            isLimitText={true}
            type="text"
            name="num"
            value={values.num}
            onChange={onChange}
          ></Input>
          <fieldset className={style.fieldset}>
            <Button
              type={"submit"}
              text="Добавить"
              onClick={addButton}
              isLoader={loader.add}
              disabled={!values.num || disabled}
            ></Button>
            <Button
              type={"submit"}
              text="Удалить"
              onClick={deleteButton}
              isLoader={loader.delete}
              disabled={!values || !arr.length || disabled}
            ></Button>
          </fieldset>
          <Button
            type={"submit"}
            text="Очистить"
            onClick={clearButton}
            isLoader={loader.clear}
            disabled={!values || !arr.length || disabled}
          ></Button>
        </div>
        <StackList arr={arr} />
      </div>
    </SolutionLayout>
  );
};
