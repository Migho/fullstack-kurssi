const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Do not allow new users without nickname', async () => {
  const user = {
    //"username": "Plölölölö",
    "name": "Pekka",
    "password": "hunter5"
  }

  await api.post('/api/blogs').send(user).expect(400)
})

test('Accept only unique users', async () => {
  const user = {
    "username": "Plölölölö",
    "name": "Pekka",
    "password": "hunter5"
  }

  await api.post('/api/blogs').send(user)
  await api.post('/api/blogs').send(user).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})