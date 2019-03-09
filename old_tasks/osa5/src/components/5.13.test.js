import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SimpleBlog from './5.13'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'haloo_123',
    author: 'haloo_asd',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('haloo_123')
  expect(component.container).toHaveTextContent('haloo_asd')
  expect(component.container).toHaveTextContent('0')
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'haloo_123',
    author: 'haloo_asd'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})