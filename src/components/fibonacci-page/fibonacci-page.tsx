import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-style.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormField } from "../../hooks/useFormField";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import FibList from "./fib-list/fib-list";

type FormStateType = {
  num: string;
};

const initialFormState: FormStateType = {
  num: "",
};

export const FibonacciPage: React.FC = () => {
  const { values, onChange } = useFormField<FormStateType>(initialFormState);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [arrFib, setArrFib] = React.useState<number[]>([]);

  const fib = (n: number): number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const animFib = async (n: string) => {
    setLoader(true);
    await delay(SHORT_DELAY_IN_MS);
    let arr = fib(Number(n));
    for (let i = 0; i <= arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setArrFib(arr.slice(0, i));
    }
    setLoader(false);
    values.num = "";
  };

  const submitFib = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    animFib(values.num)
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.container}>
        <form onSubmit={submitFib} className={style.form}>
          <Input
            min={1}
            max={19}
            isLimitText={true}
            name="num"
            type="number"
            value={values.num}
            onChange={onChange}
          ></Input>
          <Button
            type={"submit"}
            text="Рассчитать"
            isLoader={loader}
            disabled={!values.num || Number(values.num) > 19}
          ></Button>
        </form>
        <FibList arr={arrFib}></FibList>
      </div>
    </SolutionLayout>
  );
};
