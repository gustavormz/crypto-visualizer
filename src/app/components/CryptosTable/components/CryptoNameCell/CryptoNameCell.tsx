import Link from 'next/link'
import Image from 'next/image'

import { ICryptoNameCellProps } from './ICryptoNameCell'

const CryptoNameCell = ({ image, name, id, symbol }: ICryptoNameCellProps) => {
  return (
    <td className="flex items-center gap-2 justify-center py-4">
      <Link className="flex flex-col items-center" href={`/coins/${id}`}>
        <div className="relative h-10 w-10">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <span className="uppercase text-xs lg:text-lg">{symbol}</span>
        <span className="text-darkgray text-xs lg:text-lg">{name}</span>
      </Link>
    </td>
  )
}

export default CryptoNameCell
