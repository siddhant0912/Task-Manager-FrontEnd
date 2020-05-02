const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const dirpath = path.resolve(__dirname, 'dist', 'index.html')

app.use(express.static('dist'))

app.get('*', (req, res) => {
    res.sendFile(dirpath)
})

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})