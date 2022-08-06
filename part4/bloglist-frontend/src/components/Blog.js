import {useState, useEffect, useRef } from 'react'


const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogView, updateblogView] = useState('collapsed')
  const handleChangeBlogView = (e) =>{
    e.preventDefault()
    if (blogView === 'collapsed') {
      updateblogView('expanded')
    } else {
      updateblogView('collapsed')
    } 
  }
  
  if (blogView === 'collapsed') {
    return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick = {handleChangeBlogView}>View</button><br />
    </div>  
    )
  } else if (blogView === 'expanded') {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}  <button onClick = {handleChangeBlogView}>Hide</button> <br />
        {blog.url}<br />
        likes {blog.likes} <button>like</button><br />
        {blog.id}
      </div>  
      )
  } else {
    return <div>Issue with Current Blog View State {blogView}</div>
  }
}

export default Blog