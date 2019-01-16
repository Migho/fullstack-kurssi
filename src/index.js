import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14
    const dict = {
        [part1]: exercises1,
        [part2]: exercises2,
        [part3]: exercises3
    };
  
    return (
      <div>
        <Header course={course} />
        <Content dict={dict} />
        <Total dict={dict} />
      </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
  const {dict} = props
  return (
    <p>
      {
        Object.entries(dict).map(([key, value]) => (
          <Part part={key} exercises={value} />
        ))
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
  Object.keys(props.dict).map((key) => ( 
    result += props.dict[key]
  ))
  return (
    <p>yhteensä {result} tehtävää</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))