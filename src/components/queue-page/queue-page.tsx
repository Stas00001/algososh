import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormField } from "../../hooks/useFormField";
import Queue from "./queue";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import QueueList from "./queue-list";
type FormStateType = {
  num: string;
};
type TLoader = {
  add: boolean;
  delete: boolean;
  clear: boolean;
};

type TQueue = {
  num: string;
};
const initialFormState: FormStateType = {
  num: "",
};
const defaultArr = new Array(7).fill(null);

export const QueuePage: React.FC = () => {
  const { values, onChange } = useFormField<FormStateType>(initialFormState);
  const [loader, setLoader] = React.useState<TLoader>({
    add: false,
    delete: false,
    clear: false,
  });
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [arr, setArr] = React.useState<(string | null)[]>(defaultArr);
  const [queue, setQueue] = React.useState(new Queue<string>(7));
  const [index, setIndex] = React.useState(-1)

  const addButton = async () => {
    setLoader({ ...loader, add: true });
    setDisabled(true);
    setIndex(queue.getTail())
    queue.enqueue(values.num)
    setArr([...queue.getContainer()])
    await delay(SHORT_DELAY_IN_MS)
    values.num = ""
    setIndex(-1)
    setLoader({ ...loader, add: false });
    setDisabled(false);
  };

  const deleteButton = async () => {
    setLoader({ ...loader, delete: true });
    setDisabled(true);
    setIndex(queue.getHead())
    await delay(SHORT_DELAY_IN_MS)
    queue.dequeue()
    setArr([...queue.getContainer()])
    setIndex(-1)
    setLoader({ ...loader, delete: false });
    setDisabled(false);
  };

  const clearButton = () => {
    setLoader({ ...loader, clear: true });
    setDisabled(true);
    queue.clear()
    setArr(defaultArr)
    setLoader({ ...loader, clear: false });
    setDisabled(false);

  }
  
  return (
    <SolutionLayout title="Очередь">
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
              disabled={!values.num || disabled || queue.getSize() === 7 }
            ></Button>
            <Button
              type={"submit"}
              text="Удалить"
              onClick={deleteButton}
              isLoader={loader.delete}
              disabled={!values || queue.isEmpty() || disabled || queue.isEmpty()}
            ></Button>
          </fieldset>
          <Button
            type={"submit"}
            text="Очистить"
            onClick={clearButton}
            isLoader={loader.clear}
            disabled={!values || !arr.length || disabled || queue.isEmpty()}
          ></Button>
        </div>
        <QueueList arr={arr} tail={queue.getTail() - 1} head={queue.getHead()} isEmpty ={!queue.isEmpty()} element={index}/>
      </div>
    </SolutionLayout>
  );
};
