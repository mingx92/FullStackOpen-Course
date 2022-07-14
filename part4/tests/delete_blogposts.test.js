const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

//InitaliseBlogPosts
const initialBlogPosts = [
  {
     title: "This is a movie",
     author: "Test Author",
     url: "test_url",
     likes: 2 
  },
  {
      title: "This is a movie x2",
      author: "Test Author x2 ",
      url: "test_url x2",
      likes: 3 
   },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogPosts)
})

describe('deletion of a blog', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const initial_return_blogposts = await Blog.find({})
    const blogsAtStart = await initial_return_blogposts.map(blog => blog.toJSON())
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const end_return_blogposts = await Blog.find({})
    const blogsAtEnd = await (end_return_blogposts).map(blog => blog.toJSON())
    
    expect(blogsAtEnd).toHaveLength(
      initialBlogPosts.length - 1
    )
    
    const titles = blogsAtEnd.map(blog => blog.title)
    
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

