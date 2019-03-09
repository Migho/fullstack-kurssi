import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)

  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const author = useField('text')
  const url = useField('text')
  const title = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const u = username.f.value
      const p = password.f.value
      const user = await loginService.login({ username: u, password: p })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong password or username')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    console.log(blogObject)
    try {
      blogService.create(blogObject).then(returnedBlog => {
        setNotificationMessage(`Adding the blog ${title} was successful`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
        returnedBlog.id = returnedBlog._id
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
      })
    } catch (exception) {
      setNotificationMessage('Adding the blog failed')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} type="error" />
        <Togglable buttonLabel='login'>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            Username <input  {...username} reset={''}/> <br/>
            Password <input  {...password} reset={''}/> <br/>
            <button type="submit">login</button>
          </form>
        </Togglable>
      </div>
    )
  }
  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        Title <input  {...title} reset={''}/> <br/>
        Author <input  {...author} reset={''}/> <br/>
        Url <input  {...url} reset={''}/> <br/>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} user={user} />
      )}
    </div>
  )
}

export default App