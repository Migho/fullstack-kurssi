const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog have an ID field', async () => {
  const response = await api.get('/api/blogs')
  //console.log(response.toJSON()["text"])
  expect(response.body[0].id).toBeDefined()
})

test('Amount of blogs grows when a blog is added', async () => {
  const beforeResponse = await api.get('/api/blogs')
  blogAmountAtStart = beforeResponse.body.length
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }

  await api.post('/api/blogs').send(blog)
  const afterResponse = await api.get('/api/blogs')

  expect(afterResponse.body.length).toBe(blogAmountAtStart + 1)
})

test('When adding blog with empty likes, make likes to be 0', async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    __v: 0
  }

  await api.post('/api/blogs').send(blog)
  const afterResponse = await api.get('/api/blogs')

  expect(afterResponse.body[afterResponse.body.length-1].likes).toBe(0)
})

test('If title or url is missing, response with status 400', async () => {
  const blog = {
    //title: "React patterns",
    author: "Michael Chan",
    //url: "https://reactpatterns.com/",
    __v: 0
  }

  await api.post('/api/blogs').send(blog).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})