'use client'

import React, { useEffect, useState, useCallback } from 'react'

import { CryptoState } from '@/app/context/base'

import { getCoinList } from '@/api/coingecko'
import { IGetCoinListResponse } from '@/api/icoingecko'

import LoadingIndicator from '../LoadingIndicator'
import ColumnHeader from './components/ColumnHeader'
import CryptoNameCell from './components/CryptoNameCell'
import CryptoValueCell from './components/CryptoValueCell'
import CryptoProfitCell from './components/CryptoProfitCell'

const CryptosTable = () => {
  const [coins, setCoins] = useState<IGetCoinListResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const { currency, symbol } = CryptoState()

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      const data = await getCoinList({ currency })
      setCoins(data)
      setLoading(false)
    }
    fetchCoins()
  }, [currency])

  const handleSearch = useCallback(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
  }, [coins, search])

  if (loading) {
    return (
      <div className="w-full text-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4">
      <h4
        className="text-2xl font-semibold mt-8 mb-4 font-montserrat"
      >
        Cryptocurrency Prices by Market Cap
      </h4>
      <input
        type="text"
        placeholder="Search For a Crypto Currency..."
        className="mb-6 w-full py-4 pl-2 text-black"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <table className="w-full" aria-label="simple table">
          <thead className="bg-[#EEBC1D]">
            <tr>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <ColumnHeader title={head} key={head} />
              ))}
            </tr>
          </thead>

          <tbody>
            {handleSearch()
              .map((row) => {
                return (
                  <tr className="bg-black cursor-pointer hover:bg-darkgray border-b-2 border-white" key={row.name}>
                    <CryptoNameCell id={row.id} image={row?.image} name={row.name} symbol={row.symbol} key={row.id}/>
                    <CryptoValueCell id={row.id} symbol={symbol} current_price={row.current_price} key={row.name} />
                    <CryptoProfitCell price_change_percentage_24h={row.price_change_percentage_24h} />
                    <CryptoValueCell id={row.id} symbol={symbol} market_cap={row.market_cap} key={row.name} />
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CryptosTable
