const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/gemini/:model`, async (req, res) => {
  try {
    const { model } = req.params
    const body = req.body
    const resApi = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': 'AIzaSyCvl6hpysHOkitFSYdXMYk7Ph56679SYbA',
      },
      body: JSON.stringify(body)
    })
    const data = await resApi.json()
    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(process.env.PORT || 3005, () => {
  console.log(`Example app listening on port ${port}`)
})