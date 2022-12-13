import axios from 'axios'
import React from 'react'
import { useState, useEffect} from 'react'
import Contact from './Components/Contact'

const App = () => {

  const initialFormValues = {
    name: '',
    number:''
  }

  const [contacts, setContacts] = useState([])
  const [values, setValues] = useState(initialFormValues)
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    axios
      .get("http://localhost:3001/contacts")
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  const contactsToShow = showAll ? contacts : contacts.filter(contact => contact.important == true)

  const addContact = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    //check if name is already added;
    const nameCheck = contacts.filter(contact => contact.name === values.name)

    if (nameCheck.length > 0){
      alert(`${values.name} already exists in phonebook`)
    }else{
      const contactObject = {
        id:contacts.length + 1,
        name: values.name,
        number:values.number,
        date:new Date().toISOString(),
        important:Math.random() < 0.5
      }

      axios
      .post("http://localhost:3001/contacts", contactObject)
      .then(response => {
        setContacts(contacts.concat(response.data))
        console.log(response)
      })
  
      console.log(contactObject)
      setContacts(contacts.concat(contactObject))
      setValues(initialFormValues)
    }

  }

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setValues({
      ...values,
      [name]:value
    })
  }

  const handleSearchTermChange = (e)=> {
    e.preventDefault()
    setSearchTerm(e.target.value)
    const filteredName = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(filteredName)
    console.log(filteredName)
  }

  const toggleImportant = (id) => {
    const url = `http://localhost:3001/contacts/${id}`
    const contact = contacts.find(contact => contact.id === id)
    const changedContact = {...contact, important: !contact.important}
    axios.put(url, changedContact).then(response => {
      console.log(response.data)
    })
  }

  return (
    <div>
      <h1>Alpha Phonebook</h1>
      <button onClick={()=>setShowAll(false)}>Show {!showAll ? 'All' : 'Important'}</button>

      <div className="input-contacts" >
        <form action="" onSubmit={addContact}>
          <div className="input-fields">
            <input 
              type="text" 
              placeholder='Input name' 
              value={values.name}
              name='name' 
              onChange={handleInputChange} 
            /> <br />

            <input 
              type="number" 
              placeholder='Phone number' 
              value={values.number} 
              name='number'
              onChange={handleInputChange} 
            />

          </div>
          <button type='submit' >Add</button>
        </form>
      </div>
      <div className="search">
        Search by Name <br></br>
        <input 
          type="text" 
          placeholder='Type name to search' 
          value={searchTerm} 
          onChange={handleSearchTermChange} 
        />
        <div className="search-results">
          <h6>
            {
              searchResults.length === 0 ? "Nothing found" : searchResults.map(result => <Contact key={result.id}  contact={result}/>)
            }
          </h6>
        </div>
      </div>
      <div className="container">
        <h4>All contacts</h4>
        <ul>
          {contactsToShow.map(contact => 
            <Contact 
              key={contact.id} 
              contact = {contact}
              toggleImportance = {()=>toggleImportant(contact.id)}
            />
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App
