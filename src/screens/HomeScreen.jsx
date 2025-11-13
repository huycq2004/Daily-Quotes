import React, { useState, useEffect, useRef } from 'react'
import { Heart, RefreshCw } from 'lucide-react'
import { getRandomQuote } from '../services/quoteService'
import { addFavorite, removeFavorite, isFavorite } from '../services/storageService'

export default function HomeScreen() {
  const [quote, setQuote] = useState(null)
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [key, setKey] = useState(0)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    // Only load quote once on first mount (prevent React StrictMode double call)
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      loadNewQuote()
    }
  }, [])

  const loadNewQuote = async () => {
    setLoading(true)
    setError(null)
    setKey(prev => prev + 1)
    
    try {
      console.log('Loading quote...')
      const newQuote = await getRandomQuote()
      console.log('Quote loaded:', newQuote)
      setQuote(newQuote)
      
      const favStatus = await isFavorite(newQuote.id)
      setIsFav(favStatus)
    } catch (error) {
      console.error('Error loading quote:', error)
      setError(error.message || 'Failed to load quote')
      setQuote(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    if (!quote) return
    
    try {
      if (isFav) {
        await removeFavorite(quote.id)
        setIsFav(false)
      } else {
        await addFavorite(quote)
        setIsFav(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      {/* Loading State */}
      {loading && !quote && (
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 min-h-80 flex flex-col items-center justify-center border border-purple-500 border-opacity-50">
            <div className="animate-spin">
              <RefreshCw size={40} className="text-yellow-400" />
            </div>
            <p className="text-white mt-4 text-lg">Đang tải danh ngôn...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl shadow-2xl p-8 min-h-80 flex flex-col items-center justify-center border border-red-500 border-opacity-50">
            <p className="text-white text-lg font-semibold mb-4">❌ Lỗi</p>
            <p className="text-red-200 text-center mb-6">{error}</p>
            <button
              onClick={loadNewQuote}
              className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Quote Card */}
      {quote && !loading && !error && (
        <div key={key} className="quote-enter w-full max-w-md">
          <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 min-h-80 flex flex-col justify-between border border-purple-500 border-opacity-50">
            {/* Quote Text */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed italic">
                  "{quote?.text}"
                </p>
                <p className="text-lg text-purple-200 font-semibold">
                  — {quote?.author}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {/* Favorite Button */}
              <button
                onClick={toggleFavorite}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isFav
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                <Heart
                  size={20}
                  fill={isFav ? 'currentColor' : 'none'}
                />
                <span>{isFav ? 'Yêu thích' : 'Thích'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Quote Button */}
      <button
        onClick={loadNewQuote}
        disabled={loading}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        <span>Quote mới</span>
      </button>

      {/* Quote Count Info */}
      {quote && !error && (
        <div className="mt-12 text-center text-purple-200">
          <p className="text-sm">Nhấn vào trái tim để lưu danh ngôn yêu thích của bạn</p>
        </div>
      )}
    </div>
  )
}
