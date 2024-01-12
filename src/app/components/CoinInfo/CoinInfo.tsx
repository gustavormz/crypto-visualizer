import { useEffect, useState, useMemo } from 'react'
import { Chart } from 'react-google-charts'

import { CryptoState } from '@/app/context/base'
import { getCoinMarketChart } from '@/api/coingecko'
import { IGetCoinMarketChartResponse } from '@/api/icoingecko'

import LoadingIndicator from '@/app/components/LoadingIndicator'
import SelectButton from '@/app/components/SelectButton'

import { chartDays } from './data'
import { ICoinInfoProps } from './ICoinInfo'

const CoinInfo = ({ coin }: ICoinInfoProps) => {
  const [historicData, setHistoricData] = useState<IGetCoinMarketChartResponse["prices"]>()

  const [days, setDays] = useState(1)
  const { currency } = CryptoState()
  const [flag, setFlag] = useState(false)

  const chartData = useMemo(() => {
    if (!historicData) {
      return []
    }
    return historicData.map(([timestamp, price]) => [
      new Date(timestamp),
      price,
    ])
  }, [historicData])

  const chartDataFormatted = useMemo(() => {
    if (!chartData) {
      return []
    }
    return [['Date', 'Price'], ...chartData]
  }, [chartData]);

  const options = {
    legend: 'none',
  }

  useEffect(() => {
    const fetchHistoricData = async () => {
      const data = await getCoinMarketChart({ id: coin.id, days, currency })
      setFlag(true)
      setHistoricData(data.prices)
    }
    fetchHistoricData()
  }, [coin.id, currency, days])

  if (!historicData || !flag || !historicData.length || !chartData.length || !chartDataFormatted.length) {
    return (
      <div className="w-full text-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="w-75 md:w-full flex flex-col items-center justify-center mt-4 md:mt-0 p-4">
      <Chart
        chartType="LineChart"
        data={chartDataFormatted}
        options={options}
        width="100%"
        height="400px"
      />
      <div className="flex mt-4 justify-around w-full">
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              setDays(day.value);
              setFlag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </div>
  )
}

export default CoinInfo