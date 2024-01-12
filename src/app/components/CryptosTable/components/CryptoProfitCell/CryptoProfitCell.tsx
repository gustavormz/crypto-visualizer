import { ICryptoProfitCellProps } from './ICryptoProfitCell'

const CryptoProfitCell = ({ price_change_percentage_24h }: ICryptoProfitCellProps) => {
  const profit = price_change_percentage_24h > 0
  return (
    <td
      className={`text-right text-xs lg:text-lg ${profit ? "text-green-500" : "text-red-500"
        } font-semibold`}
    >
      {profit && "+"}
      {price_change_percentage_24h.toFixed(2)}%
    </td>
  )
}

export default CryptoProfitCell
