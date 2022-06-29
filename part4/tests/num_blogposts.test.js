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
    let blogObject = new Blog(initialBlogPosts[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogPosts[1])
    await blogObject.save()
  })

test('test number of blogposts returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogPosts.length)
})

afterAll(() => {
  mongoose.connection.close()
})
