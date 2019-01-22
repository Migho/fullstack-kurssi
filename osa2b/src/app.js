import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Filter = (props) => {
  return (
    <div>Rajaa näytettäviä: <input value={props.value} onChange={props.onChange}/></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>nimi: <input value={props.newName} onChange={props.handleNameChange}/></div>
      <div>numero: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
      <div><button type="submit">lisää</button></div>
    </form>
  )
}

const Rows = (props) => {
  const persons = props.persons
  const newNameFilter = props.newNameFilter

  const rowsToShow = newNameFilter === ''
      ? persons
      : persons.filter(person => person.name.toUpperCase().includes(newNameFilter.toUpperCase()))

  const rows = () => rowsToShow.map(person =>
    <Person key={person.name} person={person} />
  )

  return (
    <ul>
      {rows()}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const handleNameFilterChange = (event) => { setNewNameFilter(event.target.value) }
  const [ newName, setNewName ] = useState('')
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const [ newNumber, setNewNumber ] = useState('')
  const handleNumberChange = (event) => { setNewNumber(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      //Yes, there have to be better way, I know.
      window.alert(`${newName} on jo luettelossa`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter value={newNameFilter} onChange={handleNameFilterChange} />
      <h2>Lisää numero</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numerot</h2>
      <Rows newNameFilter={newNameFilter} persons={persons} />
    </div>
  )

}

export default App