//Test that the component renders the blog's title and author, but does not render its url or number of likes by default.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('Default Render for Blog Component', () => {
  const sampleblog = {
    user: 12345,
    title: 'Title',
    author: 'author',
    url: 'test URL',
    likes: 1
  }

  const { container } = render(<Blog blog={sampleblog} />)
  screen.debug(container)
  expect(container).toHaveTextContent(sampleblog.title)
  expect(container).toHaveTextContent(sampleblog.author)
  expect(container).not.toHaveTextContent(sampleblog.url)
  expect(container).not.toHaveTextContent('likes')
})