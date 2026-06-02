// src/hooks/useStockData.js
import { useState, useEffect, useCallback } from 'react'
import {
  fetchAllStocks,
  fetchSentimentHistory,
  fetchNews,
  fetchPrediction,
  fetchSentiment,
} from '../services/api.js'
import { STOCKS_DATA, SENTIMENT_HISTORY, NEWS_DATA } from '../data/stocks.js'

export function useStockData(activeStock) {
  const [stocks, setStocks] = useState(STOCKS_DATA)
  const [sentimentHistory, setSentimentHistory] = useState(SENTIMENT_HISTORY)
  const [news, setNews] = useState(NEWS_DATA)
  const [prediction, setPrediction] = useState(null)
  const [sentiment, setSentiment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load global data sekali saat mount
  useEffect(() => {
    async function loadGlobal() {
      const [allStocks, history, latestNews] = await Promise.all([
        fetchAllStocks(),
        fetchSentimentHistory(),
        fetchNews(),
      ])
      if (allStocks) setStocks(allStocks)
      if (history)   setSentimentHistory(history)
      if (latestNews) setNews(latestNews)
    }
    loadGlobal()
  }, [])

  // Load data spesifik saat activeStock berubah
  const loadStockDetail = useCallback(async () => {
    if (!activeStock) return
    setLoading(true)
    setError(null)
    try {
      const [pred, sent] = await Promise.all([
        fetchPrediction(activeStock),
        fetchSentiment(activeStock),
      ])
      setPrediction(pred)
      setSentiment(sent)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [activeStock])

  useEffect(() => {
    loadStockDetail()
  }, [loadStockDetail])

  const currentStock = stocks[activeStock] || STOCKS_DATA[activeStock]

  return {
    stocks,
    currentStock,
    sentimentHistory,
    news,
    prediction,
    sentiment,
    loading,
    error,
    refetch: loadStockDetail,
  }
}
