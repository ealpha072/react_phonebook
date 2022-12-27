import { useState, useEffect} from 'react'
import Contact from './Components/Contact'
import contactServices from './services/contact'
import loginServices from './services/login'

const App = () => {

    const initialFormValues = {
        name: '',
        number:''
    }

    const initialLoginValues = {
        username: '',
        password:''
    }

    const [contacts, setContacts] = useState([])
    const [values, setValues] = useState(initialFormValues)
    const [showAll, setShowAll] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loginDetails, setLoginDetails] = useState(initialLoginValues)
    const [user, setUser] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(()=>{
        contactServices
        .getALl()
        .then(response => {
            setContacts(response)
        })
    }, [])

    useEffect(()=>{
        const loggedInUserDetails = window.localStorage.getItem('loggedAppUser')

        if(loggedInUserDetails){
            const user = JSON.parse(loggedInUserDetails)
            setUser(user)
            contactServices.setToken(user.token)
        }
    }, [])
    const contactsToShow = showAll ? contacts : contacts.filter(contact => contact.important == true)

    const addContact = (e) => {
        e.preventDefault()
        //check if name is already added;
        console.log(values)
        const nameCheck = contacts.find(contact => contact.name === values.name)

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
                id:Math.floor(Math.random()) * 1000000000,
                name: values.name,
                number:values.number,
                date:new Date().toISOString(),
                important:Math.random() < 0.5,
                userId:user.id
            }

            contactServices
                .create(contactObject)
                .then(response => {
                    console.log(response)
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

    const loginInputChange = (event) => {
        const {name, value} = event.target
        setLoginDetails({
        ...loginDetails,
        [name]:value
        })
    }

    const handleLoginForm = async (e) => {
        e.preventDefault()
        console.log(loginDetails)

        try {
            const username = loginDetails.username
            const password = loginDetails.password

            const user = await loginServices.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            )

            contactServices.setToken(user.token)
            setUser(user)
            //setLoginDetails(initialLoginValues)
        } catch (error) {
            setErrorMsg('Invalid username or password')
            setTimeout(()=> {
                setErrorMsg(null)
            }, 5000)
        }

    }

    const logoutUser = () => {
        window.localStorage.removeItem('loggedAppUser')
        setUser(null)
    }

    const loginForm = () => (
        <div>
            <form action="" onSubmit={handleLoginForm}>
            <div className="input-fields">
                <input
                type="text"
                placeholder="Username"
                name="username"
                values={loginDetails.username}
                onChange={loginInputChange}
                />

                <input
                type="password"
                placeholder="Password"
                name="password"
                values={loginDetails.password}
                onChange={loginInputChange}
                />
                <button type="submit" className="btn add-btn">
                Login
                </button>
            </div>
            </form>
        </div>
    )

    const contactForm  = () => (
        <div className="input-contacts">
          <form action="" onSubmit={addContact}>
            <div className="input-fields">
              <input
                type="text"
                placeholder="Input name"
                value={values.name}
                name="name"
                onChange={handleInputChange}
              />
              <br />
              <input
                type="number"
                placeholder="Phone number"
                value={values.number}
                name="number"
                onChange={handleInputChange}
              />
              <button type="submit" className="add-btn btn">
                Add
              </button>
            </div>
          </form>
        </div>
    )

    return (
        <div className='container'>
			<div className="inner-container">
				<h1>Alpha Phonebook</h1>
                {errorMsg !== '' ? <h5>{errorMsg}</h5> : ''}
                {user === null ? loginForm() : contactForm()}

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
            <button onClick={logoutUser} className="logout btn">Logout</button>
        </div>
    )
}

export default App
