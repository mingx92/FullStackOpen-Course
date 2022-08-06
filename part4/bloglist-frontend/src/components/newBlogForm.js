import Notification from './Notification'
import Blog from './Blog'
import blogService from '../services/blogs'
import {useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'

const BlogForm = ({
    user,
    handleLogout,
}) => {
    
    const [newBlogMessage, setNewBlogMessage] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setURL] = useState("")
    
    const blogFormRef = useRef()

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        let likes = 0
        await blogService.create(
          {title, author, url, likes}
        )
        setNewBlogMessage(`New Blog registered from a author ${author}!`)
        
        setTimeout(() => {
          setNewBlogMessage(null)
        }, 5000)
    
        setTitle('')
        setAuthor('')
        setURL('')
        blogFormRef.current.toggleVisibility()
      }
    
      useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )  
      }, [])

    return (
        <div>
        <h2><u>Blogs Page</u></h2>
        <Notification message={newBlogMessage} color = 'green'/>
        <p>User "<u>{user.name}</u>" has logged-in. <button onClick = {handleLogout}>logout</button></p> 
        <h2><u>Create New Blogs</u></h2>
        <Togglable buttonLabel='New Note' ref= {blogFormRef}>
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
        </Togglable>
        <h2><u>List of Saved Blogs</u></h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
        )}
        </div>
     )}


export default BlogForm