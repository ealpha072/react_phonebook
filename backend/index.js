import dotenv from 'dotenv'
dotenv.config({path:'.env'})
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import Contact from './models/contact.js'

const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('-----');
    next()
}

//middleware
app.use(express.json())
app.use(requestLogger)
app.use(cors())


//routes
app.post('/contacts', (req, res)=>{
    const contact = req.body

    if(contact.name === undefined || contact.number === undefined){
        res.status(404).json({error:'Contact missing name or number'})
    }

    const newContact = new Contact({
        name: contact.name,
        number:contact.number,
        date: new Date(),
        important: contact.important || true
    })

    newContact.save().then(savedContact => {
        res.json(savedContact)
    })
})

app.get('/contacts', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
})


app.get('/contacts/:id', (req, res, next)=>{
    Contact.findById(req.params.id).then(contact => {
        if(contact){
            res.json(contact)
        }else{
            res.status(404).end()
        }

    }).catch(error => next(error))
})

app.delete('/contacts/:id', (req, res) =>{
    const id = Number(req.params.id)
    const contact = contacts.filter(n => n.id !== id)

    res.status(204).end()
})

const unKnownEndPoints = (request, response) => {
    response.status(404).send({error:'Unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    console.log(error)
    if(error.name === 'CastError'){
        return res.status(404).json({error:'Malformatted id'})
    }
    next(error)
}

app.use(unKnownEndPoints)
app.use(errorHandler)

const PORT = process.env.PORT
const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(()=>{
        console.log('Connected to MONGODB')
        app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.log(err.message)
)

