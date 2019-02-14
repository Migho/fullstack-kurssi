const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsrouter = require('./controllers/blogs')

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsrouter)

module.exports = app