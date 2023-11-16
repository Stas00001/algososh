import { FC } from "react"
import { Column } from "../../ui/column/column"
import { TArraySort } from "../../../utils/utils"
import style from '../sorting-page.module.css'

type TProps = {
    arr: TArraySort[]
}

const SortingList : FC<TProps> = ({arr}) => {

    return (
        <ul className={style.list}>
            {arr && arr?.map((item, index) => {
                return (
                    <li key={index}>
                        <Column index={item.num} state={item.color} />
                    </li>
                )
            })

            }
        </ul>
    )
}

export default SortingList