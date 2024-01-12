import React, { createContext, useContext, useEffect, useState, useMemo, PropsWithChildren } from 'react'

interface ICryptoContext {
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
  symbol: string
}

const CryptoContext = createContext<ICryptoContext | undefined>(undefined)

const CryptoContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('$')

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹')
    else setSymbol('$')
  }, [currency])

  const value = useMemo(() => ({ currency, setCurrency, symbol }), [currency, symbol])

  return (
    <CryptoContext.Provider
      value={value}
    >
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContextProvider

export const CryptoState = () => {
  return useContext(CryptoContext)!
}
