import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts

  // It just feels bad to hard-code something like this, so i decided to loop anyway
  return (
    <p>
      {
        parts.map((element, i) => <Part key={i} part={element.name} exercises={element.exercises} />)
      }
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  let result = 0
  props.parts.map((element) => ( 
    result += element.exercises
  ))
  return (
    <p>yhteensä {result} tehtävää</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))