import { FC } from "react";
import style from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


type TProps = {
  arr: string[] | null [];
  tail: number;
  head: number;
  isEmpty: boolean;
  element: number;
};
const QueueList: FC<TProps> = ({ arr, tail, head, isEmpty, element }) => {
  return (
    <ul className={style.list}>
      {arr &&
        arr?.map((item, index) => {
          return (
            <li className="" key={index}>
              <Circle
                letter={item ? item : ''}
                state={
                  index === element
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={index === Number(head) && isEmpty ? "head" : ""}
                tail={index === Number(tail) && isEmpty ? "tail" : ""}
                index={index}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default QueueList;
