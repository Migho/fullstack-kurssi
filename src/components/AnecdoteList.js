import React from 'react'

const AnecdoteList = ({store}) => {
  const vote = (id) => {store.dispatch({type: 'VOTE', id: id})}

  return(
    <div>
      <h2>Anecdotes</h2>
      {store.getState().sort((a, b) => a.likes - b.likes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList