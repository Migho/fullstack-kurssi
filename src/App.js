import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

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

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong password or username')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      blogService.create(blogObject).then(returnedBlog => {
        console.log('Haloo')
        setNotificationMessage(`Adding the blog ${title} was successful`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
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
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            Password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
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
        <div>
          Title <input type="text" value={title} name="Username" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          Author <input type="text" value={author} name="Password" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          Url <input type="text" value={url} name="Password" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App