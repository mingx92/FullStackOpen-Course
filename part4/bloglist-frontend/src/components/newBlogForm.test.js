import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './newBlogForm'

test('BlogForm calls correct event handler for Form Creation', async() => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)
  const titleBox = component.container.querySelector('#title')
  const authorBox = component.container.querySelector('#author')
  const urlBox = component.container.querySelector('#url')
  const createBtn = component.container.querySelector('#createBtn')

  await user.type(titleBox, 'title')
  await user.type(authorBox, 'author')
  await user.type(urlBox, 'url')
  await user.click(createBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})
