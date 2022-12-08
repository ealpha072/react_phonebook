import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

const contacts = [
  {
    id: 1,
    name: 'ALpha Emmanuel',
    number: '0798975799',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App contacts={contacts}/>
  </React.StrictMode>
)
