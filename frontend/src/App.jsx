import { useState, useEffect} from 'react'
import Contact from './Components/Contact'
import contactServices from './services/contact'

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
        contactServices
        .getALl()
        .then(response => {
            setContacts(response)
        })
    }, [])

    const contactsToShow = showAll ? contacts : contacts.filter(contact => contact.important == true)

    const addContact = (e) => {
        e.preventDefault()
        //check if name is already added;
        const nameCheck = contacts.find(contact => contact.name === values.name)

        console.log(nameCheck)
        if (nameCheck){
            if(confirm(`${values.name} already exists in phonebook, update phone number ?`)){
                const changedContact = {...nameCheck, number:values.number}
                console.log(changedContact)
                contactServices
                    .update(nameCheck.id, changedContact)
                    .then(response=>{
                        setContacts(contacts.map(contact => contact.id !== nameCheck.id ? contact : response))
                    })
                    .catch(error=>{
                        console.error(error.response.data)
                        setContacts(contacts.filter(contact => contact.id !== nameCheck.id))
                    })
            }
        }else{
            const contactObject = {
                id:Math.floor(Math.random()*100),
                name: values.name,
                number:values.number,
                date:new Date().toISOString(),
                important:Math.random() < 0.5
            }

            contactServices
                .create(contactObject)
                .then(response => {
                    setContacts(contacts.concat(response))
                    setValues(initialFormValues)
                })
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
        const contact = contacts.find(contact => contact.id === id)
        const changedContact = {...contact, important: !contact.important}

        contactServices
        .update(id, changedContact)
        .then(response => {
            setContacts(contacts.map(contact => contact.id !== id ?  contact :  response))
        })
        .catch(error => {
            alert(`Contact ${contact.name} does not exist any more`)
            setContacts(contacts.filter(contact => contact.id !== id))
        })
    }

    const removeContact = (id, name) => {
        if(confirm(`Confirm deletion of ${name} from phonebook`)){
            contactServices
            .remove(id)
            .then(response => {
                setContacts(contacts.filter(c => c.id !== id))
            })
        }
    }

    return (
        <div className='container'>
			<div className="inner-container">
				<h1>Alpha Phonebook</h1>

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

							<button type='submit' className='add-btn btn'>Add</button>
						</div>
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
				<div className="container-contacts">
					<h4>All contacts</h4>
					<button onClick={()=>setShowAll(false)} className="btn" >Show {!showAll ? 'All' : 'Important'}</button>
					<ul>
					{contactsToShow.map(contact => 
						<Contact 
						key={contact.id} 
						contact = {contact}
						toggleImportance = {()=>toggleImportant(contact.id)}
						removeContact = {()=>removeContact(contact.id, contact.name)}
						/>
						)
					}
					</ul>
				</div>
			</div>
        </div>
    )
}

export default App
