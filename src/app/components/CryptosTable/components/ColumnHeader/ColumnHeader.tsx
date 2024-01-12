import { IColumnHeaderProps } from './IColumnHeader'

const ColumnHeader = ({ title }: IColumnHeaderProps) => {
  return (
    <th
      className="text-black font-semibold font-montserrat py-6 pr-2 text-xs lg:text-base"
      key={title}
      align={title === "Coin" ? "center" : "right"}
    >
      {title}
    </th>
  )
}

export default ColumnHeader
