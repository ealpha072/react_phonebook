const Contact = ({contact, toggleImportance}) => {
  const label = contact.important ? 'Mark not important' : 'Mark Important'
  
  return (
    <li>{contact.name}: {contact.number} <button onClick={toggleImportance}>{label}</button></li>
  )
}

export default Contact
  
  