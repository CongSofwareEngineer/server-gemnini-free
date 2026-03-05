// File: api/index.ts
import app from '../src/app' // Import express app từ source của bạn
import { Request, Response } from 'express'

// Export default function là bắt buộc với Vercel
export default function handler(req: Request, res: Response) {
  try {
    return app(req, res)
  } catch (error) {
    console.error('💥 Handler Error:', error) // Log lỗi ra Vercel console
    res.status(500).json({ error: 'Internal Server Error' })
  }
}