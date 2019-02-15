const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
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

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	if (blog.likes === undefined) {
		blog.likes = 0
	}

	if (blog.title === undefined && blog.url === undefined) {
		response.status(400).json(blog)
	} else {
		blog
			.save()
			.then(result => {
				response.status(201).json(result)
			})
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
		author: body.author,
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