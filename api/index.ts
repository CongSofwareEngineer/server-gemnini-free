// File: api/index.ts
import app from '../src/index' // Import express app từ source của bạn
import { Request, Response } from 'express'

// Export default function là bắt buộc với Vercel
export default function handler(req: Request, res: Response) {
  return app(req, res)
}