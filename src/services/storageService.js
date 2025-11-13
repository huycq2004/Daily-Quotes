import { Preferences } from '@capacitor/preferences'

const FAVORITES_KEY = 'daily_quotes_favorites'

// Helper function to use Preferences with fallback to localStorage
const getStorage = async () => {
  try {
    // Try to use Capacitor Preferences
    const { value } = await Preferences.get({ key: FAVORITES_KEY })
    return value ? JSON.parse(value) : []
  } catch (error) {
    // Fallback to localStorage
    console.warn('Preferences not available, using localStorage:', error)
    const value = localStorage.getItem(FAVORITES_KEY)
    return value ? JSON.parse(value) : []
  }
}

const setStorage = async (favorites) => {
  try {
    // Try to use Capacitor Preferences
    await Preferences.set({
      key: FAVORITES_KEY,
      value: JSON.stringify(favorites)
    })
  } catch (error) {
    // Fallback to localStorage
    console.warn('Preferences not available, using localStorage:', error)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

const removeStorage = async () => {
  try {
    // Try to use Capacitor Preferences
    await Preferences.remove({ key: FAVORITES_KEY })
  } catch (error) {
    // Fallback to localStorage
    console.warn('Preferences not available, using localStorage:', error)
    localStorage.removeItem(FAVORITES_KEY)
  }
}

export const addFavorite = async (quote) => {
  try {
    let favorites = await getStorage()
    
    // Check if quote already exists
    if (!favorites.find(fav => fav.id === quote.id)) {
      favorites.push(quote)
      await setStorage(favorites)
    }
    return favorites
  } catch (error) {
    console.error('Error adding favorite:', error)
    throw error
  }
}

export const removeFavorite = async (quoteId) => {
  try {
    let favorites = await getStorage()
    
    favorites = favorites.filter(fav => fav.id !== quoteId)
    await setStorage(favorites)
    return favorites
  } catch (error) {
    console.error('Error removing favorite:', error)
    throw error
  }
}

export const getFavorites = async () => {
  try {
    return await getStorage()
  } catch (error) {
    console.error('Error getting favorites:', error)
    return []
  }
}

export const isFavorite = async (quoteId) => {
  try {
    const favorites = await getFavorites()
    return favorites.some(fav => fav.id === quoteId)
  } catch (error) {
    console.error('Error checking favorite:', error)
    return false
  }
}

export const clearAllFavorites = async () => {
  try {
    await removeStorage()
    return []
  } catch (error) {
    console.error('Error clearing favorites:', error)
    throw error
  }
}
