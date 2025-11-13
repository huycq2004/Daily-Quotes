// Simple API proxy to bypass SSL issues
import https from 'https'
import http from 'http'

const agent = new https.Agent({
  rejectUnauthorized: false
})

export const fetchWithSSLBypass = async (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    protocol.get(url, { agent }, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}
