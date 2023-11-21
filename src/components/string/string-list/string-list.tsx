import { FC } from "react";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "../../ui/circle/circle";
import style from '../string.module.css'
type TProps = {
  arrStr: string[];
  currentIndex: number;
};

const StringList: FC<TProps> = ({ arrStr, currentIndex }) => {
  const getState = (index: number, currentIndex: number, length: number) => {
    if (
      currentIndex > index ||
      currentIndex > length - index - 1 ||
      length === 1 ||
      currentIndex === Math.floor(length / 2)
    ) {
      return ElementStates.Modified;
    }
    if (currentIndex === index || currentIndex === length - index - 1) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <ul className={style.list}>
      {arrStr &&
        arrStr?.map((str, index) => {
          return (
            <li key={index}>
              <Circle
                letter={str}
                state={getState(index, currentIndex, arrStr.length)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default StringList;
