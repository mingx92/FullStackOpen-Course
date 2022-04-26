import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className = 'notification'>{message}</div>
  )
}

const Filter = ({filterName, filterNameHandler}) => {
  return (
   <div>
     filter shown with <input value ={filterName} onChange={filterNameHandler} /> (by name)
   </div>
  )
}

const Persons = ({recordsToShow, deleteHandler}) => {

  return (
    <div>
      {recordsToShow.map( person => 
                          <div key={person.id}> 
                            {person.name} 
                            {person.number}
                            <button id={person.id} onClick={deleteHandler}> delete </button>
                          </div>
                        )
      }

    </div>
  )
}

const PersonForm =  ({submitHandler, newName, newNumber, nameHandler, numberHandler}) => {

  return (
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setNewMessage] = useState(null);
  const [filterName, setFilterName] = useState('');

  useEffect( () => {
    personService
    .getAll()
    .then( response => {
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
    const personArray = persons.map (person => person.name);
    if (!personArray.includes(newName)) {
      //setPersons(persons.concat({name:newName, number: newNumber}));
      const newPerson = { name:newName, 
                          number: newNumber};
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setNewMessage(`Added ${newPerson.name}`);
        setTimeout(() => {setNewMessage(null)},5000); 
      });

    } else {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name == newName);
        const updatedPerson =  {...personToUpdate, number: newNumber};
        personService.update(updatedPerson.id, updatedPerson).then(response => {
        setPersons(persons.map(person => person.id!= updatedPerson.id ? person : response.data));
        setNewMessage(`Number for ${updatedPerson.name} has been updated`);
        setTimeout(() => {setNewMessage(null)},10000)      
      }).catch(() => {
        setNewMessage(`Information of ${newName} has already been deleted from server`);
        setTimeout(() => {setNewMessage(null)},10000)  
      })}
    }
  }

  const deleteHandler = (e) => {
    const nameToDelete = persons.find(person => person.id == e.target.id).name;
    if (window.confirm(`Delete ${nameToDelete} ?`)){
      personService.remove(e.target.id);
      setPersons(persons.filter(person => person.id!= e.target.id));
    }   
  }

  let recordsToShow = !(filterName === '')
  ? persons.filter(person => {
      let searchStatus = person.name.toLowerCase().search(filterName.toLowerCase());
      return searchStatus>=0? true : false;
    }) 
  : persons;
   
  return (
    <div>
      <Notification message = {message} />
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
      <Persons recordsToShow={recordsToShow} deleteHandler={deleteHandler}/>

    </div>
  )
}

export default App