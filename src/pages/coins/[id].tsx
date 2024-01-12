'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { getCoinInfo } from '@/api/coingecko'
import { IGetCoinInfoResponse } from '@/api/icoingecko'

import LoadingIndicator from '@/app/components/LoadingIndicator'

import CoinInfo from '@/app/components/CoinInfo'

import { numberWithCommas } from '@/app/utils'

import CryptoContextProvider from "@/app/context/base"

import '@/app/globals.css'

const CoinPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [coin, setCoin] = useState<IGetCoinInfoResponse>()
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('$')

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹')
    else setSymbol('$')
  }, [currency])

  useEffect(() => {
    if (!id || coin) return
    const fetchCoin = async () => {
      const data = await getCoinInfo({ id: id as string })
      setCoin(data)
    }
    fetchCoin()
  }, [coin, id])

  return (
    <CryptoContextProvider>
      <div className='p-4'>
        {!coin ? (
          <div className="w-full text-center h-full">
            <LoadingIndicator />
          </div>
        ): (
          <div className="flex flex-col md:flex-row md:items-center bg-black">
            <div className="w-full md:w-1/3 border-r border-gray-400 md:border-0 md:mr-4 md:mb-0 md:mt-4 flex flex-col items-center">
              <Image
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                width="200"
                className="mb-4"
              />
              <span className="font-bold mb-4">
                {coin?.name}
              </span>
              <p className="w-full p-4 pb-0">
                {coin?.description.en.split(". ")[0]}
              </p>
              <div className="p-4 pt-0 md:flex md:justify-around md:items-center md:flex-col md:text-center md:space-y-4 md:mt-4">
                <div className="flex">
                  <span className="font-bold">
                    Rank:
                  </span>
                  <span className="font-montserrat">
                    {numberWithCommas(coin?.market_cap_rank)}
                  </span>
                </div>

                <div className="flex">
                  <span className="font-bold">
                    Current Price:
                  </span>
                  <span className="font-montserrat">
                    {symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                  </span>
                </div>

                <div className="flex">
                  <span className="font-bold">
                    {`Market Cap: `}
                  </span>
                  <span className="font-montserrat">
                    {" "}{symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                    M
                  </span>
                </div>
              </div>
            </div>
            <CoinInfo coin={coin} />
          </div>
        )}
      </div>
    </CryptoContextProvider>
  )
}

export default CoinPage