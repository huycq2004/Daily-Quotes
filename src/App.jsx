import React, { useState, useEffect } from 'react'
import { Heart, Home, Bookmark } from 'lucide-react'
import HomeScreen from './screens/HomeScreen'
import FavoritesScreen from './screens/FavoritesScreen'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' ? <HomeScreen /> : <FavoritesScreen />}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-t border-purple-500 border-opacity-30">
        <div className="flex justify-around items-center h-20">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              currentScreen === 'home'
                ? 'text-yellow-300 bg-purple-600 bg-opacity-40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Trang chủ</span>
          </button>
          <button
            onClick={() => setCurrentScreen('favorites')}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              currentScreen === 'favorites'
                ? 'text-red-400 bg-purple-600 bg-opacity-40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Bookmark size={24} />
            <span className="text-xs mt-1">Yêu thích</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
