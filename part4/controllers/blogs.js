const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({}) //get first user in collection
  const blog = new Blog({
    title: body.title,
    author: body.url,
    url: body.url,
    likes: body.likes,
    user: user._id
  }) 
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
