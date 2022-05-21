const totalLikes = (blogs) => {
    const reducer = (tot_Likes, blog) => {
        return (tot_Likes += blog.likes)
    }
    return blogs.reduce(reducer, 0)
  }
  
  module.exports = {
    totalLikes
  }