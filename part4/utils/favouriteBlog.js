const favouriteBlog = (blogs) => {
    const mapper = (blog) => {
      return blog.likes
    }
    const maxLike = Math.max(... blogs.map(mapper))
    return blogs.filter( (blog) => blog.likes === maxLike)[0]
  }
  
  module.exports = {
    favouriteBlog
  }