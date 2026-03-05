import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'
import cors from 'cors'
import { ALLOWED_ORIGINS, APP_CONFIG } from '../constants/app'

const limiter = rateLimit({
  windowMs: APP_CONFIG.WindowMs, // Default: 1 minute
  max: APP_CONFIG.RequestPerMinute, // Default: 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil(APP_CONFIG.WindowMs/ 1000)
    })
  },
  skip: (req: Request) => {
    // Skip rate limiting for health check endpoint
    return req.path === '/health'
  }
})

// CORS configuration - restrict allowed domains
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true)
    }

    // Check if origin is allowed
    if (ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}

export { limiter, corsOptions }
