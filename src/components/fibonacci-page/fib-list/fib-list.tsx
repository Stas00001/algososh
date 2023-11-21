import { FC } from "react";
import { Circle } from "../../ui/circle/circle";
import style from '../fibonacci-style.module.css'
type TPropsFibList = {
  arr: number[];
};
const FibList: FC<TPropsFibList> = ({ arr }) => {
    return (
        <ul className={style.list}>
            {arr && arr?.map((num, index)=> { 
                return (
                <li key={index}>
                    <Circle
                    letter={String(num)}
                    index={index}
                    />
                </li>
                )
            })}
        </ul>
    )
};

export default FibList