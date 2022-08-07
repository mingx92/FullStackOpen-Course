import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const btnStyle = {
    backgroundColor: '#008CBA',
    color: 'white'
  }


  const [blogView, updateblogView] = useState('collapsed')

  const handleChangeBlogView = (event) => {
    event.preventDefault()
    if (blogView === 'collapsed') {
      updateblogView('expanded')
    } else {
      updateblogView('collapsed')
    }
  }

  const likeHandler = async (event) => {
    event.preventDefault()
    blogService.update(blog.id,
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
  }

  const removeBlogHandler = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      blogService.remove(blog.id)
    }
  }

  if (blogView === 'collapsed') {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author} <button onClick = {handleChangeBlogView}>View</button><br />
      </div>
    )
  } else if (blogView === 'expanded') {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}  <button onClick = {handleChangeBlogView}>Hide</button> <br />
        {blog.url}<br />
        likes {blog.likes} <button onClick ={likeHandler}>Like</button><br />
        {blog.id}<br />
        <button style={btnStyle} onClick = {removeBlogHandler} >Remove</button>
      </div>
    )
  } else {
    return <div>Issue with Current Blog View State {blogView}</div>
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog