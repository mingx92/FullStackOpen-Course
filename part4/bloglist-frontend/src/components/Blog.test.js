//Test that the component renders the blog's title and author, but does not render its url or number of likes by default.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let user
  let mockHandler
  let container
  let sampleBlog = {
    user: 12345,
    title: 'Title',
    author: 'author',
    url: 'test URL',
    likes: 1
  }

  beforeEach(() => {
    container = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />).container
    mockHandler = jest.fn()
    user = userEvent.setup()
  })

  test('Default View Render Testing', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(sampleBlog.title)
    expect(div).toHaveTextContent(sampleBlog.author)
    expect(div).not.toHaveTextContent(sampleBlog.url)
    expect(div).not.toHaveTextContent('likes')
  })

  test('Expanded View Render Testing', async() => {
    const div = container.querySelector('.blog')
    const button = screen.getByText('View')
    await user.click(button)
    expect(div).toHaveTextContent(sampleBlog.url)
    expect(div).toHaveTextContent('likes')
  })

})