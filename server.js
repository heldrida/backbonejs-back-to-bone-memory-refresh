const express = require('express')
const app = express()
const path = require('path')

app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, '/index.html'))
})

app.listen(3000)
