import { PropsWithChildren } from 'react'

import { ISelectButtonProps } from './ISelectButton'

const SelectButton = ({ children, selected, onClick }: PropsWithChildren<ISelectButtonProps>) => {
  return (
    <span
      onClick={onClick}
      className={`border border-gold rounded p-2 pl-5 pr-5 font-montserrat cursor-pointer text-white ${
        selected
          ? "bg-gold text-black font-semibold"
          : "bg-transparent text-black font-medium"
      } hover:bg-gold hover:text-black`}
    >
      {children}
    </span>
  )
}

export default SelectButton
