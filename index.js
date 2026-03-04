const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3005
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/gemini/:model`, async (req, res) => {
  try {
    const { model } = req.params
    const body = req.body
    console.log({ model, body });

    const resApi = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.API_KEY_GEMINI,

      },
      body: JSON.stringify(body)
    })
    const data = await resApi.json()

    if (data?.error?.code) {
      res.status(data?.error?.code).send(data)
    } else {
      res.send(data)
    }

  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})