import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { corsOptions, limiter } from '@/config/app'
import GeminiRouter from '@/routes/gemini'
import AppRouter from '@/routes/app'

dotenv.config()
const app = express()

// Security middleware
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(cors(corsOptions))
app.use(limiter)

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString()

  console.log(
    `[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip} - Origin: ${req.headers.origin || 'none'}`
  )
  next()
})

// Routes
app.use('/', AppRouter)
app.use('/gemini', GeminiRouter)

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Gemini Proxy Server running on port ${PORT}`)
// })
export default app // Phải export default