import React, { useState, useEffect } from 'react' 
import personService from './services/persons'
import './index.css'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <li>{person.name} {person.number} <button onClick={removePerson}>Poista</button></li>
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
    <Person key={person.name} person={person} removePerson={() => props.removePerson(person.id)} />
  )

  return (
    <ul>
      {rows()}
    </ul>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const handleNameFilterChange = (event) => { setNewNameFilter(event.target.value) }
  const [ newName, setNewName ] = useState('')
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const [ newNumber, setNewNumber ] = useState('')
  const handleNumberChange = (event) => { setNewNumber(event.target.value)}
  const [errorMessage, setErrorMessage] = useState(null)
  const [SuccessMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      const originalPerson = persons.filter(person => person.name === newName)[0]
      if (window.confirm(`${originalPerson.name} on jo luettelossa, haluatko päivittää numeron?`)) { 
        personService
          .update(originalPerson.id, personObject)
          .then(() => {
            setNewName('')
            setNewNumber('')
            setPersons(persons.map(person => person.id !== originalPerson.id ? person : personObject))
          }).then(() => {
            setSuccessMessage(`Tiedot päivitetty onnistuneesti`)
            setTimeout(() => { setSuccessMessage(null) }, 5000)
          })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      }).then(() => {
        setSuccessMessage(`Henkilö lisätty onnistuneesti`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      })
    }
  }

  const removePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Haluatko varmasti poistaa henkilön ${person.name}?`)) { 
      personService.remove(id).then(() => {
        setSuccessMessage(`Henkilö poistettu onnistuneesti`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      }).catch(error => {
        setErrorMessage(`Henkilö ${person.name} on jo valitettavasti poistettu palvelimelta`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  return (
    <div>
      <Notification message={SuccessMessage} type = "success" />
      <Notification message={errorMessage} type="error" />
      <h2>Puhelinluettelo</h2>
      <Filter value={newNameFilter} onChange={handleNameFilterChange} />
      <h2>Lisää numero</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <Rows newNameFilter={newNameFilter} persons={persons} removePerson={removePerson} />
    </div>
  )

}

export default App