import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./string.module.css";
import { useFormField } from "../../hooks/useFormField";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import StringList from "./string-list/string-list";
type FormStateType = {
  string: string;
};

const initialFormState: FormStateType = {
  string: "",
};

export const StringComponent: React.FC = () => {
  const { values, onChange } = useFormField<FormStateType>(initialFormState);
  const [arrStr, setArrStr] = React.useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [loader, setLoader] = React.useState<boolean>(false);

  const reverseString = async (str: string) => {
    const mid = Math.ceil(str.length / 2);
    const array = values.string.split("");
    for (let i = 0; i < mid; i++) {
      let j = str.length - 1 - i;
      if (str.length === 1) {
        setArrStr([...array]);
      } else if (i < j) {
        setArrStr([...array]);
        await delay(DELAY_IN_MS);
        setCurrentIndex(i + 1);
        swap(array, i, j);
        setArrStr([...array]);
      }
      setArrStr([...array]);
    }
    setLoader(false);
  };

  const onSubmitString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentIndex(0);
    setLoader(true);
    reverseString(values.string);
    values.string = ''
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.container}>
        <form onSubmit={onSubmitString} className={style.form}>
          <Input
            maxLength={11}
            isLimitText={true}
            name="string"
            value={values.string}
            onChange={onChange}
          ></Input>
          <Button
            type={"submit"}
            text="Развернуть"
            isLoader={loader}
            disabled={!values}
          ></Button>
        </form>
        <StringList
          arrStr={arrStr}
          currentIndex={currentIndex}
        ></StringList>
      </div>
    </SolutionLayout>
  );
};
