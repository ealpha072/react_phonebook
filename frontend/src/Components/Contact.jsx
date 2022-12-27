const Contact = ({contact, toggleImportance, removeContact}) => {
  const label = contact.important ? <i className="fa fa-times"></i> : <i className="fa fa-check"></i>

  return (
    <li>
      <div className="contents">
        {contact.name}: {contact.number} 
      </div>
      <div className="contact-btns"> 
        <button onClick={toggleImportance}>{label}</button> 
        <button onClick={removeContact} className='delete-btn'><i className="fa fa-trash-o"></i></button>
      </div>
    </li>
  )
}

export default Contact
