import React from 'react'
import { useState } from 'react'
import Contact from './Components/Contact'

const App = (props) => {

  const initialFormValues = {
    name: '',
    number:''
  }

  const [contacts, setContacts] = useState(props.contacts)
  const [values, setValues] = useState(initialFormValues)
  const [showAll, setShowAll] = useState(true)

  const contactsToShow = showAll ? contacts : contacts.filter(contact => contact.important == true)
  const addContact = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    const contactObject = {
      id:contacts.length + 1,
      name: values.name,
      number:values.number,
      date:new Date().toISOString(),
      important:Math.random() < 0.5
    }

    console.log(contactObject)
    setContacts(contacts.concat(contactObject))
    setValues(initialFormValues)
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setValues({
      ...values,
      [name]:value
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
            />

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
      <div className="container">
        <ul>
          {contactsToShow.map(contact => 
            <Contact key={contact.id} contact = {contact}/>)
          }
        </ul>
      </div>
    </div>
  )
}

export default App
