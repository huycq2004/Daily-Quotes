import express from 'express'
import https from 'https'
import cors from 'cors'

const app = express()
const PORT = 3001

// Enable CORS
app.use(cors())

// Proxy endpoint
app.get('/api/quote', (req, res) => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  https.get('https://api.quotable.io/quotes/random', { agent }, (apiRes) => {
    let data = ''

    apiRes.on('data', (chunk) => {
      data += chunk
    })

    apiRes.on('end', () => {
      try {
        res.json(JSON.parse(data))
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse response' })
      }
    })
  }).on('error', (err) => {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'Failed to fetch quote' })
  })
})

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`)
})
