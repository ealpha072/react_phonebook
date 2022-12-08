import React from 'react'
import { useState } from 'react'
import Contact from './Components/Contact'

const App = ({contacts}) => {
  const [contact, setContact] = useState(contacts)

  return (
    <div>
      <h1>Alpha Phonebook</h1>

      <div className="input-contacts">
        <form action="">
          <div className="input-fields">
            <input type="text" placeholder='Input name'/>
            <input type="number" placeholder='Phone NUmber'/>
          </div>
        </form>
      </div>
      <div className="container">
        <ul>
          {contacts.map(contact => 
            <Contact key={contact.id} contact = {contact}/>)
          }
        </ul>
      </div>
    </div>
  )
}

export default App
