const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})
  
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

// blogsRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })

// blogsRouter.put('/:id', async (request, response) => {
//   const body = request.body
//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes
//   }
//   updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true })
//   response.json(updatedBlog)
// })

module.exports = usersRouter
