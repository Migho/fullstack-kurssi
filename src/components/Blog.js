import React, { useState } from 'react'
import blogService from '../services/blogs'


const RemoveButton = ({ blog, user, onSubmit }) => {

  if (user.username === blog.user.username) {
    return (
      <form onSubmit={onSubmit}>
        <button type="submit">Delete</button>
      </form>
    )
  }
  return null
}

const Blog = ({ blog, blogs, setBlogs, setNotificationMessage, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    try {
      blogService.update(blog.id, blogObject).then(returnedBlog => {
        setNotificationMessage(`Liking the blog ${blog.title} was successful`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
        blogs = blogs.map((b => b.id !== blog.id ? b : blogObject))
        setBlogs(blogs)
      })
    } catch (exception) {
      setNotificationMessage(`Liking the blog failed: ${exception}`)
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleRemovePerson = async (event) => {
    event.preventDefault()
    try {
      blogService.remove(blog.id).then(returnedBlog => {
        setNotificationMessage('Delete was successful')
        setTimeout(() => { setNotificationMessage(null) }, 5000)
        setBlogs(blogs.filter(a => a !== blog ))
      })
    } catch (exception) {
      setNotificationMessage(`Delete failed: ${exception}`)
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }


  return (
    <div>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        Title: {blog.title}
      </div>
      <div style={showWhenVisible} onClick={toggleVisibility}>
        Title: {blog.title},
        Author: {blog.author},
        URL: {blog.url},
        Likes: {blog.likes}
        <form onSubmit={handleLike}>
          <button type="submit">like</button>
        </form>
        <RemoveButton  user={user} blog={blog} onSubmit={handleRemovePerson}/>
      </div>
    </div>
  )
}

export default Blog