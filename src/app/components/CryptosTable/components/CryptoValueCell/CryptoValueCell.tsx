import Link from 'next/link'

import { numberWithCommas } from '@/app/utils'

import { ICryptoValueCellProps } from './ICryptoValueCell'

const CryptoValueCell = ({ current_price, id, symbol, market_cap }: ICryptoValueCellProps) => {
  return (
    <td className="text-right">
      <Link href={`/coins/${id}`}>
        <span className="text-xs lg:text-lg">
          {symbol} {current_price && numberWithCommas(current_price.toFixed(2))}
          {market_cap && `${numberWithCommas(market_cap.toString().slice(0, -6))} M`}
        </span>
      </Link>
    </td>
  )
}

export default CryptoValueCell
