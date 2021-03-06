import { useState } from 'react'

export const useField = (type) => { // highlighl-line
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}