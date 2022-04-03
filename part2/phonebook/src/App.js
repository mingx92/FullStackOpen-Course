import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filterName, filterNameHandler}) => {
  return (
   <div>
     filter shown with <input value ={filterName} onChange={filterNameHandler} /> (by name)
   </div>
  )
}

const Persons = ({recordsToShow}) => {
  return (
    <div>
      {recordsToShow.map( person => <div key={person.name}> {person.name} {person.number}</div>)}
    </div>
  )
}

const PersonForm =  ({submitHandler, newName, newNumber, nameHandler, numberHandler}) => {
  return(
    <div>
      <form onSubmit= {submitHandler}>
        <div>name: <input value ={newName} onChange={nameHandler}/></div>
        <div>number: <input value ={newNumber} onChange={numberHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect( () => {
    personService
    .getAll()
    .then( response => {
      console.log('promise fulfilled');
      setPersons(response.data);
    })
  },[])

  const nameHandler = (e) => {
    setNewName(e.target.value);
  }

  const filterNameHandler = (e) => {
    setFilterName(e.target.value);
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const personArray = persons.map (person => person.id);
    if (!personArray.includes(newName)) {
      setPersons(persons.concat({name:newName, number: newNumber, id:newName}));
      const newPerson = { name:newName, 
                          number: newNumber, 
                          id:newName
                        };

      personService.create(newPerson);

    } else {
      alert (`${newName} is already added to phonebook`)
    }
    console.log(recordsToShow);
  }


  let recordsToShow = !(filterName === '')
  ? persons.filter(person => {
      let searchStatus = person.name.toLowerCase().search(filterName.toLowerCase());
      return searchStatus>=0? true : false;
    }) 
  : persons;

  
   
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} filterNameHandler={filterNameHandler}/>  

      <h3>add a new</h3>
      <PersonForm 
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber} 
        nameHandler={nameHandler} 
        numberHandler={numberHandler} />

      <h3>Numbers</h3>
      <Persons recordsToShow={recordsToShow}/>

    </div>
  )
}

export default App