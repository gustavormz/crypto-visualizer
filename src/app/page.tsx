'use client'

import CryptoContextProvider from "./context/base"

import CryptosTable from "@/app/components/CryptosTable"

const App = () => {

  return (
    <CryptoContextProvider>
      <div>
        <CryptosTable />
      </div>
    </CryptoContextProvider>
  )
}

export default App