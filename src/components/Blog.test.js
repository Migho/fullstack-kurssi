import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('Content hiding works', () => {
  const blog = {
    title: 'haloo_123',
    author: 'haloo_asd',
    url: 'naurista.net',
    likes: 666,
    user: {
      username: 'Taurista'
    }
  }

  const user = {
    username: 'Blölölö'
  }

  const { container, getByText } = render(
    <Blog blog={blog} blogs={{ blog }} setBlogs={undefined} setNotificationMessage={undefined} user={user} />
  )

  expect(container.querySelector('.fullContent')).toHaveStyle('display: none')
  expect(container.querySelector('.someContent')).not.toHaveStyle('display: none')
  fireEvent.click(getByText('Title: haloo_123'))
  expect(container.querySelector('.someContent')).toHaveStyle('display: none')
  expect(container.querySelector('.fullContent')).not.toHaveStyle('display: none')
})