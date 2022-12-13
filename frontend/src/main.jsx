import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import axios from 'axios'

axios.get("http://localhost:3001/contacts").then(response => {
  const contacts = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )
})

