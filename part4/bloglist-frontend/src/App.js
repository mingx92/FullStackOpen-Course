import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/newBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogMessage, setNewBlogMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeHandler = async (event, blog) => {
    const updatedBlog = await blogService.update(blog.id,
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
    setBlogs(blogs.filter(bg => bg.id !==  blog.id).concat(updatedBlog))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setNewBlogMessage(`New Blog registered from a author ${response.author}!`)
    setTimeout(() => {
      setNewBlogMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <Notification message={errorMessage} color = 'red' />
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const userInfo = () => {
    return (
      <div>
      User &quot;<u>{user.name}</u>&quot; has logged-in. <button onClick = {handleLogout}>logout</button>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New Blog' ref= {blogFormRef}>
        <h2>
          <u>Create New Blogs</u>
        </h2>
        <BlogForm createBlog = {createBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={newBlogMessage} color = 'green'/>
      {user === null? (
        loginForm()
      ) : (
        <div>
          <h2><u>Blogs Page</u></h2>
          {userInfo()}
          {blogForm()}
          <h2><u>List of Saved Blogs</u></h2>
          {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1 )
            .map((blog) => (<Blog key={blog.id} blog={blog} likeHandler={(event) => likeHandler(event, blog)}/>))
          }
        </div>
      )
      }
    </div>
  )
}

export default App
