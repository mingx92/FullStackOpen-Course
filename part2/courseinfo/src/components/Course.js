import React from "react"


const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({name , exercises}) => {
  return (
    <div>
      {name} {exercises}
    </div>
  )
}

const Parts = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name ={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total= ({course}) => {
  const total = course.reduce((sum, parts) => {
    return sum+=parts.exercises;
  }, 0)

  return (
    <h3>
      total of {total} exercises
    </h3>
  )
}

const Course = ({course, courseName}) => {
  return (
    <div>
      <Header courseName = {courseName} />
      <Parts parts={course} />
      <Total course={course}/>
    </div>
  )
}

export default Course