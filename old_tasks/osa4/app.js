const config = require('./utils/config')
const express = require('express')
const app = express()

const tokenExtractor = (request, response, next) => {
  response.token = request.get('authorization')
  next()
}

app.use(tokenExtractor)

const blogsrouter = require('./controllers/blogs')
const usersrouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsrouter)
app.use('/api/users', usersrouter)
app.use('/api/login', loginRouter)

module.exports = app