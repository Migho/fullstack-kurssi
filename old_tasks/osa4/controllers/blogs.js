const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1 })
		.then(blogs => {
			const huuu = blogs.map((blog) => {
				const yo = blog.toObject()
				yo["id"] = yo["_id"]
				yo["_id"] = undefined
				return yo
			})
			response.json(huuu)
		})
})

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body)
	if (blog.likes === undefined) {
		blog.likes = 0
	}	
	if (blog.title === undefined && blog.url === undefined) {
		response.status(400).json(blog)
	} else {
		try {
			const decodedToken = jwt.verify(response.token, process.env.SECRET)
			if (!response.token || !decodedToken.id) {
				return response.status(401).json({ error: 'token missing or invalid' })
			}
			const user = await User.findById(decodedToken.id)
			blog.user = user._id
			const savedBlog = await blog.save()
			user.blogs = user.blogs.concat(savedBlog._id)
			await user.save()
			response.json(savedBlog.toJSON())
		} catch (e) {
			console.log(e)
			return response.status(401).json({ error: 'token missing or invalid' })
		}
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
  try {
		const decodedToken = jwt.verify(response.token, process.env.SECRET)
		const user = await User.findById(decodedToken.id)
		if (!response.token || !decodedToken.id || blog.user.toString() !== user._id.toString()) {
			return response.status(401).json({ error: 'token missing, invalid or no permission' })
		} else {
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()
		}
  } catch (exception) {
    console.log(e)
		return response.status(401).json({ error: 'token missing, invalid or no permission' })
  }
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body
	
  const blog = {
    title: body.title,
		author: body.author,
		likes: body.likes,
		url: body.url,
		__v: body.__v,
	}
	
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogsRouter