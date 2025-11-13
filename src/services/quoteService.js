// Proxy API URL (disable SSL verification)
const PROXY_API_URL = 'http://localhost:3001/api/quote'

// Local quotes data as fallback
const LOCAL_QUOTES = [
  {
    id: 1,
    text: "Cuộc sống là những gì xảy ra khi bạn đang bận lên kế hoạch khác.",
    author: "John Lennon"
  },
  {
    id: 2,
    text: "Cách duy nhất để làm công việc tuyệt vời là yêu thích những gì bạn làm.",
    author: "Steve Jobs"
  },
  {
    id: 3,
    text: "Đừng để quá khứ chiếm dụng quá nhiều thời gian của bạn.",
    author: "Will Rogers"
  },
  {
    id: 4,
    text: "Bạn chỉ sống một lần, nhưng nếu bạn làm đúng, một lần là đủ.",
    author: "Mae West"
  },
  {
    id: 5,
    text: "Sự thất bại là bước đá để thành công.",
    author: "Unknown"
  },
  {
    id: 6,
    text: "Hạnh phúc không phải là điều gì đó sẵn có. Nó đến từ những hành động của bạn.",
    author: "Dalai Lama"
  },
  {
    id: 7,
    text: "Tương lai thuộc về những người tin vào vẻ đẹp của giấc mơ của họ.",
    author: "Eleanor Roosevelt"
  },
  {
    id: 8,
    text: "Nó luôn có vẻ không thể cho đến khi nó được thực hiện.",
    author: "Nelson Mandela"
  },
  {
    id: 9,
    text: "Bạn không bao giờ quá già để đặt ra một mục tiêu mới hoặc có một giấc mơ mới.",
    author: "C.S. Lewis"
  },
  {
    id: 10,
    text: "Cách duy nhất để thất bại là bỏ cuộc.",
    author: "George Clooney"
  }
]

export const getRandomQuote = async () => {
  try {
    console.log('Fetching from proxy:', PROXY_API_URL)
    
    const response = await fetch(PROXY_API_URL)
    
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`)
    }
    
    const data = await response.json()
    
    console.log('Raw API Response:', data)
    
    // Handle array response
    let quote = Array.isArray(data) ? data[0] : data
    
    console.log('Quote object:', quote)
    
    // Map API response to our format
    const mappedQuote = {
      id: quote._id || quote.id || Math.random(),
      text: quote.content || quote.text || '',
      author: quote.author || 'Unknown'
    }
    
    console.log('Before clean author:', mappedQuote.author)
    
    // Clean author name (remove type info)
    if (mappedQuote.author && typeof mappedQuote.author === 'string') {
      // Remove ', type.author' or similar patterns
      mappedQuote.author = mappedQuote.author.replace(/,\s*type\.author.*$/i, '')
      // Also handle comma-separated author names
      if (mappedQuote.author.includes(',')) {
        mappedQuote.author = mappedQuote.author.split(',')[0]
      }
    }
    
    console.log('Mapped Quote:', mappedQuote)
    
    return mappedQuote
  } catch (error) {
    console.warn('Proxy failed, using local quote:', error)
    // Fallback to local quote
    const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length)
    return LOCAL_QUOTES[randomIndex]
  }
}

export const getAllQuotes = async () => {
  try {
    return LOCAL_QUOTES
  } catch (error) {
    console.error('Failed to get quotes:', error)
    throw error
  }
}
