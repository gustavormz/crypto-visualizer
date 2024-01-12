import axios from 'axios'

import CONSTANTS from './config'

import {
  IGetCoinListProps,
  IGetCoinInfoProps,
  IGetCoinMarketChartProps,
  IGetTopCoinsByPriceChangeProps,
  IGetCoinListResponse,
  IGetCoinInfoResponse,
  IGetCoinMarketChartResponse,
  IGetTopCoinsByPriceChangeResponse,
} from './icoingecko'

const getCoinList = async ({
  currency,
  page = 1,
  perPage = 100,
}: IGetCoinListProps): Promise<IGetCoinListResponse[]> => {
  if (!currency) {
    throw new Error('Currency is required')
  }

  try {
    const response = await axios.get(`${CONSTANTS.COINGECKO_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`)
    
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error getting the information from CoinGecko API')
    }
  } catch (error) {
    console.error('Resquest error on CoinGecko API:', error)
    throw error
  }
}

const getCoinInfo = async ({
  id,
}: IGetCoinInfoProps): Promise<IGetCoinInfoResponse> => {
  if (!id) {
    throw new Error('An ID is required.');
  }

  try {
    const response = await axios.get(`${CONSTANTS.COINGECKO_BASE_URL}/coins/${id}`);
    
    if (response.status === 200) {
      // Return only the data from the response
      return response.data;
    } else {
      throw new Error('Error geting data from CoinGecko API');
    }
  } catch (error) {
    console.error('Error while making a request to the CoinGecko API:', error);
    throw error;
  }
};

const getCoinMarketChart = async ({
  id,
  currency,
  days = 365,
}: IGetCoinMarketChartProps): Promise<IGetCoinMarketChartResponse> => {
  if (!id || !currency || isNaN(days) || days <= 0) {
    throw new Error('Invalid parameters. Please provide a valid ID, currency, and a positive number of days.')
  }

  try {
    const response = await axios.get(`${CONSTANTS.COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
    
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error geting market chart data from CoinGecko API')
    }
  } catch (error) {
    console.error('Error while making a request to the CoinGecko API:', error)
    throw error
  }
}

const getTopCoinsByPriceChange = async ({
  currency,
}: IGetTopCoinsByPriceChangeProps): Promise<IGetTopCoinsByPriceChangeResponse[]> => {
  if (!currency) {
    throw new Error('Currency is required.')
  }

  try {
    const response = await axios.get(`${CONSTANTS.COINGECKO_BASE_URL}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
    
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error geting top coins by price change from CoinGecko API')
    }
  } catch (error) {
    console.error('Error while making a request to the CoinGecko API:', error)
    throw error
  }
}

export {
  getCoinList,
  getCoinInfo,
  getCoinMarketChart,
  getTopCoinsByPriceChange,
}
