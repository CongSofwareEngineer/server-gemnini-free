import { GEMINI_API_KEY } from '../../constants/app'

class GeminiUtils {
  private static indexApiKey = 0

  static getApiKey() {
    const arr = GEMINI_API_KEY?.split(',') || []
    const apiKey = arr[this.indexApiKey]

    this.indexApiKey = (this.indexApiKey + 1) % arr.length

    return apiKey
  }
}

export default GeminiUtils
