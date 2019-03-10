import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" /> 
      <button type="submit">lisää</button>
    </form>
  )
}

export default NewAnecdote