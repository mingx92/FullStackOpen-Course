import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogMessage, setNewBlogMessage] = useState(null)
  
 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    
    await blogService.create(
      {title, author, url}
    )
    setNewBlogMessage(`New Blog registered from a author ${author}!`)
    
    setTimeout(() => {
      setNewBlogMessage(null)
    }, 5000)

    setTitle('')
    setAuthor('')
    setURL('')

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
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


  const blogForm = () => (
    
    <div>
     <h2><u>Blogs Page</u></h2>
     <Notification message={newBlogMessage} color = 'green'/>
     <p>User "<u>{user.name}</u>" has logged-in. <button onClick = {handleLogout}>logout</button></p> 
     <h2><u>Create New Blogs</u></h2>
     <form onSubmit={handleCreateBlog}>
        <div>
            <div>Title:</div>
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            <div>Author:</div>
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>  <div>
            <div>URL:</div>
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setURL(target.value)}
            />
        </div>
        <button type="submit">Create</button>
      </form> 

     <h2><u>List of Saved Blogs</u></h2>
     {blogs.map(blog =>
     <Blog key={blog.id} blog={blog} />
       )}
    </div>
  )

  return (
    <div>
      {user === null?
        loginForm():
        blogForm()
      }
    </div>
  )
}

export default App
