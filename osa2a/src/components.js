import React from 'react'

const Course = (props) => {
  return (
    props.courses.map((course, i) => {
      return (
      <div key={i}>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      )
    })
  )
}


const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      {
        parts.map((element, i) => <Part key={i} part={element.name} exercises={element.exercises} />)
      }
    </>
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
  const total = props.parts.reduce((s, p) => ({ exercises: (s.exercises + p.exercises) }))
  return (
    <p>yhteensä {total.exercises} tehtävää</p>
  )
}

export default Course