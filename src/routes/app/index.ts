import express, { Request, Response } from 'express'

const AppRouter = express.Router()

// Gemini proxy endpoint
AppRouter.get('/health', (_: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

export default AppRouter
