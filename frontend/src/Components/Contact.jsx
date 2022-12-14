const Contact = ({contact, toggleImportance, removeContact}) => {
  const label = contact.important ? 'Mark not important' : 'Mark Important'
  
  return (
    <li>
      {contact.name}: {contact.number} 
      <button onClick={toggleImportance}>{label}</button> 
      <button onClick={removeContact}>Delete</button>
    </li>
  )
}

export default Contact
  
  