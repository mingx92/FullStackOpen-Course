// import Blog from './Blog'
// import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState(0)

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      likes
    })
    setTitle('')
    setAuthor('')
    setURL('')
    setLikes(0)
  }

  return (
    <div>

      <form id='form' onSubmit={handleCreateBlog}>
        <div>
          <div>Title:</div>
          <input
            id = 'title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <div>Author:</div>
          <input
            id ='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>  <div>
          <div>URL:</div>
          <input
            id = 'url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button id='createBtn' type="submit">Create</button>
      </form>
    </div>
  )}

export default BlogForm