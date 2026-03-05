import express, { Request, Response } from 'express'
import GeminiUtils from '@/utils/gemini'

const router = express.Router()

// Gemini proxy endpoint
router.post('/:model', async (req: Request, res: Response) => {
  try {
    const { model } = req.params
    const body = req.body
    const resApi = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GeminiUtils.getApiKey()
        },
        body: JSON.stringify(body)
      }
    )

    const data = (await resApi.json()) as any

    if (data?.error?.code) {
      res.status(data?.error?.code).send(data)
    } else {
      res.send(data)
    }
  } catch (error) {
    console.error('❌ Proxy error:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to proxy request to Gemini API'
    })
  }
})

export default router
