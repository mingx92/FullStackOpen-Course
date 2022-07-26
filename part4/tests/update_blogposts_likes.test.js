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

const newBlogPost = {
  title: "new Movie",
  author: "new Author",
  url: "test_url_2",
  likes: 10
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogPosts)
})

//Written Test
test('check if likes is amended for item 0 from 2 x likes to 10 x likes', async () => {
  
  const initial_return_blogposts = await Blog.find({})
  const blogsAtStart = initial_return_blogposts.map(blog => blog.toJSON())
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogPost)
  
  const end_return_blogposts = await Blog.find({})
  const blogsAtEnd = await (end_return_blogposts).map(blog => blog.toJSON())
  
  expect(blogsAtEnd.find(x => x.id === blogToUpdate.id).likes).toEqual(10)
}, 10000)


afterAll(() => {
  mongoose.connection.close()
})

