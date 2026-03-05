import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const GEMINI_API_KEY = process.env.API_KEY_GEMINI || process.env.GEMINI_API_KEY
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : ['*']

const APP_CONFIG = {
  RequestPerMinute: Number(process.env.REQUEST_PER_MINUTE || '50'),
  RequestPerWindow: Number(process.env.REQUEST_PER_WINDOW || '500'),
  WindowMs: Number(process.env.WINDOW_MS || '60000')
}

export { PORT, GEMINI_API_KEY, ALLOWED_ORIGINS, APP_CONFIG }