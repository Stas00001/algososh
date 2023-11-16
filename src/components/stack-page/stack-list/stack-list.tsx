import { FC } from "react";
import { Circle } from "../../ui/circle/circle";
import { TArraySort } from "../../../utils/utils";
import style from '../stack-page.module.css'
type TProps = {
    arr: TArraySort[]
}

const StackList:FC<TProps> = ({arr}) => {
    return (
        <ul className={style.list}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li className="" key={index}>
                <Circle
                  letter={String(item.num)}
                  state={item.color}
                  head={index === arr?.length - 1 ? "top" : undefined}
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    )}

export default StackList