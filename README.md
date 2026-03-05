# Gemini Proxy Server

Server proxy TypeScript cho Gemini API với rate limiting và giới hạn domain.

## Tính năng

- 🔐 **Ẩn API Key** - Client không cần biết Gemini API key
- 🚦 **Rate Limiting** - Giới hạn số request từ mỗi IP
- 🌐 **Domain Restriction** - Chỉ cho phép các domain được whitelist
- 🛡️ **Security** - Helmet headers, CORS protection
- 📡 **Streaming Support** - Hỗ trợ streaming responses
- 📋 **Models API** - Endpoint để lấy danh sách models

## Cài đặt

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file .env từ template
cp .env.example .env

# 3. Edit .env và thêm GEMINI_API_KEY
```

## Cấu hình .env

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=production

# Rate limiting (10 requests per 60 seconds)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# Allowed domains (comma-separated)
ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

## Chạy server

```bash
# Development
npm run dev

# Build và chạy production
npm run build
npm start

# Watch mode
npm run watch
```

## API Endpoints

### 1. Generate Content
```http
POST /gemini/:model
Content-Type: application/json

{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Hello, how are you?" }]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 1024
  }
}
```

**Ví dụ:**
```bash
curl -X POST http://localhost:3000/gemini/gemini-1.5-flash \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"role": "user", "parts": [{"text": "Hello!"}]}]
  }'
```

### 2. Stream Generate Content
```http
POST /gemini/:model/stream
Content-Type: application/json

{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Tell me a story" }]
    }
  ]
}
```

### 3. List Models
```http
GET /gemini/models
```

### 4. Health Check
```http
GET /health
```

## Models phổ biến

| Model | Description |
|-------|-------------|
| `gemini-1.5-flash` | Fast, versatile |
| `gemini-1.5-flash-8b` | Lightweight |
| `gemini-1.5-pro` | Advanced reasoning |

## Sử dụng từ Client (JavaScript)

```javascript
// Gọi API qua proxy (không cần API key!)
const response = await fetch('http://your-proxy-server.com/gemini/gemini-1.5-flash', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      role: 'user',
      parts: [{ text: 'Hello, Gemini!' }]
    }]
  })
});

const data = await response.json();
console.log(data.candidates[0].content.parts[0].text);
```

## Triển khai

### Vercel
Tạo file `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## License

MIT
