const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let copy = undefined
  switch (action.type) {
    case 'GOOD':
      copy = {...state}
      copy.good++
      return copy
    case 'OK':
      copy = {...state}
      copy.ok++
      return copy
    case 'BAD':
      copy = {...state}
      copy.bad++
      return copy
    case 'ZERO':
      copy = {...state}
      copy.good = 0
      copy.ok = 0
      copy.bad = 0
      return copy
    default: return state
  }
  
}

export default counterReducer