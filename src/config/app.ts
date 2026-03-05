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
      retryAfter: Math.ceil(APP_CONFIG.WindowMs / 1000)
    })
  },
  skip: (req: Request) => {
    // Skip rate limiting for health check endpoint
    return req.path === '/health'
  }
})

// CORS configuration - restrict allowed domains
const corsOptions: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS.includes('*') ? '*' : ALLOWED_ORIGINS,
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}

export { limiter, corsOptions }
