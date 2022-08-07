//Test that the component renders the blog's title and author, but does not render its url or number of likes by default.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let user
  let mockHandler
  let component
  let sampleBlog = {
    user: 12345,
    title: 'Title',
    author: 'author',
    url: 'test URL',
    likes: 1
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    user = userEvent.setup()
    component = render(<Blog blog={sampleBlog} likeHandler={mockHandler} />).container
  })

  test('Default View Render Testing', () => {
    const div = component.querySelector('.blog')
    expect(div).toHaveTextContent(sampleBlog.title)
    expect(div).toHaveTextContent(sampleBlog.author)
    expect(div).not.toHaveTextContent(sampleBlog.url)
    expect(div).not.toHaveTextContent('likes')
  })

  test('Expanded View Render Testing', async() => {
    const div = component.querySelector('.blog')
    const viewBtn = screen.getByText('View')
    await user.click(viewBtn)
    expect(div).toHaveTextContent(sampleBlog.url)
    expect(div).toHaveTextContent('likes')
  })

  test('Like Button called twice', async() => {
    const viewBtn = await screen.getByText('View')
    await user.click(viewBtn)
    const likeBtn = await screen.getByText('Like')
    await user.click(likeBtn)
    await user.click(likeBtn)
    await expect(mockHandler.mock.calls).toHaveLength(2)
  })

})