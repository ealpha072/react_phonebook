const Contact = ({contact, toggleImportance, removeContact}) => {
  const label = contact.important ? 'not important' : 'Important'

  return (
    <li>
      {contact.name}: {contact.number} 
      <div className="contact-btns"> 
        <button onClick={toggleImportance}>{label}</button> 
        <button onClick={removeContact}>Delete</button>
      </div>
    </li>
  )
}

export default Contact
