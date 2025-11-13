import React, { useState, useEffect } from 'react'
import { Heart, Trash2 } from 'lucide-react'
import { getFavorites, removeFavorite, clearAllFavorites } from '../services/storageService'

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setLoading(true)
    try {
      const faves = await getFavorites()
      setFavorites(faves)
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (quoteId) => {
    try {
      await removeFavorite(quoteId)
      setFavorites(favorites.filter(fav => fav.id !== quoteId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const handleClearAll = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả danh ngôn yêu thích?')) {
      try {
        await clearAllFavorites()
        setFavorites([])
      } catch (error) {
        console.error('Error clearing favorites:', error)
      }
    }
  }

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Danh ngôn yêu thích</h1>
        <p className="text-purple-200">
          {favorites.length} {favorites.length === 1 ? 'danh ngôn' : 'danh ngôn'}
        </p>
      </div>

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-300">Đang tải...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Heart size={48} className="text-gray-500 mb-4" />
            <p className="text-gray-300 text-lg">Chưa có danh ngôn yêu thích</p>
            <p className="text-gray-400 text-sm mt-2">
              Quay lại trang chủ và nhấn trái tim để thêm
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-6">
            {favorites.map((quote, index) => (
              <div
                key={quote.id}
                className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-xl p-5 border border-purple-500 border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
              >
                <div className="flex gap-4">
                  {/* Quote Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>

                  {/* Quote Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold italic mb-2 line-clamp-3">
                      "{quote.text}"
                    </p>
                    <p className="text-purple-200 text-sm">
                      — {quote.author}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(quote.id)}
                    className="flex-shrink-0 p-2 text-red-300 hover:text-red-500 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-300"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Button */}
      {favorites.length > 0 && (
        <div className="mt-6 pt-4 border-t border-purple-500 border-opacity-30">
          <button
            onClick={handleClearAll}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  )
}
